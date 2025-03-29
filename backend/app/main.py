# app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
import logging
import sys
import os
from app.api.v1.router import api_router
from app.db.session import SessionLocal
from app.db.init_db import init_db
from app.db.utils import test_db_connection
from app.middleware.security import setup_security
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
from contextlib import asynccontextmanager

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('app.log')
    ]
)
logger = logging.getLogger(__name__)

# Determine environment and set up CORS first
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
CORS_ORIGINS = []

if ENVIRONMENT == "development":
    CORS_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://frontend:3000",  # Docker service name
        "http://0.0.0.0:3000",
    ]
else:  # production
    CORS_ORIGINS = [
        "https://vadimcastro.pro",
        "https://www.vadimcastro.pro",
        "https://api.vadimcastro.pro",
    ]

logger.info(f"Configured CORS origins: {CORS_ORIGINS}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup
    logger.info("Initializing cache backend...")
    cache_backend = InMemoryBackend()
    FastAPICache.init(cache_backend, prefix="fastapi-cache")
    logger.info("Cache backend initialized")
    
    yield
    
    # Cleanup
    logger.info("Clearing cache...")
    await FastAPICache.clear()
    logger.info("Cache cleared")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for personal website and cloud storage",
    version="1.0.0",
    debug=settings.DEBUG,
    lifespan=lifespan
)

# Custom CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
    ],
    expose_headers=["*"],
    max_age=3600,
)

# Use additional security setup
setup_security(app)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting up application in {ENVIRONMENT} environment...")
    try:
        # Initialize cache first
        logger.info("Initializing cache backend...")
        FastAPICache.init(InMemoryBackend(), prefix="fastapi-cache")
        logger.info("Cache backend initialized")

        # Database initialization
        logger.info("Testing database connection...")
        if test_db_connection():
            logger.info("Database connection successful")
            db = SessionLocal()
            try:
                # Initialize database with admin user
                from app.db.init_db import init_db
                logger.info("Initializing admin user...")
                init_db(db)
                logger.info("Database initialization completed")
                
                # Verify admin user was created
                from app.models.user import User
                admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
                if admin:
                    logger.info(f"Admin user verified: {admin.email}")
                else:
                    logger.warning("Admin user not found after initialization!")
            finally:
                db.close()
        else:
            logger.error("Database connection failed")
            if settings.DEBUG:
                logger.warning("Running in debug mode - continuing despite database failure")
            else:
                raise Exception("Could not connect to database")
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}", exc_info=True)
        if not settings.DEBUG:
            raise

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down application...")
    await FastAPICache.clear()
    logger.info("Cache cleared")


@app.get("/test-cors")
async def test_cors(request: Request):
    logger.info("Test CORS endpoint called")
    logger.debug(f"Request origin: {request.headers.get('origin')}")
    return {
        "message": "CORS test successful",
        "origin": request.headers.get("origin"),
        "environment": ENVIRONMENT
    }

@app.get("/health")
async def health_check(request: Request):
    db_healthy = test_db_connection()
    cache_initialized = FastAPICache.get_cache() is not None
    
    return {
        "status": "healthy" if (db_healthy and cache_initialized) else "unhealthy",
        "database": "connected" if db_healthy else "disconnected",
        "cache": "initialized" if cache_initialized else "not initialized",
        "environment": ENVIRONMENT,
        "debug": settings.DEBUG,
        "client_host": request.client.host if request.client else None
    }

# Handle OPTIONS requests explicitly
@app.options("/{full_path:path}")
async def options_handler(request: Request):
    origin = request.headers.get("origin", "")
    
    # Check if origin is allowed
    if origin in CORS_ORIGINS:
        return {
            "status": "ok",
            "allowed_origin": origin,
            "allowed_methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        }
    else:
        logger.warning(f"Rejected CORS preflight from origin: {origin}")
        return {
            "status": "rejected",
            "reason": "origin not allowed"
        }