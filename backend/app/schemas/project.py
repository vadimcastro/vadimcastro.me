# app/schemas/project.py
from datetime import datetime
from typing import Optional, Dict, List
from pydantic import BaseModel, ConfigDict

class Feature(BaseModel):
    title: str
    description: str
    icon: str

class ProjectBase(BaseModel):
    slug: str
    title: str
    short_description: str
    long_description: str
    tech_stack: Dict[str, List[str]]
    features: List[Feature]
    image_url: str

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    short_description: Optional[str] = None
    long_description: Optional[str] = None
    tech_stack: Optional[Dict[str, List[str]]] = None
    features: Optional[List[Feature]] = None
    image_url: Optional[str] = None

class ProjectInDBBase(ProjectBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

class Project(ProjectInDBBase):
    pass

class ProjectInDB(ProjectInDBBase):
    pass