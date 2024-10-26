# backend/app/api/v1/router.py
from fastapi import APIRouter
from app.api.v1.endpoints import auth, projects, cloud

api_router = APIRouter()

api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["auth"]
)

api_router.include_router(
    projects.router,
    prefix="/projects",
    tags=["projects"]
)

api_router.include_router(
    cloud.router,
    prefix="/cloud",
    tags=["cloud"]
)