# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.api.v1.router import api_router
from app.core.config import settings
from app.db.init_db import init_db
from app.db.utils import test_db_connection

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Vadim Castro API",
    description="Backend API for personal website and cloud storage",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_CREDENTIALS,
    allow_methods=settings.CORS_METHODS,
    allow_headers=settings.CORS_HEADERS,
    max_age=settings.CORS_MAX_AGE
)

# Include API router
app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up application...")
    try:
        if test_db_connection():
            logger.info("Database connection successful")
            init_db()
            logger.info("Database initialization completed")
        else:
            logger.error("Database connection failed")
            raise Exception("Could not connect to database")
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}")
        raise

@app.get("/health")
async def health_check():
    db_healthy = test_db_connection()
    return {
        "status": "healthy" if db_healthy else "unhealthy",
        "database": "connected" if db_healthy else "disconnected"
    }