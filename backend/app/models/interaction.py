# app/models/interaction.py
from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from app.db.base_class import Base

class AnalyticsInteraction(Base):
    __tablename__ = "analytics_interactions"

    id = Column(Integer, primary_key=True, index=True)
    interaction_type = Column(String, index=True, nullable=False)  # 'project_click', 'resume_view', 'social_click'
    target_id = Column(String, index=True, nullable=False)  # e.g., project slug, 'linkedin', 'github'
    metadata_json = Column(JSON, nullable=True)  # Store browser info, etc.
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
