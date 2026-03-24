# app/models/project.py
from sqlalchemy import Boolean, Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.db.base_class import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, index=True, nullable=False)
    short_description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=False)
    tech_stack = Column(JSON, nullable=False)  # Stored as JSON: {"Frontend": ["React", ...], ...}
    features = Column(JSON, nullable=False)  # Stored as JSON array of feature objects
    image_url = Column(String, nullable=False)
    icon_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    technical_implementation = Column(JSON, nullable=True)  # Stored as JSON object
    status = Column(String, nullable=False, server_default="active")  # 'active', 'archived', 'in_progress'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())