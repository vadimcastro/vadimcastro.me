# backend/scripts/test_auth.py
from app.db.session import SessionLocal
from app.models.user import User
from app.core.hashing import get_password_hash, verify_password
from app.core.config import settings
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def test_auth():
    db = SessionLocal()
    try:
        # Create test password hash
        password = "meow"
        hashed = get_password_hash(password)
        
        # Verify hash works
        assert verify_password(password, hashed), "Password verification failed"
        logger.info("Password hashing test passed")
        
        # Check if admin user exists
        user = db.query(User).filter(
            (User.email == settings.ADMIN_EMAIL) | 
            (User.username == settings.ADMIN_USERNAME)
        ).first()
        
        if user:
            logger.info(f"Found existing user: {user.email}")
            # Test password
            if verify_password(settings.ADMIN_PASSWORD, user.hashed_password):
                logger.info("Password verification successful")
            else:
                logger.error("Password verification failed for existing user")
                # Update password
                user.hashed_password = get_password_hash(settings.ADMIN_PASSWORD)
                db.commit()
                logger.info("Updated user password")
        else:
            logger.info("Creating new admin user")
            user = User(
                email=settings.ADMIN_EMAIL,
                username=settings.ADMIN_USERNAME,
                name=settings.ADMIN_NAME,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_active=True,
                is_superuser=True,
                role="admin"
            )
            db.add(user)
            db.commit()
            logger.info("Created new admin user")
            
    finally:
        db.close()

if __name__ == "__main__":
    test_auth()