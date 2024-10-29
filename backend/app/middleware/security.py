# app/middleware/security.py (updated version)
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
        expose_headers=["*"],  # Added to expose all headers
        max_age=settings.CORS_MAX_AGE
    )

    # Rate limiting
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)