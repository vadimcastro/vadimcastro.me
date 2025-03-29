# backend/scripts/populate_real_data.py
from app.db.session import SessionLocal
from app.models.project import Project
from app.models.user import User
from app.models.user_session import UserSession
from app.core.hashing import get_password_hash
from datetime import datetime, timedelta
import json

def populate_real_projects():
    db = SessionLocal()
    try:
        # Clear existing projects
        db.query(Project).delete()
        
        # Real projects data
        projects = [
            {
                "slug": "scenic",
                "title": "Scenic",
                "short_description": "A smart navigation app that finds beautiful routes for your road trips, integrating scenic points of interest while keeping your journey time-efficient.",
                "long_description": "A modern navigation application that revolutionizes road trip planning by intelligently incorporating scenic routes and points of interest without significantly impacting journey time.",
                "tech_stack": {
                    "Frontend": ["React", "Google Maps JavaScript API", "Tailwind CSS"],
                    "Backend": ["Python", "FastAPI", "Uvicorn"],
                    "Database": ["PostgreSQL"],
                    "DevOps": ["Conda", "Git"]
                },
                "features": [
                    {
                        "title": "Multi-stop Navigation",
                        "description": "Support for up to 5 waypoints with intelligent scenic route calculation between each stop.",
                        "icon": "Navigation"
                    },
                    {
                        "title": "Interactive POI System",
                        "description": "Dynamic points of interest display with detailed modal views and map markers for scenic locations.",
                        "icon": "Map"
                    },
                    {
                        "title": "Customizable Time Range",
                        "description": "User-defined acceptable time increase (10-75%) for scenic detours with real-time route updates.",
                        "icon": "Clock"
                    }
                ],
                "image_url": "/images/scenic_pic.png",
                "created_at": datetime.now() - timedelta(days=30)  # Created a month ago
            },
            # Add your other real projects here
        ]
        
        for project_data in projects:
            project = Project(
                slug=project_data["slug"],
                title=project_data["title"],
                short_description=project_data["short_description"],
                long_description=project_data["long_description"],
                tech_stack=project_data["tech_stack"],
                features=project_data["features"],
                image_url=project_data["image_url"],
                created_at=project_data.get("created_at", datetime.now())
            )
            db.add(project)
        
        db.commit()
        print("Projects populated successfully!")
        
        # Verify projects
        projects_count = db.query(Project).count()
        print(f"Total projects in database: {projects_count}")
        
    finally:
        db.close()

def create_user_sessions():
    db = SessionLocal()
    try:
        # Get admin user
        admin = db.query(User).filter(User.email == "vadim@vadimcastro.pro").first()
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