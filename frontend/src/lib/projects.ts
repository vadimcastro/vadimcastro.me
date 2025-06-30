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
  githubUrl?: string;
  technicalImplementation: {
    systemArchitecture: string[];
    algorithm?: {
      description: string;
      steps: string[];
    };
  };
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
    imageUrl: "/images/scenic_pic.png",
    githubUrl: "https://github.com/vadimcastro/tour-guide",
    technicalImplementation: {
      systemArchitecture: [
        "Scenic's architecture is built around efficient route calculation and POI integration.",
        "The backend uses FastAPI to handle route requests, processing them through a custom algorithm that analyzes potential scenic detours within the user's specified time constraints.",
        "PostgreSQL stores frequently accessed routes and POI data, significantly reducing API calls to Google's services.",
        "The frontend implements a responsive design using React, with careful consideration for state management of route alternatives and POI data.",
        "The map interface utilizes Google Maps JavaScript API for real-time route visualization, with custom overlay management for POI markers and route highlighting."
      ],
      algorithm: {
        description: "The route calculation involves a sophisticated algorithm that optimizes both scenic value and travel time:",
        steps: [
          "Queries nearby scenic points within a configurable radius of the direct route, prioritizing highly-rated locations that minimize deviation from the optimal path",
          "Evaluates potential detours based on user's time flexibility, calculating the time impact of each scenic addition to ensure it stays within specified constraints",
          "Optimizes the route to include the highest-rated scenic points while maintaining time constraints, using a weighted scoring system that balances scenic value against time cost",
          "Provides alternative route options with varying scenic ratings, giving users the flexibility to choose between different combinations of scenic stops and travel times"
        ]
      }
    }
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