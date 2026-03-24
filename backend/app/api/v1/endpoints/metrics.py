# app/api/v1/endpoints/metrics.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, List
from app.api.deps import get_db, get_current_active_user
# from app.api.v1.auth import get_current_active_user  # Removed incorrect import
from app.models.user import User
from app.crud import crud_metrics
from app.services.system import SystemService
from fastapi_cache.decorator import cache

router = APIRouter()

# Helper to verify admin access for all metrics routes
async def verify_admin(current_user: User = Depends(get_current_active_user)):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

@router.get("/visitors")
@cache(expire=300)
async def get_visitor_metrics(
    db: Session = Depends(get_db),
    _ = Depends(verify_admin)
) -> Dict:
    return crud_metrics.get_visitor_metrics(db)

@router.get("/sessions")
@cache(expire=60)
async def get_session_metrics(
    db: Session = Depends(get_db),
    _ = Depends(verify_admin)
) -> Dict:
    return crud_metrics.get_session_metrics(db)

@router.get("/users")
@cache(expire=300)
async def get_user_metrics(
    db: Session = Depends(get_db),
    _ = Depends(verify_admin)
) -> Dict:
    return crud_metrics.get_user_metrics(db)

@router.get("/recent-activity")
@cache(expire=60)
async def get_recent_activity(
    db: Session = Depends(get_db),
    limit: int = 5,
    _ = Depends(verify_admin)
) -> List:
    return crud_metrics.get_recent_activity(db, limit)

@router.get("/projects")
@cache(expire=300)
async def get_project_metrics(
    db: Session = Depends(get_db),
    _ = Depends(verify_admin)
) -> Dict:
    return crud_metrics.get_project_metrics(db)

@router.get("/system")
@cache(expire=60)
async def get_system_metrics(
    _ = Depends(verify_admin)
) -> Dict:
    return SystemService.get_system_metrics()

@router.get("/network")
@cache(expire=60)
async def get_network_metrics(
    _ = Depends(verify_admin)
) -> Dict:
    return SystemService.get_network_metrics()

@router.get("/health")
@cache(expire=30)
async def get_application_health(
    _ = Depends(verify_admin)
) -> Dict:
    return SystemService.get_application_health()

@router.get("/deployment")
@cache(expire=300)
async def get_deployment_info(
    _ = Depends(verify_admin)
) -> Dict:
    return SystemService.get_deployment_info()

@router.get("/disk")
@cache(expire=300)
async def get_disk_metrics(
    _ = Depends(verify_admin)
) -> Dict:
    return SystemService.get_disk_details()
