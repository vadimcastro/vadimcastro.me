// src/components/projects/ProjectDetailPage.tsx
import React from 'react';
import { Project } from '../../lib/projects';
import Image from 'next/image';

interface ProjectDetailPageProps {
  project: Project;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4">
      <header className="space-y-6">
        <div className="flex items-center">
          {/* Updated compass icon with green color and padding */}
          <svg 
            className="w-12 h-12 text-green-600 mr-6"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2L19.17 8.17L15.83 11.5L18.58 14.25L13.5 19.33L8.42 14.25L11.17 11.5L7.83 8.17L12 2Z M12 22V2" />
          </svg>
          <h1 className="text-5xl font-bold">{project.title}</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          {project.longDescription}
        </p>
      </header>

      {/* Updated image container for better display */}
      <div className="relative h-[600px] rounded-xl overflow-hidden shadow-xl bg-gray-100">
        <Image
          src={project.imageUrl}
          alt={`${project.title} Showcase`}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ... */}
      </div>
    </div>
  );
};