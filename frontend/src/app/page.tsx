// frontend/src/app/page.tsx
import { ProjectPreviewCard } from "../components/projects/ProjectPreviewCard";
import { ResumeSummary } from "./resume/ResumeSummary";
import { getAllProjects } from "../lib/projects";

/**
 * Homepage - Server Component
 */
export default async function Home() {
  const projects = await getAllProjects();
  const pinnedProject = projects.find(p => p.slug === 'vadimcastro-me') || (projects.length > 0 ? projects[0] : null);

  return (
    <div className="w-full max-w-[92%] mx-auto py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Pinned Project Card */}
        <section className="w-full bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all duration-200">
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h2 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-widest">
                Pinned Project
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                Featured
              </span>
            </div>
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
              {pinnedProject ? (
                <ProjectPreviewCard project={pinnedProject} />
              ) : (
                <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">No projects available</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Professional Experience Summary */}
        <section className="w-full bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all duration-200">
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h2 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-widest">
                Professional Experience
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold">
                Overview
              </span>
            </div>
            <div className="p-4 md:p-6 flex-1">
              <ResumeSummary />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}