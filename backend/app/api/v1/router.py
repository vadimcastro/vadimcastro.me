# app/api/v1/router.py
from fastapi import APIRouter
from app.api.v1.endpoints import users, auth, projects

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])