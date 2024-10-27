# backend/app/models/user.py
from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Session
from app.db.base_class import Base
from app.core.config import settings
from app.core.security import get_password_hash
from app.schemas.user import UserCreate  # Add this import
from app.crud import crud_user

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    role = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


def create_admin_user(db: Session) -> None:
    """Create admin user if it doesn't exist"""
    try:
        # Check if admin user exists
        user = crud_user.get_by_email(db, email=settings.ADMIN_EMAIL)
        if not user:
            # Create admin user from environment variables
            user_in = UserCreate(
                email=settings.ADMIN_EMAIL,
                password=settings.ADMIN_PASSWORD,
                name=settings.ADMIN_NAME,
                username=settings.ADMIN_EMAIL.split('@')[0],
                is_superuser=True,
                is_active=True,
                role="Full Stack Developer"
            )
            crud_user.create(db, obj_in=user_in)
            print("Admin user created successfully")
        else:
            print("Admin user already exists")
    except Exception as e:
        print(f"Error creating admin user: {e}")
        db.rollback()
        raise



def create_admin_user(db: Session) -> None:
    """Create admin user if it doesn't exist"""
    try:
        # Check if admin user exists
        user = crud_user.get_by_email(db, email=settings.ADMIN_EMAIL)
        if not user:
            # Create admin user from environment variables
            user_in = UserCreate(
                email=settings.ADMIN_EMAIL,
                password=settings.ADMIN_PASSWORD,
                name=settings.ADMIN_NAME,
                username=settings.ADMIN_EMAIL.split('@')[0],
                is_superuser=True,
                is_active=True,
                role="Full Stack Developer"
            )
            crud_user.create(db, obj_in=user_in)
            print("Admin user created successfully")
        else:
            print("Admin user already exists")
    except Exception as e:
        print(f"Error creating admin user: {e}")
        db.rollback()
        raise