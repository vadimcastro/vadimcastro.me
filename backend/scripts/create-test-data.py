# Create a test script: backend/scripts/create_test_data.py
from app.db.session import SessionLocal
from app.models.user import User
from app.models.user_session import UserSession
from app.models.project import Project
from app.core.hashing import get_password_hash
from datetime import datetime, timedelta
import json

def create_test_data():
    db = SessionLocal()
    try:
        # Create test users with different creation dates
        for i in range(5):
            user = User(
                email=f"test{i}@example.com",
                username=f"testuser{i}",
                name=f"Test User {i}",
                hashed_password=get_password_hash("testpass"),
                is_active=True,
                role="user",
                created_at=datetime.now() - timedelta(days=i*10)
            )
            db.add(user)
        db.commit()
        
        # Create test sessions
        users = db.query(User).all()
        for user in users:
            for _ in range(3):  # 3 sessions per user
                session = UserSession(
                    user_id=user.id,
                    created_at=datetime.now() - timedelta(hours=_*2),
                    last_activity=datetime.now() - timedelta(minutes=_*15)
                )
                db.add(session)
        db.commit()
        
        print("Test data created successfully!")
        
    finally:
        db.close()

if __name__ == "__main__":
    create_test_data()