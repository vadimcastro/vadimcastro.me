'use client';
// frontend/src/components/projects/ProjectPreviewCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';
import type { Project } from '../../lib/projects';
import { trackInteraction } from '../../lib/api/analytics';

interface ProjectPreviewCardProps {
  project: Project;
}

export function ProjectPreviewCard({ project }: ProjectPreviewCardProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-white border-0 md:border md:border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
      {/* Project Status Tag */}
      {project.status && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full shadow-sm border ${
            project.status === 'in_progress' 
              ? 'bg-blue-50 text-blue-600 border-blue-100' 
              : project.status === 'archived'
              ? 'bg-gray-50 text-gray-500 border-gray-100'
              : 'bg-emerald-50 text-emerald-600 border-emerald-100'
          }`}>
            {project.status.replace('_', ' ')}
          </span>
        </div>
      )}
      {/* GitHub Link Button */}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm border hover:shadow-md transition-all duration-200 group"
          title="View on GitHub"
          onClick={(e) => {
            e.stopPropagation();
            trackInteraction('social_click', 'github_project', { project: project.slug });
          }}
        >
          <Github className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
        </a>
      )}
      
      <Link 
        href={`/projects/${project.slug}`} 
        className="block w-full h-full"
        onClick={() => trackInteraction('project_click', project.slug, { title: project.title })}
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
    </div>
  );
}