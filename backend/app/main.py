from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import logging
import sys
from app.api.v1.router import api_router
from app.core.config import settings
from app.db.init_db import init_db
from app.db.utils import test_db_connection
from app.middleware.security import setup_security


logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('app.log')
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Vadim Castro API",
    description="Backend API for personal website and cloud storage",
    version="1.0.0",
    debug=True
)

# Use the security setup instead of direct CORS middleware
setup_security(app)

app.include_router(api_router, prefix="/api/v1")

@app.get("/test-cors")
async def test_cors():
    logger.info("Test CORS endpoint called")
    return {"message": "CORS test successful"}

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up application...")
    try:
        logger.info("Testing database connection...")
        if test_db_connection():
            logger.info("Database connection successful")
            init_db()
            logger.info("Database initialization completed")
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

@app.get("/health")
async def health_check():
    db_healthy = test_db_connection()
    return {
        "status": "healthy" if db_healthy else "unhealthy",
        "database": "connected" if db_healthy else "disconnected"
    }