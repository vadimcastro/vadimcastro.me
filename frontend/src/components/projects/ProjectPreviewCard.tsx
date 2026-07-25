// frontend/src/components/projects/ProjectPreviewCard.tsx
'use client';

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
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-gray-200/80 transition-all duration-300 hover:shadow-md flex flex-col justify-between">
      {/* GitHub Link Button */}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
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
        className="block w-full h-full flex flex-col justify-between"
        onClick={() => trackInteraction('project_click', project.slug, { title: project.title })}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Un-cropped image preview container using object-contain */}
          <div className="relative w-full aspect-video p-2 bg-gray-50/80 border-b border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-contain rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 group-hover:text-emerald-600 leading-snug">
                  {project.title}
                </h3>
                {project.status && (
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm border flex-shrink-0 ${
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
              <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                {project.shortDescription}
              </p>
            </div>
            
            <div className="space-y-2 pt-3 border-t border-gray-100">
              {Object.entries(project.techStack).map(([category, technologies]) => (
                <div key={category} className="text-xs md:text-sm">
                  <span className="font-bold text-gray-900">{category}:</span>
                  <span className="text-gray-600 ml-2 font-mono">
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