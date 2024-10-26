// src/app/page.tsx
import { ProjectPreviewCard } from "../components/projects/ProjectPreviewCard";
import { ResumeSummary } from "./resume/ResumeSummary";
import { getAllProjects } from "../lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen space-y-6">
      <h1 className="text-4xl font-bold">Welcome to My Digital Space</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="h-[calc(100vh-12rem)] border rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-semibold p-6 pb-4">Projects</h2>
            <div className="flex-1 p-6 pt-0">
              {projects.length > 0 ? (
                <ProjectPreviewCard project={projects[0]} />
              ) : (
                <p className="text-gray-500">No projects available</p>
              )}
            </div>
          </div>
        </section>
        <section className="h-[calc(100vh-12rem)] border rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-semibold p-6 pb-4">Work Experience</h2>
            <div className="flex-1 p-6 pt-0">
              <ResumeSummary />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}