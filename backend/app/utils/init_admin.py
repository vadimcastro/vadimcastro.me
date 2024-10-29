from sqlalchemy.orm import Session
from app.core.config import settings
from app.schemas.user import UserCreate
from app.crud.crud_user import crud_user

def create_admin_user(db: Session) -> None:
    """Create admin user if it doesn't exist"""
    try:
        user = crud_user.get_by_email(db, email=settings.ADMIN_EMAIL)
        if not user:
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