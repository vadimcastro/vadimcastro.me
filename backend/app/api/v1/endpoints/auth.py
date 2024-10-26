# backend/app/api/v1/endpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import create_access_token, verify_token
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, User as UserSchema, UserUpdate
from datetime import timedelta
from typing import Optional
from app.core.config import settings

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(token)
    if payload is None:
        raise credentials_exception
    
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    
    return user

async def get_current_active_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough privileges"
        )
    return current_user

@router.post("/register", response_model=UserSchema)
async def register(
    user_in: UserCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_active_admin)
):
    """
    Create new user (admin only).
    """
    # Check if user exists
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Create new user
    db_user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=User.get_password_hash(user_in.password),
        is_admin=user_in.is_admin
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    # Authenticate user
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not user.verify_password(form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user.email,
            "full_name": user.full_name,
            "is_admin": user.is_admin
        }
    }

@router.post("/logout")
async def logout():
    """
    Logout endpoint - client should remove the token.
    """
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserSchema)
async def read_users_me(
    current_user: User = Depends(get_current_user)
):
    """
    Get current user.
    """
    return current_user

@router.put("/me", response_model=UserSchema)
async def update_user_me(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update own user.
    """
    if user_in.password:
        current_user.hashed_password = User.get_password_hash(user_in.password)
    if user_in.full_name:
        current_user.full_name = user_in.full_name
    if user_in.email:
        # Check if email is already taken
        existing_user = db.query(User).filter(User.email == user_in.email).first()
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        current_user.email = user_in.email
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/initial-setup", response_model=UserSchema)
async def create_first_admin(
    user_in: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Create first admin user. This endpoint only works if there are no users in the system.
    """
    # Check if any users exist
    user_count = db.query(User).count()
    if user_count > 0:
        raise HTTPException(
            status_code=400,
            detail="Initial setup has already been completed"
        )
    
    # Create admin user
    db_user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=User.get_password_hash(user_in.password),
        is_admin=True  # Force admin for first user
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/verify-token")
async def verify_token_validity(
    current_user: User = Depends(get_current_user)
):
    """
    Verify if the current token is valid.
    """
    return {"valid": True, "user": current_user}

@router.post("/reset-password-request")
async def reset_password_request(
    email: str,
    db: Session = Depends(get_db)
):
    """
    Request a password reset.
    In a real application, this would send an email with a reset link.
    """
    user = db.query(User).filter(User.email == email).first()
    if user:
        # In a real application, generate a reset token and send email
        # For now, just return success message
        return {"message": "If the email exists, a reset link will be sent"}
    return {"message": "If the email exists, a reset link will be sent"}