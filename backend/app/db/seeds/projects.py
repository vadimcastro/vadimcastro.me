# app/db/seeds/projects.py
from app.models.project import Project
from sqlalchemy.orm import Session

def seed_projects(db: Session) -> None:
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
            "icon_url": "/images/compass.svg",
            "github_url": "https://github.com/vadimcastro/tour-guide",
            "technical_implementation": {
                "systemArchitecture": [
                    "Scenic's architecture is built around efficient route calculation and POI integration.",
                    "The backend uses FastAPI to handle route requests, processing them through a custom algorithm that analyzes potential scenic detours within the user's specified time constraints.",
                    "PostgreSQL stores frequently accessed routes and POI data, significantly reducing API calls to Google's services.",
                    "The frontend implements a responsive design using React, with careful consideration for state management of route alternatives and POI data.",
                    "The map interface utilizes Google Maps JavaScript API for real-time route visualization, with custom overlay management for POI markers and route highlighting."
                ],
                "algorithm": {
                    "description": "The route calculation involves a sophisticated algorithm that optimizes both scenic value and travel time:",
                    "steps": [
                        "Queries nearby scenic points within a configurable radius of the direct route, prioritizing highly-rated locations that minimize deviation from the optimal path",
                        "Evaluates potential detours based on user's time flexibility, calculating the time impact of each scenic addition to ensure it stays within specified constraints",
                        "Optimizes the route to include the highest-rated scenic points while maintaining time constraints, using a weighted scoring system that balances scenic value against time cost",
                        "Provides alternative route options with varying scenic ratings, giving users the flexibility to choose between different combinations of scenic stops and travel times"
                    ]
                }
            }
        },
        {
            "slug": "vadimcastro-me",
            "title": "vadimcastro.me",
            "short_description": "A modern, high-performance developer portfolio and infrastructure dashboard.",
            "long_description": "A sophisticated portfolio built with Next.js 14 and FastAPI. Features real-time infrastructure monitoring, engagement tracking, and a premium glassmorphic UI.",
            "tech_stack": {
                "Frontend": ["Next.js", "Tailwind CSS", "Lucide React"],
                "Backend": ["FastAPI", "SQLAlchemy", "Pydantic v2"],
                "Infrastructure": ["Docker", "PostgreSQL", "Redis"]
            },
            "features": [
                {
                    "title": "Infrastructure Dashboard",
                    "description": "Real-time CPU, Memory, and Disk monitoring with detailed modal views.",
                    "icon": "Activity"
                },
                {
                    "title": "Engagement Analytics",
                    "description": "Advanced interaction tracking for projects, resume views, and social links.",
                    "icon": "BarChart3"
                },
                {
                    "title": "Pydantic Modernization",
                    "description": "Full migration to Pydantic 2.0+ ensuring high-performance data validation and type safety.",
                    "icon": "Zap"
                }
            ],
            "image_url": "/images/portfolio_pic.png",
            "icon_url": "/images/activity.png",
            "github_url": "https://github.com/vadimcastro/vadimcastro.me",
            "technical_implementation": {
                "systemArchitecture": [
                    "Monolithic-style modular architecture with clear separation between API, Services, and CRUD layers.",
                    "Next.js 14 App Router for the frontend, utilizing Server Components for performance and Client Components for interactivity.",
                    "FastAPI backend with Pydantic v2 for high-speed data validation and seamless OpenAPI documentation.",
                    "Infrastructure monitoring using optimized subprocess calls and Docker socket integration for real-time container stats.",
                    "PostgreSQL and Redis for persistent storage and high-speed caching of system metrics."
                ]
            }
        }
    ]

    for project_data in projects:
        # Check if project already exists
        existing = db.query(Project).filter(Project.slug == project_data["slug"]).first()
        if not existing:
            db_project = Project(**project_data)
            db.add(db_project)
            print(f"Seeded project: {project_data['slug']}")
        else:
            # Update existing project with new fields
            for key, value in project_data.items():
                setattr(existing, key, value)
            print(f"Updated project: {project_data['slug']}")
    
    db.commit()