'use client';
// src/components/projects/ProjectHorizontalCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '../../lib/projects';
import { trackInteraction } from '../../lib/api/analytics';

interface ProjectHorizontalCardProps {
  project: Project;
}

export function ProjectHorizontalCard({ project }: ProjectHorizontalCardProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-gray-200/80 transition-all duration-200 hover:shadow-lg flex flex-col">
      {/* GitHub Link Button */}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
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
        <div className="flex flex-col md:flex-row h-full">
          {/* Un-cropped image preview container using object-contain */}
          <div className="relative w-full md:w-2/5 h-56 md:h-auto p-2 bg-gray-50/80 border-b md:border-b-0 md:border-r border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-contain rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Content on right */}
          <div className="p-5 md:p-6 flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-gray-900 truncate">
                  {project.title}
                </h3>
                {project.status && (
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full shadow-sm border flex-shrink-0 ${
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
              <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>
            
            {/* Tech Stack Tags */}
            <div className="mt-auto pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(new Set(Object.values(project.techStack).flat())).map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-mono text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent transition-colors duration-150"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}