# app/api/v1/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.utils import get_db
from app.crud.crud_user import crud_user
from app.core.security import create_access_token, get_user_from_token, decode_token
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    logger.info(f"Login attempt for user: {form_data.username}")
    try:
        user = crud_user.authenticate(
            db, 
            email=form_data.username, 
            password=form_data.password
        )
        
        if not user:
            logger.warning(f"Authentication failed for user: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )

        access_token = create_access_token(data={"sub": user.email})
        
        # Verify token immediately
        test_payload = decode_token(access_token)
        if not test_payload:
            logger.error("Token creation verification failed")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Token creation failed"
            )
            
        logger.info(f"Login successful for user: {form_data.username}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

@router.get("/me")
async def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    try:
        logger.debug(f"Accessing /me endpoint with token: {token[:10]}...")
        user = get_user_from_token(token, db)
        if not user:
            logger.warning("Invalid token or user not found")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
            
        logger.debug(f"Successfully retrieved user data for: {user.email}")
        return user
    except Exception as e:
        logger.error(f"Error in /me endpoint: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )