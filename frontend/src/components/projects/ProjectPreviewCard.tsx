// src/components/projects/ProjectPreviewCard.tsx
"use client";

import React from 'react';
import { Project } from '../../lib/projects';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectPreviewCardProps {
  project: Project;
}

export const ProjectPreviewCard: React.FC<ProjectPreviewCardProps> = ({ project }) => {
  const mainTechnologies = Object.values(project.techStack).flat().slice(0, 4);

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <div className="group rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white h-full flex flex-col">
        <div className="relative w-full h-[60%] bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
          <Image
            src={project.imageUrl}
            alt={`${project.title} Interface`}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 relative z-0"
            priority
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-4 group-hover:underline decoration-1">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.shortDescription}</p>
            <div className="space-y-2">
              {project.features.slice(0, 2).map((feature) => (
                <div key={feature.title} className="flex items-baseline space-x-2">
                  <span className="text-[#98FB98] text-lg">•</span>
                  <span className="text-sm text-gray-600 flex-1">{feature.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {mainTechnologies.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};