# app/api/v1/endpoints/analytics.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Dict, List, Any
from app.api.deps import get_db, get_current_active_user
from app.services.analytics import AnalyticsService
from pydantic import BaseModel

router = APIRouter()

class InteractionCreate(BaseModel):
    interaction_type: str
    target_id: str
    metadata: Dict[str, Any] = None

@router.post("/track")
async def track_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    """Public endpoint to track site interactions"""
    return AnalyticsService.track_interaction(
        db, 
        interaction.interaction_type, 
        interaction.target_id, 
        interaction.metadata
    )

@router.get("/stats")
async def get_analytics_stats(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Protected endpoint to get interaction stats"""
    if not current_user.is_superuser:
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return {
        "summary": AnalyticsService.get_total_counts(db),
        "details": AnalyticsService.get_interaction_stats(db, days)
    }
