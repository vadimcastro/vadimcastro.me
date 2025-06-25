from fastapi import FastAPI
import logging
import sys

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()

@app.get("/")
async def root():
    logger.info("Root endpoint called")
    return "OK"

@app.get("/health")  
async def health():
    logger.info("Health endpoint called")
    return "OK"

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI app")
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")