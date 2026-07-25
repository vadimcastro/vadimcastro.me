// src/app/projects/[slug]/page.tsx
"use client";

import { getProjectBySlug, Project } from '../../../lib/projects';
import { ImageModal } from '../../../components/projects/ImageModal';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { Github } from 'lucide-react';
import { trackInteraction } from '../../../lib/api/analytics';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [project, setProject] = useState<Project | undefined | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      const data = await getProjectBySlug(slug);
      setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full max-w-[92%] mx-auto py-12 text-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading project details...</p>
      </div>
    );
  }

  if (project === undefined) {
    notFound();
  }

  if (!project) return null;

  return (
    <>
      <div className="w-full max-w-[92%] mx-auto space-y-4 md:space-y-6 py-4 md:py-6">
        {/* Project Header */}
        <header className="space-y-2 md:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <Image 
                  src={project.iconUrl || "/images/compass.svg"}
                  alt="Project Icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 leading-none">{project.title}</h1>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm border hover:shadow-md transition-all duration-200 group flex-shrink-0"
                title="View on GitHub"
              >
                <Github className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              </a>
            )}
          </div>
          <p className="text-base md:text-xl text-gray-600 w-full font-medium leading-relaxed">
            {project.longDescription}
          </p>
        </header>

        {/* Project Showcase Image - Un-cropped using object-contain */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 cursor-pointer hover:shadow-md transition-all duration-200 bg-gray-50/80 p-2 md:p-3 flex items-center justify-center">
          <div 
            className="relative w-full aspect-video flex items-center justify-center"
            onClick={() => setSelectedImage(project.imageUrl)}
          >
            <img
              src={project.imageUrl}
              alt={`${project.title} Showcase`}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Tech Stack and Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4 uppercase tracking-widest">TECHNOLOGY STACK</h2>
            <div className="space-y-4">
              {Object.entries(project.techStack || {}).map(([category, technologies]) => (
                <div key={category} className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 capitalize">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(technologies) && technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full font-medium text-xs md:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4 uppercase tracking-widest">KEY FEATURES</h2>
            <div className="space-y-4">
              {Array.isArray(project.features) && project.features.map((feature) => (
                <div key={feature.title} className="p-4 bg-white rounded-xl shadow-xs border border-gray-200/80">
                  <h3 className="text-base font-bold mb-1 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        {project.technicalImplementation && (
          <section className="space-y-4 pt-4">
            <h2 className="text-xl font-heading font-bold text-gray-900 uppercase tracking-widest">TECHNICAL IMPLEMENTATION</h2>
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">System Architecture</h3>
              <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                {Array.isArray(project.technicalImplementation.systemArchitecture) && project.technicalImplementation.systemArchitecture.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {project.technicalImplementation.algorithm && (
              <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Route Calculation Algorithm</h3>
                <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700">
                  <p className="font-semibold text-gray-900">
                    {project.technicalImplementation.algorithm.description}
                  </p>
                  
                  <div className="space-y-3">
                    {Array.isArray(project.technicalImplementation.algorithm.steps) && project.technicalImplementation.algorithm.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

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