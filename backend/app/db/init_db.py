# app/db/init_db.py
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.user import User
from app.core.hashing import get_password_hash
import logging

logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    try:
        # Check if admin user exists
        if not db.query(User).filter(User.email == settings.ADMIN_EMAIL).first():
            user = User(
                email=settings.ADMIN_EMAIL,
                username=settings.ADMIN_USERNAME,
                name=settings.ADMIN_NAME,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_active=True,
                is_superuser=True
            )
            db.add(user)
            db.commit()
            logger.info(f"Created admin user: {settings.ADMIN_EMAIL}")
        else:
            logger.info("Admin user already exists")
            
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        db.rollback()
        raise