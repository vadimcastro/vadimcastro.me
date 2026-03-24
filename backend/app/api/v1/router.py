from fastapi import APIRouter

from app.api.v1 import auth  
from app.api.v1.endpoints import metrics, notes, analytics, projects

api_router = APIRouter()

@api_router.get("/")
async def root():
    return {"message": "API v1 root endpoint"}

# Include other routers
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
api_router.include_router(notes.router, prefix="/notes", tags=["notes"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])