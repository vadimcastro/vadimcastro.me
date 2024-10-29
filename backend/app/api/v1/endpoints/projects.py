# app/api/v1/endpoints/projects.py
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import project as project_schemas
from app.models.project import Project
from app.db.utils import get_db

router = APIRouter()

@router.get("/", response_model=List[project_schemas.Project])
def read_projects(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Retrieve all projects.
    """
    projects = db.query(Project).offset(skip).limit(limit).all()
    return projects

@router.get("/{slug}", response_model=project_schemas.Project)
def read_project_by_slug(
    *,
    db: Session = Depends(get_db),
    slug: str,
) -> Any:
    """
    Get project by slug.
    """
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )
    return project

@router.post("/", response_model=project_schemas.Project)
def create_project(
    *,
    db: Session = Depends(get_db),
    project_in: project_schemas.ProjectCreate,
) -> Any:
    """
    Create new project.
    """
    # Check if project with this slug already exists
    if db.query(Project).filter(Project.slug == project_in.slug).first():
        raise HTTPException(
            status_code=400,
            detail="Project with this slug already exists"
        )
    
    db_obj = Project(**project_in.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.put("/{project_id}", response_model=project_schemas.Project)
def update_project(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    project_in: project_schemas.ProjectUpdate,
) -> Any:
    """
    Update a project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )
    
    update_data = project_in.model_dump(exclude_unset=True)
    
    # If updating slug, check it doesn't conflict
    if "slug" in update_data:
        existing = db.query(Project).filter(
            Project.slug == update_data["slug"],
            Project.id != project_id
        ).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Project with this slug already exists"
            )
    
    for field, value in update_data.items():
        setattr(project, field, value)
    
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}")
def delete_project(
    *,
    db: Session = Depends(get_db),
    project_id: int,
) -> Any:
    """
    Delete a project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )
    
    db.delete(project)
    db.commit()
    return {"status": "success", "message": "Project deleted"}