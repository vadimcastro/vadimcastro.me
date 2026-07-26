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
      <div className="w-full max-w-[92%] mx-auto py-4 md:py-6 space-y-6">
        {/* Project Header */}
        <header className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 sm:p-7 space-y-4 hover:shadow-xs transition-all duration-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5 sm:space-x-4 min-w-0">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 p-1 bg-gray-50 border border-gray-200/80 rounded-xl shadow-2xs flex-shrink-0 flex items-center justify-center">
                <Image 
                  src={project.iconUrl || "/images/compass.svg"}
                  alt={`${project.title} icon`}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex items-center gap-3 min-w-0 flex-wrap">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 tracking-tight truncate">
                  {project.title}
                </h1>
                {project.status && (
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full border shadow-2xs shrink-0 ${
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
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl shadow-2xs border border-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200 shrink-0 flex items-center gap-2 text-xs font-semibold"
                title="View on GitHub"
                onClick={() => trackInteraction('social_click', 'github_project', { project: project.slug })}
              >
                <Github className="w-4 h-4 text-gray-700" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
          </div>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal border-t border-gray-100 pt-3.5">
            {project.longDescription}
          </p>
        </header>

        {/* Project Showcase Image */}
        <section className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-2xs p-2 sm:p-3 hover:shadow-xs transition-all duration-200">
          <div 
            className="relative w-full bg-gray-50/40 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer group"
            onClick={() => setSelectedImage(project.imageUrl)}
          >
            <img
              src={project.imageUrl}
              alt={`${project.title} Showcase`}
              className="w-full h-auto max-h-[600px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span className="px-3.5 py-1.5 bg-white/95 text-gray-900 text-xs font-semibold rounded-lg shadow-md border border-gray-200/80">
                Click to expand
              </span>
            </div>
          </div>
        </section>

        {/* Key Features and Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Key Features Column (Left) */}
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 sm:p-7 space-y-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest pb-3 border-b border-gray-100 mb-4">
                Key Features
              </h2>
              <div className="space-y-4">
                {Array.isArray(project.features) && project.features.map((feature) => (
                  <div key={feature.title} className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/60 space-y-1.5">
                    <h3 className="text-sm font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tech Stack Column (Right) */}
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 sm:p-7 space-y-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-gray-700 uppercase tracking-widest pb-3 border-b border-gray-100 mb-4">
                Technology Stack
              </h2>
              <div className="space-y-5 sm:space-y-6">
                {Object.entries(project.techStack || {}).map(([category, technologies]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(technologies) && technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1.5 bg-emerald-50/70 text-emerald-900 border border-emerald-200/70 rounded-lg font-mono text-xs sm:text-sm font-semibold shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Technical Implementation Section */}
        {project.technicalImplementation && (
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg sm:text-xl font-heading font-bold text-gray-900 tracking-tight">
                Technical Implementation & Deep Dive
              </h2>
            </div>

            {/* System Architecture */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                System Architecture & Data Pipeline
              </h3>
              <div className="bg-gray-50/40 rounded-xl border border-gray-200/70 p-5 sm:p-6 space-y-3.5">
                {Array.isArray(project.technicalImplementation.systemArchitecture) && project.technicalImplementation.systemArchitecture.map((paragraph, index) => (
                  <p key={index} className="text-sm sm:text-base leading-relaxed text-gray-700 font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Core Algorithm & Execution Model */}
            {project.technicalImplementation.algorithm && (
              <div className="space-y-4 pt-5 border-t border-gray-100">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                  Core Algorithm & Execution Model
                </h3>

                <div className="bg-gray-50/40 rounded-xl border border-gray-200/70 p-5 sm:p-6 space-y-4">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed border-b border-gray-200/60 pb-3">
                    {project.technicalImplementation.algorithm.description}
                  </p>
                  
                  <ol className="space-y-3 pl-5 list-decimal text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {Array.isArray(project.technicalImplementation.algorithm.steps) && project.technicalImplementation.algorithm.steps.map((step, index) => (
                      <li key={index} className="pl-1.5">
                        <span className="text-gray-800">{step}</span>
                      </li>
                    ))}
                  </ol>
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