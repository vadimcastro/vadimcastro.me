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
      className="block rounded-lg overflow-hidden bg-white border transition-all duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-200 hover:scale-105"
          priority
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-mint-500">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {project.shortDescription}
        </p>
        <div className="space-y-3">
          {Object.entries(project.techStack).map(([category, technologies]) => (
            <div key={category} className="text-sm">
              <span className="font-medium text-gray-900">{category}:</span>
              <span className="text-gray-600 ml-2">
                {technologies.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}