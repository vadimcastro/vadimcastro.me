from fastapi import APIRouter
from app.api.v1 import auth  # Changed to absolute import

api_router = APIRouter()

@api_router.get("/")
async def root():
    return {"message": "API v1 root endpoint"}

# Include other routers
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])