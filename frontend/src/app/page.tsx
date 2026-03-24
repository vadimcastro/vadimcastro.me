// frontend/src/app/page.tsx
import { ProjectPreviewCard } from "../components/projects/ProjectPreviewCard";
import { ResumeSummary } from "./resume/ResumeSummary";
import { getAllProjects } from "../lib/projects";

/**
 * Homepage - Server Component
 */
export default async function Home() {
  // Fetch projects asynchronously in RSC
  const projects = await getAllProjects();
  
  // Find the portfolio project to pin it, otherwise fall back to the first project
  const pinnedProject = projects.find(p => p.slug === 'vadimcastro-me') || (projects.length > 0 ? projects[0] : null);

  return (
    <div className="w-full px-2 md:px-4 py-1 md:py-3 text-secondary-900">
      <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 md:items-stretch">
        <section className="w-full border-0 md:border md:border-gray-200 rounded-none md:rounded-lg bg-white/60 md:bg-white shadow-none md:shadow-sm">
          <div className="flex flex-col h-full">
            <h2 className="text-base md:text-xl font-semibold px-2 md:px-4 py-2 md:py-3 border-b-0 md:border-b md:border-gray-100 uppercase tracking-widest text-gray-500">Pinned Project</h2>
            <div className="flex-1 p-2 md:p-3 min-h-[300px]">
              {pinnedProject ? (
                <ProjectPreviewCard project={pinnedProject} />
              ) : (
                <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">No projects available</p>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="w-full border-0 md:border md:border-gray-200 rounded-none md:rounded-lg bg-white/60 md:bg-white shadow-none md:shadow-sm">
          <div className="flex flex-col h-full">
            <h2 className="text-base md:text-xl font-semibold px-2 md:px-4 py-2 md:py-3 border-b-0 md:border-b md:border-gray-100 uppercase tracking-widest text-gray-500">Professional Experience</h2>
            <div className="p-3 md:p-4 flex-1">
              <ResumeSummary />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}