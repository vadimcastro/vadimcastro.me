// frontend/src/components/projects/ProjectPreviewCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '../../lib/projects';

interface ProjectPreviewCardProps {
  project: Project;
}

export function ProjectPreviewCard({ project }: ProjectPreviewCardProps) {
  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className="block w-full h-full rounded-lg overflow-hidden bg-white border-0 md:border md:border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
    >
      <div className="flex flex-col h-full">
        <div className="w-full flex-1 overflow-hidden flex items-center justify-center">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-3 shrink-0">
          <h3 className="text-base md:text-lg font-semibold mb-1 text-gray-900 group-hover:text-mint-500">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-2 text-xs md:text-sm leading-tight">
            {project.shortDescription}
          </p>
          <div className="space-y-0.5">
            {Object.entries(project.techStack).map(([category, technologies]) => (
              <div key={category} className="text-xs md:text-sm">
                <span className="font-medium text-gray-900">{category}:</span>
                <span className="text-gray-600 ml-1">
                  {technologies.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}