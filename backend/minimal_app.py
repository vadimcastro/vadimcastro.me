from fastapi import FastAPI
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Minimal Test App")

@app.get("/")
async def root():
    logger.info("Root endpoint called")
    return {"message": "Hello from minimal app"}

@app.get("/health")
async def health():
    logger.info("Health endpoint called")
    return {"status": "healthy", "app": "minimal"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)