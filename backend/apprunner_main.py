# Minimal FastAPI app for AppRunner deployment
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import sys
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Determine environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "production")
CORS_ORIGINS = [
    "https://vadimcastro.pro",
    "https://www.vadimcastro.pro",
    "https://api.vadimcastro.pro",
]

logger.info(f"Starting AppRunner app in {ENVIRONMENT} environment")
logger.info(f"Configured CORS origins: {CORS_ORIGINS}")

app = FastAPI(
    title="VadimCastro API",
    description="Backend API for personal website",
    version="1.0.0",
    debug=False
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    expose_headers=["*"],
    max_age=3600,
)

@app.get("/")
async def root():
    return {"message": "VadimCastro API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": ENVIRONMENT,
        "message": "AppRunner deployment successful"
    }

@app.get("/test-cors")
async def test_cors():
    return {
        "message": "CORS test successful",
        "environment": ENVIRONMENT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)