# backend/app/api/deps.py
from fastapi import Header, HTTPException, Depends
from typing import Optional
from app.core.config import settings
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User

async def verify_api_key(x_api_key: Optional[str] = Header(None)):
    """
    Verify API key for external services.
    """
    if settings.API_KEY_ENABLED:
        if not x_api_key or x_api_key != settings.API_KEY:
            raise HTTPException(status_code=403, detail="Invalid API key")

async def get_current_user_from_token(
    token: str,
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Get current user from JWT token.
    """
    try:
        payload = verify_token(token)
        if payload is None:
            return None
        email: str = payload.get("sub")
        if email is None:
            return None
        user = db.query(User).filter(User.email == email).first()
        return user
    except:
        return None