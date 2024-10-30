from app.db.session import SessionLocal
from app.models.user import User
from app.core.hashing import get_password_hash, verify_password
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create session
db = SessionLocal()

try:
    # Remove existing user if any
    db.query(User).delete()
    db.commit()
    
    # Create new password hash
    password = settings.ADMIN_PASSWORD
    hashed = get_password_hash(password)
    logger.info(f"Created hash for password")
    
    # Create new admin user
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
    
    # Verify it works
    created_user = db.query(User).first()
    if created_user:
        test_verify = verify_password(password, created_user.hashed_password)
        logger.info(f"User created and password verification test: {test_verify}")
finally:
    db.close()