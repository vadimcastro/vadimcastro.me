// src/app/projects/[slug]/page.tsx - Complete file
"use client";

import { getProjectBySlug } from '../../../lib/projects';
import { ImageModal } from '../../../components/projects/ImageModal';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  if (!project) {
    notFound();
  }

  // Check screen size and scroll position
  useEffect(() => {
    // Function to determine if we should show the scroll indicator
    const checkScrollVisibility = () => {
      // Only show on smaller screens where content may not be visible
      const isSmallerScreen = window.innerHeight < 800;
      
      // Check if we've scrolled already
      const hasScrolled = window.scrollY > 100;
      
      // Show indicator only on smaller screens and when at the top of the page
      setShowScrollIndicator(isSmallerScreen && !hasScrolled);
    };

    // Check immediately and on resize
    checkScrollVisibility();
    window.addEventListener('resize', checkScrollVisibility);
    window.addEventListener('scroll', checkScrollVisibility);
    
    return () => {
      window.removeEventListener('resize', checkScrollVisibility);
      window.removeEventListener('scroll', checkScrollVisibility);
    };
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 space-y-6 py-6">
        {/* Project Header */}
        <header className="space-y-4">
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
          <p className="text-xl text-gray-600 w-full">
            {project.longDescription}
          </p>
        </header>

        {/* Project Image - Using aspect ratio approach */}
        <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200">
          <div 
            className="relative w-full"
            style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
            onClick={() => setSelectedImage(project.imageUrl)}
          >
            <Image
              src={project.imageUrl}
              alt={`${project.title} Showcase`}
              fill
              className="object-fill"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 hover:opacity-100 text-white bg-black/50 px-4 py-2 rounded-full transition-opacity">
                Click to enlarge
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Only on smaller screens */}
        {showScrollIndicator && (
          <div className="flex justify-center animate-bounce mt-4 mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        )}

        {/* Tech Stack and Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-5">Technology Stack</h2>
            
            {/* Frontend */}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.Frontend.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-mint-500/10 text-mint-500 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Backend */}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Backend</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.Backend.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-mint-500/10 text-mint-500 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Database */}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Database</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.Database.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-mint-500/10 text-mint-500 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* DevOps */}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-3">DevOps</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.DevOps.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-mint-500/10 text-mint-500 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-5">Key Features</h2>
            <div className="space-y-5">
              {project.features.map((feature) => (
                <div key={feature.title} className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-medium mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        {project.technicalImplementation && (
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">Technical Implementation</h2>
            
            {/* Architecture Overview Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">System Architecture</h3>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                {project.technicalImplementation.systemArchitecture.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Algorithm Card - Only display if project has algorithm data */}
            {project.technicalImplementation.algorithm && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">Route Calculation Algorithm</h3>
                <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                  <p className="font-medium text-gray-900">
                    {project.technicalImplementation.algorithm.description}
                  </p>
                  
                  <div className="space-y-3 pl-4">
                    {project.technicalImplementation.algorithm.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                          {index + 1}
                        </span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
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