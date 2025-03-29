// src/app/projects/page.tsx
"use client";

import { getAllProjects } from "../../lib/projects";
import { ProjectHorizontalCard } from '../../components/projects/ProjectHorizontalCard';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3">Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A showcase of my personal and professional projects.
        </p>
      </header>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="w-full">
            <ProjectHorizontalCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}