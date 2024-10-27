# app/db/seeds/projects.py
from app.models.project import Project
from sqlalchemy.orm import Session

def seed_projects(db: Session) -> None:
    sample_project = {
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
        "image_url": "/images/scenic_pic.png"
    }

    db_project = Project(**sample_project)
    db.add(db_project)
    db.commit()