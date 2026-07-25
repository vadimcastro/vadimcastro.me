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
  iconUrl?: string;
  githubUrl?: string;
  status: 'active' | 'archived' | 'in_progress' | 'concept';
  technicalImplementation: {
    systemArchitecture: string[];
    algorithm?: {
      description: string;
      steps: string[];
    };
  };
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const INTERNAL_API_URL = 'http://api:8000';

const isServer = typeof window === 'undefined';
const API_BASE_URL = isServer ? INTERNAL_API_URL : NEXT_PUBLIC_API_URL;

const STATUS_PRIORITY: Record<string, number> = {
  active: 1,
  in_progress: 2,
  concept: 3,
  archived: 4,
};

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const priorityA = STATUS_PRIORITY[a.status] || 99;
    const priorityB = STATUS_PRIORITY[b.status] || 99;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return Number(b.id) - Number(a.id);
  });
}

function mapProject(data: any): Project {
  return {
    id: String(data.id),
    slug: data.slug,
    title: data.title,
    shortDescription: data.short_description,
    longDescription: data.long_description,
    techStack: data.tech_stack,
    features: data.features,
    imageUrl: data.image_url,
    iconUrl: data.icon_url,
    githubUrl: data.github_url,
    status: data.status,
    technicalImplementation: data.technical_implementation || { systemArchitecture: [] }
  };
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch projects');
      return [];
    }
    
    const data = await response.json();
    const mapped = data.map(mapProject);
    return sortProjects(mapped);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${slug}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Failed to fetch project');
    }
    
    const data = await response.json();
    return mapProject(data);
  } catch (error) {
    console.error(`Error fetching project by slug (${slug}):`, error);
    return undefined;
  }
}