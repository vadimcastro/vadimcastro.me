// src/components/projects/ProjectDetailPage.tsx
import React from 'react';
import { Project } from '../../lib/projects';
import Image from 'next/image';

interface ProjectDetailPageProps {
  project: Project;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 py-12">
      <header className="space-y-8">
        <div className="flex items-center">
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

      <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl bg-gray-100">
        <Image
          src={project.imageUrl}
          alt={`${project.title} Showcase`}
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="space-y-6">
              {project.features.map((feature) => (
                <div key={feature.title} className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <span className="text-green-600">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
          <div className="space-y-6">
            {Object.entries(project.techStack).map(([category, technologies]) => (
              <div key={category} className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}