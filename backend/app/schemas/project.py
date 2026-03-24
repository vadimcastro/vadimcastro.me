# app/schemas/project.py
from datetime import datetime
from typing import Optional, Dict, List
from pydantic import BaseModel, ConfigDict, Field

class Feature(BaseModel):
    title: str = Field(..., description="Feature title")
    description: str = Field(..., description="Feature description")
    icon: str = Field(..., description="Icon name (e.g. from Lucide)")

class ProjectBase(BaseModel):
    slug: str = Field(..., description="Unique URL-friendly identifier")
    title: str = Field(..., description="Project title")
    short_description: str = Field(..., description="Brief summary")
    long_description: str = Field(..., description="Detailed description (markdown supported)")
    tech_stack: Dict[str, List[str]] = Field(..., description="Grouped technologies used")
    features: List[Feature] = Field(default_factory=list, description="Key features")
    image_url: str = Field(..., description="Main project image URL")
    icon_url: Optional[str] = Field(None, description="Project icon URL")
    github_url: Optional[str] = Field(None, description="GitHub repository URL")
    technical_implementation: Optional[Dict] = Field(None, description="Detailed technical architecture and algorithms")
    status: Optional[str] = Field("active", description="Project status (active, archived, etc.)")

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    slug: Optional[str] = Field(None)
    title: Optional[str] = Field(None)
    short_description: Optional[str] = Field(None)
    long_description: Optional[str] = Field(None)
    tech_stack: Optional[Dict[str, List[str]]] = Field(None)
    features: Optional[List[Feature]] = Field(None)
    image_url: Optional[str] = Field(None)
    icon_url: Optional[str] = Field(None)
    github_url: Optional[str] = Field(None)
    technical_implementation: Optional[Dict] = Field(None)
    status: Optional[str] = Field(None)

class ProjectInDBBase(ProjectBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int = Field(..., description="Database ID")
    created_at: datetime
    updated_at: Optional[datetime] = None

class Project(ProjectInDBBase):
    pass

class ProjectInDB(ProjectInDBBase):
    pass