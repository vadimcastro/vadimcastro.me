// src/lib/projects.ts

export interface Project {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    techStack: {
      [key: string]: string[];
    };
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    imageUrl: string;
  }
  
  // Define this as a constant first
  const projectsList: Project[] = [
    {
      id: "1",
      slug: "scenic",
      title: "Scenic",
      shortDescription: "A smart navigation app that finds beautiful routes for your road trips, integrating scenic points of interest while keeping your journey time-efficient.",
      longDescription: "A modern navigation application that revolutionizes road trip planning by intelligently incorporating scenic routes and points of interest without significantly impacting journey time.",
      techStack: {
        "Frontend": ["React", "Google Maps JavaScript API", "Tailwind CSS"],
        "Backend": ["Python", "FastAPI", "Uvicorn"],
        "Database": ["PostgreSQL"],
        "DevOps": ["Conda", "Git"]
      },
      features: [
        {
          title: "Multi-stop Navigation",
          description: "Support for up to 5 waypoints with intelligent scenic route calculation between each stop.",
          icon: "Navigation"
        },
        {
          title: "Interactive POI System",
          description: "Dynamic points of interest display with detailed modal views and map markers for scenic locations.",
          icon: "Map"
        },
        {
          title: "Customizable Time Range",
          description: "User-defined acceptable time increase (10-75%) for scenic detours with real-time route updates.",
          icon: "Clock"
        }
      ],
      imageUrl: "/images/scenic_pic.png"
    }
  ];
  
  // Export the functions and the projects array
  export const projects = projectsList;
  
  export function getAllProjects(): Project[] {
    return projectsList;
  }
  
  export function getProjectBySlug(slug: string): Project | undefined {
    return projectsList.find(project => project.slug === slug);
  }