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
      className="block w-full rounded-lg overflow-hidden bg-white border transition-all duration-200 hover:shadow-lg relative"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image on left for medium screens and up, on top for mobile */}
        <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover bg-gray-50"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        {/* Content on right for medium screens and up, below for mobile */}
        <div className="p-4 md:p-6 flex-1 flex flex-col">
          <h3 className="text-lg md:text-2xl font-heading font-semibold mb-1 md:mb-2 text-gray-900">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-3 md:mb-4">
            {project.shortDescription}
          </p>
          
          {/* Tech Stack Tags */}
          <div className="mt-auto">
            <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {Object.values(project.techStack).flat().slice(0, 6).map((tech) => (
                <span 
                  key={tech} 
                  className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-gray-700"
                >
                  {tech}
                </span>
              ))}
              {Object.values(project.techStack).flat().length > 6 && (
                <span className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-gray-700">
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