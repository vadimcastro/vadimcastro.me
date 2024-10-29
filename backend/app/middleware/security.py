# backend/app/middleware/security.py
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from datetime import datetime
import redis
from app.core.config import settings

# Initialize Redis for rate limiting
redis_client = redis.from_url(settings.REDIS_URL)

limiter = Limiter(key_func=get_remote_address)

def setup_security(app: FastAPI):
    # CORS configuration using settings
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=settings.CORS_CREDENTIALS,
        allow_methods=settings.CORS_METHODS,
        allow_headers=settings.CORS_HEADERS,
        max_age=settings.CORS_MAX_AGE
    )

    # Rate limiting
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # IP blocking middleware
    @app.middleware("http")
    async def check_ip_ban(request: Request, call_next):
        ip = request.client.host
        if redis_client.get(f"banned:{ip}"):
            raise HTTPException(status_code=403, detail="IP has been banned")
        
        # Track failed login attempts
        if request.url.path == "/api/v1/auth/token":
            failed_attempts = redis_client.get(f"failed_login:{ip}") or 0
            if int(failed_attempts) >= 5:  # Ban after 5 failed attempts
                redis_client.setex(f"banned:{ip}", 3600, 1)  # Ban for 1 hour
                raise HTTPException(status_code=403, detail="Too many failed attempts")
        
        response = await call_next(request)
        return response

    # Security headers middleware
    @app.middleware("http")
    async def add_security_headers(request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response