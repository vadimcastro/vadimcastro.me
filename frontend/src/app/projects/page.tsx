// src/app/projects/page.tsx
"use client";

import { useState } from 'react';
import { getAllProjects } from "../../lib/projects";
import Image from 'next/image';
import { ImageModal } from '../../components/projects/ImageModal';

export default function ProjectsPage() {
  const projects = getAllProjects();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 space-y-12 py-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of my personal and professional projects.
          </p>
        </header>

        <div className="space-y-24">
          {projects.map((project) => (
            <article key={project.id} className="space-y-12 pb-24 border-b border-gray-200 last:border-0">
              {/* Project Header */}
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
                <h2 className="text-3xl font-bold">
                  {project.title}
                </h2>
              </div>
              
              <p className="text-lg text-gray-600">{project.longDescription}</p>

              {/* Project Image */}
              <div 
                className="relative h-[500px] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(project.imageUrl)}
              >
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} Showcase`}
                  fill
                  className="object-contain bg-gray-100"
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
                {/* Tech Stack */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Technology Stack</h2>
                  <div className="space-y-4">
                    {Object.entries(project.techStack).map(([category, technologies]) => (
                      <div key={category}>
                        <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <span 
                              key={tech} 
                              className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Key Features</h2>
                  <div className="space-y-4">
                    {project.features.map((feature) => (
                      <div key={feature.title} className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Implementation */}
              <section className="space-y-8">
                <h2 className="text-3xl font-semibold">Technical Implementation</h2>
                
                {/* Architecture Overview Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-6">System Architecture</h3>
                  <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                    <p>
                      Scenic's architecture is built around efficient route calculation and POI 
                      integration.
                    </p>

                    <p>
                      The backend uses FastAPI to handle route requests, processing 
                      them through a custom algorithm that analyzes potential scenic detours 
                      within the user's specified time constraints.
                    </p>

                    <p>
                      PostgreSQL stores frequently accessed routes and POI data, significantly 
                      reducing API calls to Google's services.
                    </p>

                    <p>
                      The frontend implements a responsive design using React, with careful 
                      consideration for state management of route alternatives and POI data.
                    </p>

                    <p>
                      The map interface utilizes Google Maps JavaScript API for real-time 
                      route visualization, with custom overlay management for POI markers 
                      and route highlighting.
                    </p>
                  </div>
                </div>

                {/* Route Algorithm Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-6">Route Calculation Algorithm</h3>
                  <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                    <p className="font-medium text-gray-900">
                      The route calculation involves a sophisticated algorithm that optimizes both scenic value and travel time:
                    </p>
                    
                    <div className="space-y-4 pl-4">
                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                          1
                        </span>
                        <p>
                          Queries nearby scenic points within a configurable radius of the direct route, 
                          prioritizing highly-rated locations that minimize deviation from the optimal path
                        </p>
                      </div>

                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                          2
                        </span>
                        <p>
                          Evaluates potential detours based on user's time flexibility, calculating the 
                          time impact of each scenic addition to ensure it stays within specified constraints
                        </p>
                      </div>

                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                          3
                        </span>
                        <p>
                          Optimizes the route to include the highest-rated scenic points while maintaining 
                          time constraints, using a weighted scoring system that balances scenic value against time cost
                        </p>
                      </div>

                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                          4
                        </span>
                        <p>
                          Provides alternative route options with varying scenic ratings, giving users 
                          the flexibility to choose between different combinations of scenic stops and travel times
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Project Screenshot"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}