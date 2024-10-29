# app/db/init_db.py
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.db.models import Base, User
from app.crud.crud_user import get_password_hash

logger = logging.getLogger(__name__)

def init_db():
    logger.info("Initializing database...")
    
    try:
        # Create engine
        engine = create_engine(settings.DATABASE_URL)
        
        # Create all tables
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        
        # Create SessionLocal
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        
        # Check if we need to create the admin user
        if not db.query(User).filter(User.email == settings.ADMIN_EMAIL).first():
            logger.info("Creating admin user...")
            admin_user = User(
                email=settings.ADMIN_EMAIL,
                username=settings.ADMIN_EMAIL,  # Using email as username
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                name=settings.ADMIN_NAME,
                is_active=True,
                is_superuser=True,
                role="admin"
            )
            db.add(admin_user)
            db.commit()
            logger.info("Admin user created successfully")
        
        db.close()
        logger.info("Database initialization completed successfully")
        
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        raise