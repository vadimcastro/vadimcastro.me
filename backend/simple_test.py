#!/usr/bin/env python3
"""
Ultra-minimal test app for AppRunner debugging
"""
from fastapi import FastAPI
import uvicorn
import logging
import sys
import socket
import time

# Set up logging to see what's happening
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Test if port 8080 is available
def test_port():
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.bind(('0.0.0.0', 8080))
        sock.close()
        logger.info("✅ Port 8080 is available")
        return True
    except Exception as e:
        logger.error(f"❌ Port 8080 not available: {e}")
        return False

# Create the simplest possible FastAPI app
app = FastAPI(title="Test App", debug=False)

@app.get("/")
def read_root():
    logger.info("ROOT ENDPOINT HIT!")
    return {"Hello": "World", "status": "ok"}

@app.get("/health")
def health():
    logger.info("HEALTH ENDPOINT HIT!")
    return {"status": "healthy"}

# Add startup logging
@app.on_event("startup")
async def startup():
    logger.info("=== APP STARTING UP ===")
    logger.info("Server should be available on 0.0.0.0:8080")
    logger.info("Root endpoint: GET /")
    logger.info("Health endpoint: GET /health")

if __name__ == "__main__":
    logger.info("=== STARTING UVICORN SERVER ===")
    logger.info("Testing port availability...")
    
    if not test_port():
        logger.error("Cannot bind to port 8080, exiting...")
        sys.exit(1)
    
    logger.info("Starting uvicorn server...")
    
    # Try to start the server
    try:
        uvicorn.run(
            app, 
            host="0.0.0.0", 
            port=8080,
            log_level="info",
            access_log=True,
            workers=1
        )
    except Exception as e:
        logger.error(f"Failed to start server: {e}")
        sys.exit(1)

# Also run when imported as module
logger.info("=== MODULE LOADED ===")
logger.info("FastAPI app created successfully")
test_port()