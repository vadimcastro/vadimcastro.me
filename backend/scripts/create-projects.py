from app.db.session import SessionLocal
from app.models.project import Project
import json

db = SessionLocal()

# Example project data
project1 = Project(
    slug="scenic",
    title="Scenic",
    short_description="A smart navigation app that finds beautiful routes.",
    long_description="A modern navigation application that revolutionizes road trip planning.",
    tech_stack=json.dumps({
        "Frontend": ["React", "Google Maps JavaScript API", "Tailwind CSS"],
        "Backend": ["Python", "FastAPI", "Uvicorn"],
        "Database": ["PostgreSQL"],
        "DevOps": ["Conda", "Git"]
    }),
    features=json.dumps([
        {
            "title": "Multi-stop Navigation",
            "description": "Support for up to 5 waypoints with intelligent scenic route calculation.",
            "icon": "Navigation"
        }
    ]),
    image_url="/images/scenic_pic.png"
)

# Add and commit
db.add(project1)
db.commit()

# Verify
project_count = db.query(Project).count()
print(f"Total projects: {project_count}")

db.close()