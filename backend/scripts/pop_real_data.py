# backend/scripts/populate_real_data.py
import sys
import os
sys.path.append('/app')

from app.db.session import SessionLocal
from app.db.seeds.projects import seed_projects
from app.models.user import User
from app.models.user_session import UserSession
from datetime import datetime, timedelta

def populate_real_projects():
    db = SessionLocal()
    try:
        print("Seeding projects from app.db.seeds.projects...")
        seed_projects(db)
        print("Projects populated successfully!")
    finally:
        db.close()

def create_user_sessions():
    db = SessionLocal()
    try:
        # Get admin user
        admin = db.query(User).filter(User.email == "admin@vadimcastro.me").first()
        if admin:
            # Create a series of sessions over the past month
            for days in range(30):
                # Create 1-3 sessions per day
                for _ in range(1, 4):
                    session_date = datetime.now() - timedelta(days=days)
                    session = UserSession(
                        user_id=admin.id,
                        created_at=session_date,
                        last_activity=session_date + timedelta(minutes=30)
                    )
                    db.add(session)
        
        db.commit()
        print("User sessions created successfully!")
        
        # Verify sessions
        sessions_count = db.query(UserSession).count()
        print(f"Total sessions in database: {sessions_count}")
        
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting data population...")
    populate_real_projects()
    create_user_sessions()
    print("Data population complete!")
