// frontend/src/app/page.tsx
import { ProjectPreviewCard } from "../components/projects/ProjectPreviewCard";
import { ResumeSummary } from "./resume/ResumeSummary";
import { getAllProjects } from "../lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="w-full px-2 md:px-4 py-1 md:py-3">
      <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 md:items-start">
        <section className="w-full border-0 md:border md:border-gray-200 rounded-none md:rounded-lg bg-white/60 md:bg-white shadow-none md:shadow-sm">
          <div className="flex flex-col">
            <h2 className="text-base md:text-xl font-semibold px-3 md:px-4 py-2 md:py-3 border-b-0 md:border-b md:border-gray-100">Pinned Project</h2>
            <div>
              {projects.length > 0 ? (
                <ProjectPreviewCard project={projects[0]} />
              ) : (
                <p className="text-gray-500 p-3 md:p-4">No projects available</p>
              )}
            </div>
          </div>
        </section>
        <section className="w-full border-0 md:border md:border-gray-200 rounded-none md:rounded-lg bg-white/60 md:bg-white shadow-none md:shadow-sm">
          <div className="flex flex-col">
            <h2 className="text-base md:text-xl font-semibold px-3 md:px-4 py-2 md:py-3 border-b-0 md:border-b md:border-gray-100">Work Experience Overview</h2>
            <div className="p-3 md:p-4">
              <ResumeSummary />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}