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
    <div className="relative w-full rounded-lg overflow-hidden bg-white border transition-all duration-200 hover:shadow-lg">
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
    </div>
  );
}