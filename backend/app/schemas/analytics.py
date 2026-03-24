# app/schemas/analytics.py
from pydantic import BaseModel, Field, ConfigDict
from typing import Dict, List, Any, Optional
from datetime import datetime

class InteractionBase(BaseModel):
    interaction_type: str = Field(..., description="Type of interaction (e.g. click, view)")
    target_id: str = Field(..., description="Identifier of the target element")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Optional metadata for the interaction")

class InteractionCreate(InteractionBase):
    pass

class AnalyticsInteraction(InteractionBase):
    id: int
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)

class InteractionStats(BaseModel):
    summary: Dict[str, int]
    details: List[Dict[str, Any]]
