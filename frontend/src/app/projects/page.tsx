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
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-4 py-2 md:py-6">
      <header className="text-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-4xl font-heading font-bold mb-2 md:mb-3 uppercase tracking-widest">PROJECTS</h1>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
          A showcase of my personal and professional projects.
        </p>
      </header>

      <div className="space-y-3 md:space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="w-full">
            <ProjectHorizontalCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}