# app/db/init_db.py
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import engine, SessionLocal
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def wait_for_db() -> bool:
    try:
        db = SessionLocal()
        # Try to create session to check if DB is awake
        db.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.error(f"DB not ready: {e}")
        return False
    finally:
        db.close()

def init_db() -> None:
    try:
        # Import here to avoid circular imports
        from app.crud.crud_user import crud_user
        from app.schemas.user import UserCreate
        
        # Create a new session
        db = SessionLocal()
        try:
            # Verify the users table exists by trying to query it
            db.execute(text("SELECT 1 FROM users LIMIT 1"))
            logger.info("Users table exists")
            
            # Check if admin user exists
            existing_user = crud_user.get_by_email(db, email=settings.ADMIN_EMAIL)
            
            if not existing_user:
                # Create admin user
                user_in = UserCreate(
                    email=settings.ADMIN_EMAIL,
                    password=settings.ADMIN_PASSWORD,
                    username=settings.ADMIN_EMAIL.split('@')[0],
                    name=settings.ADMIN_NAME,
                    is_superuser=True,
                    is_active=True,
                    role="Full Stack Developer"
                )
                crud_user.create(db, obj_in=user_in)
                logger.info(f"Admin user created successfully: {settings.ADMIN_EMAIL}")
            else:
                logger.info(f"Admin user already exists: {settings.ADMIN_EMAIL}")
                
            db.commit()
        except Exception as e:
            logger.error(f"Error during database initialization: {e}")
            db.rollback()
            raise
        finally:
            db.close()
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise