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
      {/* GitHub Link Button stays on top right */}
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
        <div className="relative w-full aspect-video overflow-hidden shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-4 md:p-10 flex-1 flex flex-col justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-gray-900 group-hover:text-mint-500 leading-none tracking-tight">
                {project.title}
              </h3>
              {project.status && (
                <span className={`px-4 py-1.5 text-[12px] font-bold uppercase rounded-full shadow-sm border flex-shrink-0 ${
                  project.status === 'in_progress' 
                    ? 'bg-blue-50 text-blue-600 border-blue-100' 
                  : project.status === 'concept'
                  ? 'bg-purple-50 text-purple-600 border-purple-100'
                    : project.status === 'archived'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {project.status.replace('_', ' ')}
                </span>
              )}
            </div>
            <p className="text-gray-800 text-lg md:text-2xl leading-relaxed line-clamp-3 md:line-clamp-4 font-medium opacity-90">
              {project.shortDescription}
            </p>
          </div>
          
          <div className="space-y-3 pt-6 border-t border-gray-100">
            {Object.entries(project.techStack).map(([category, technologies]) => (
              <div key={category} className="text-xs md:text-sm">
                <span className="font-semibold text-gray-900">{category}:</span>
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