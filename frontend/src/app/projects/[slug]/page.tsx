// src/app/projects/[slug]/page.tsx
"use client";

import { getProjectBySlug } from '../../../lib/projects';
import { ImageModal } from '../../../components/projects/ImageModal';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState } from 'react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 space-y-12 py-8">
        {/* Project Header */}
        <header className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative w-12 h-12">
              <Image 
                src="/images/compass.svg"
                alt="Project Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">{project.title}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            {project.longDescription}
          </p>
        </header>

        {/* Project Image */}
        <div 
          className="relative h-[500px] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
          onClick={() => setSelectedImage(project.imageUrl)}
        >
          <Image
            src={project.imageUrl}
            alt={`${project.title} Showcase`}
            fill
            className="object-contain bg-white"
            priority
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 hover:opacity-100 text-white bg-black/50 px-4 py-2 rounded-full transition-opacity">
              Click to enlarge
            </span>
          </div>
        </div>

        {/* Tech Stack and Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">Technology Stack</h2>
            <div className="space-y-4">
              {Object.entries(project.techStack).map(([category, technologies]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-xl font-medium text-gray-700">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1.5 bg-mint-500/10 text-mint-500 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">Key Features</h2>
            <div className="space-y-4">
              {project.features.map((feature) => (
                <div key={feature.title} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-medium mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-900">Technical Implementation</h2>
          
          {/* Rest of your implementation sections with updated styling */}
          {/* ... */}
        </section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt={`${project.title} Screenshot`}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}