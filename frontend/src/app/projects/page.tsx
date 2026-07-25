// src/app/projects/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { getAllProjects, Project } from "../../lib/projects";
import { ProjectHorizontalCard } from '../../components/projects/ProjectHorizontalCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getAllProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-[92%] mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[92%] mx-auto py-4 md:py-6 space-y-6">
      <header className="text-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-4xl font-heading font-bold mb-2 md:mb-3 uppercase tracking-widest text-gray-900">PROJECTS</h1>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
          A showcase of my personal and professional engineering projects.
        </p>
      </header>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="w-full">
            <ProjectHorizontalCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}