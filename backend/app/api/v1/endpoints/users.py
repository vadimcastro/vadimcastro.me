# app/api/v1/endpoints/users.py
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.schemas import user as user_schemas
from app.crud import crud_user
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=List[user_schemas.User])
def read_users(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve users.
    """
    users = crud_user.get_multi(db, skip=skip, limit=limit)
    return users

@router.post("/", response_model=user_schemas.User)
def create_user(
    *,
    db: Session = Depends(get_db),
    user_in: user_schemas.UserCreate,
) -> Any:
    """
    Create new user.
    """
    user = crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = crud_user.create(db, obj_in=user_in)
    return user

@router.put("/{user_id}", response_model=user_schemas.User)
def update_user(
    *,
    db: Session = Depends(get_db),
    user_id: int,
    user_in: user_schemas.UserUpdate,
) -> Any:
    """
    Update a user.
    """
    user = crud_user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this ID does not exist in the system",
        )
    user = crud_user.update(db, db_obj=user, obj_in=user_in)
    return user