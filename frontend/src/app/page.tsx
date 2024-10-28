// frontend/src/app/page.tsx
import { ProjectPreviewCard } from "../components/projects/ProjectPreviewCard";
import { ResumeSummary } from "./resume/ResumeSummary";
import { getAllProjects } from "../lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="max-w-[95%] mx-auto px-4 py-4 space-y-2">
      <h1 className="text-3xl font-semibold text-gray-900">
        Welcome to My Digital Space
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="h-[750px] border rounded-lg bg-white shadow-sm">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-semibold px-6 py-4 border-b">Projects</h2>
            <div className="flex-1 p-4">
              {projects.length > 0 ? (
                <div className="h-full flex items-stretch">
                  <ProjectPreviewCard project={projects[0]} />
                </div>
              ) : (
                <p className="text-gray-500">No projects available</p>
              )}
            </div>
          </div>
        </section>
        <section className="h-[750px] border rounded-lg bg-white shadow-sm">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-semibold px-6 py-4 border-b">Work Experience</h2>
            <div className="flex-1 p-4 overflow-y-auto">
              <ResumeSummary />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}