# app/api/v1/endpoints/metrics.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict
from app.db.utils import get_db
from app.core.security import get_user_from_token
from fastapi.security import OAuth2PasswordBearer
from app.crud import crud_metrics  # Keep this for future implementation

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.get("/visitors", response_model=Dict)
def get_visitor_metrics(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    # Verify user is authenticated
    user = get_user_from_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Temporary mock data until crud_metrics is implemented
    return {
        "total": 2854,
        "percentageChange": 15.5
    }
    # Future implementation:
    # return crud_metrics.get_visitor_metrics(db)

@router.get("/projects", response_model=Dict)
def get_project_metrics(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    # Verify user is authenticated
    user = get_user_from_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Temporary mock data until crud_metrics is implemented
    return {
        "total": 42,
        "newThisMonth": 5
    }
    # Future implementation:
    # return crud_metrics.get_project_metrics(db)

@router.get("/sessions", response_model=Dict)
def get_session_metrics(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    # Verify user is authenticated
    user = get_user_from_token(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Temporary mock data until crud_metrics is implemented
    return {
        "active": 127,
        "percentageChange": 8.3
    }
    # Future implementation:
    # return crud_metrics.get_session_metrics(db)