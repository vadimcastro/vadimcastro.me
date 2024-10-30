# backend/app/tests/test_auth.py
from db.session import SessionLocal
from models.user import User
from core.hashing import get_password_hash, verify_password
from core.config import settings
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def test_auth():
    db = SessionLocal()
    try:
        # Create test password hash
        password = settings.ADMIN_PASSWORD
        logger.info(f"Testing with password: {password}")
        
        hashed = get_password_hash(password)
        logger.info("Created password hash")
        
        # Verify hash works
        if not verify_password(password, hashed):
            logger.error("Initial password verification failed")
            return
        
        logger.info("Password hashing test passed")
        
        # Check if admin user exists
        user = db.query(User).filter(
            (User.email == settings.ADMIN_EMAIL)
        ).first()
        
        if user:
            logger.info(f"Found existing user: {user.email}")
            logger.info(f"Stored hash: {user.hashed_password}")
            # Test password
            if verify_password(password, user.hashed_password):
                logger.info("Password verification successful")
            else:
                logger.error("Password verification failed for existing user")
                # Update password
                user.hashed_password = hashed
                db.commit()
                logger.info("Updated user password")
        else:
            logger.info("Creating new admin user")
            user = User(
                email=settings.ADMIN_EMAIL,
                username=settings.ADMIN_USERNAME,
                name=settings.ADMIN_NAME,
                hashed_password=hashed,
                is_active=True,
                is_superuser=True,
                role="admin"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            logger.info(f"Created new admin user with hash: {user.hashed_password}")
            
    except Exception as e:
        logger.error(f"Error in test_auth: {str(e)}", exc_info=True)
    finally:
        db.close()

if __name__ == "__main__":
    test_auth()