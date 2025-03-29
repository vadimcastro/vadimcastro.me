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
      className="w-full h-full rounded-lg overflow-hidden bg-white border transition-all duration-200 hover:shadow-lg"
    >
      <div className="h-full flex flex-col">
        <div className="w-full" style={{ height: '65%' }}>
          <div className="w-full h-full bg-white overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'top' }}
            />
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-1 text-gray-900 group-hover:text-mint-500">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-1">
            {project.shortDescription}
          </p>
          <div className="mt-auto">
            {Object.entries(project.techStack).map(([category, technologies]) => (
              <div key={category} className="text-sm mb-1">
                <span className="font-medium text-gray-900">{category}:</span>
                <span className="text-gray-600 ml-2">
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