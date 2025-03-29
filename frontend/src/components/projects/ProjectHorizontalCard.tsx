// src/components/projects/ProjectHorizontalCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '../../lib/projects';

interface ProjectHorizontalCardProps {
  project: Project;
}

export function ProjectHorizontalCard({ project }: ProjectHorizontalCardProps) {
  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className="block w-full rounded-lg overflow-hidden bg-white border transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image on left for medium screens and up, on top for mobile */}
        <div className="relative w-full md:w-2/5 h-64 md:h-auto">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-contain bg-gray-50"
            priority
          />
        </div>
        
        {/* Content on right for medium screens and up, below for mobile */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 text-gray-900">
            {project.title}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {project.shortDescription}
          </p>
          
          {/* Tech Stack Tags */}
          <div className="mt-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(project.techStack).flat().slice(0, 6).map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {tech}
                </span>
              ))}
              {Object.values(project.techStack).flat().length > 6 && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  +{Object.values(project.techStack).flat().length - 6} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}