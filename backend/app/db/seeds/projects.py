# app/db/seeds/projects.py
from app.models.project import Project
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

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
            "github_url": "https://github.com/vadimcastro/scenic",
            "technical_implementation": {
                "systemArchitecture": [
                    "The system utilizes a dual-engine approach to route calculation. The primary engine handles standard point-to-point navigation using the Google Maps Directions API, while a secondary 'Scenic Discovery' engine processes POI data from a custom-indexed PostgreSQL database.",
                    "Route optimization is performed asynchronously via a Python-based worker that evaluates potential detours against user-defined time constraints, ensuring that scenic additions never exceed a specific percentage of the original ETA."
                ],
                "algorithm": {
                    "description": "Our proprietary Scenic-Detour-Optimizer (SDO) selects high-value POIs along a corridor surrounding the optimal route.",
                    "steps": [
                        "Generate a baseline optimal route using the A* algorithm variant.",
                        "Construct a search corridor (buffer) with a radius based on the user's available detour time.",
                        "Score nearby POIs based on scenic ratings, category preferences, and detour overhead.",
                        "Iteratively insert high-scoring waypoints into the route while verifying time constraints."
                    ]
                }
            },
            "status": "concept"
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
            "icon_url": "/images/image-generator.png",
            "github_url": "https://github.com/vadimcastro/vadimcastro.me",
            "technical_implementation": {
                "systemArchitecture": [
                    "The platform is engineered as a monolithic-style modular system, ensuring a strict separation between the FastAPI backend services and the Next.js 14 frontend. On the server side, we leverage Pydantic v2 for high-performance data validation and type safety, while the frontend utilizes the modern Next.js App Router to optimize performance through a strategic mix of Server Components for SEO and Client Components for interactivity.",
                    "Infrastructure health and engagement analytics are powered by a robust data layer consisting of PostgreSQL for persistent storage and Redis for high-speed metric caching. Real-time system monitoring is achieved through optimized subprocess execution and direct Docker socket integration, providing live, low-latency visibility into CPU, memory, and container performance."
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
