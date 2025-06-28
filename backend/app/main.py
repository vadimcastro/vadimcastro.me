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
# from fastapi_cache import FastAPICache
# from fastapi_cache.backends.inmemory import InMemoryBackend
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
    logger.info("App startup - cache disabled for deployment")
    
    yield
    
    # Cleanup
    logger.info("App shutdown")

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
    logger.info("Startup event completed - database initialization skipped for deployment")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down application...")


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
    return {
        "status": "healthy",
        "database": "skipped",
        "cache": "disabled", 
        "environment": ENVIRONMENT,
        "client_host": request.client.host if request.client else None
    }

@app.post("/admin/init-db")
async def initialize_database():
    """Initialize database with admin user - call this manually if automatic init fails"""
    try:
        db = SessionLocal()
        try:
            init_db(db)
            return {"status": "success", "message": "Database initialized successfully"}
        finally:
            db.close()
    except Exception as e:
        logger.error(f"Manual database initialization failed: {str(e)}")
        return {"status": "error", "message": f"Database initialization failed: {str(e)}"}

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