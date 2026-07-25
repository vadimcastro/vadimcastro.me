'use client';
// src/components/resume/ResumeSummary.tsx
import Link from 'next/link';
import Image from 'next/image';
import { trackInteraction } from '../../lib/api/analytics';

export const ResumeSummary = () => {
  return (
    <Link 
      href="/resume" 
      className="block h-full group cursor-pointer"
      onClick={() => trackInteraction('resume_view', 'home_summary')}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Key Skills section */}
        <div className="shrink-0 pb-3 border-b border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Key Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {[
              "React",
              "Python",
              "Java",
              "Spring Boot",
              "PostgreSQL",
              "AWS",
              "CI/CD",
              "REST APIs"
            ].map((skill) => (
              <span 
                key={skill}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md border border-emerald-200/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience section */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">Experience</h3>
          
          <div className="space-y-3">
            {/* Stickshift AI */}
            <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 group-hover:border-emerald-200/80 transition-all duration-200 space-y-1">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 p-0.5 bg-white border border-gray-200/80 rounded-lg shadow-xs shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/companies/stickshift-logo.png"
                    alt="Stickshift AI"
                    fill
                    sizes="32px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="font-bold text-xs md:text-sm text-gray-900 truncate">Senior Software Engineer</h4>
                    <span className="text-[11px] text-gray-500 font-medium shrink-0">Dec 2023 - Dec 2025</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-600">Stickshift AI</p>
                </div>
              </div>
              <ul className="text-xs text-gray-600 space-y-0.5 pl-11">
                <li>• Full-stack AI platform (React, Node, Postgres) with multi-LLM access</li>
                <li>• Provider-agnostic abstraction for OpenAI, Anthropic, & xAI APIs</li>
                <li>• Managed full LLM upgrade lifecycle (GPT-5, Claude 4.5, Grok 4)</li>
              </ul>
            </div>

            {/* Goldman Sachs */}
            <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 group-hover:border-emerald-200/80 transition-all duration-200 space-y-1">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 p-0.5 bg-white border border-gray-200/80 rounded-lg shadow-xs shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/companies/goldman-sachs-logo.png"
                    alt="Goldman Sachs"
                    fill
                    sizes="32px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="font-bold text-xs md:text-sm text-gray-900 truncate">Platform & Data Engineer</h4>
                    <span className="text-[11px] text-gray-500 font-medium shrink-0">Feb 2022 - Apr 2023</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-600">Goldman Sachs & Co.</p>
                </div>
              </div>
              <ul className="text-xs text-gray-600 space-y-0.5 pl-11">
                <li>• Retrofitted Legend models into Pydantic & Postgres for DLA system</li>
                <li>• Dynamic semantic versioned PyPI libraries via GitLab CI/CD</li>
                <li>• Full-stack Demo Service for feature testing & data pipeline REST APIs</li>
              </ul>
            </div>

            {/* IBM */}
            <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 group-hover:border-emerald-200/80 transition-all duration-200 space-y-1">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 p-0.5 bg-white border border-gray-200/80 rounded-lg shadow-xs shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/companies/ibm-logo.png"
                    alt="IBM"
                    fill
                    sizes="32px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="font-bold text-xs md:text-sm text-gray-900 truncate">Associate Software Developer</h4>
                    <span className="text-[11px] text-gray-500 font-medium shrink-0">Aug 2020 - Dec 2021</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-600">IBM</p>
                </div>
              </div>
              <ul className="text-xs text-gray-600 space-y-0.5 pl-11">
                <li>• Java Spring Boot, PostgreSQL & AWS microservices for GSA and FDA</li>
                <li>• Data access APIs and Python DevOps automation scripts</li>
              </ul>
            </div>

            {/* UAlbany Research Lab */}
            <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 group-hover:border-emerald-200/80 transition-all duration-200 space-y-1">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 p-0.5 bg-white border border-gray-200/80 rounded-lg shadow-xs shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/companies/ualbany-logo.png"
                    alt="UAlbany"
                    fill
                    sizes="32px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="font-bold text-xs md:text-sm text-gray-900 truncate">Research Assistant</h4>
                    <span className="text-[11px] text-gray-500 font-medium shrink-0">Aug 2018 - Feb 2019</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-600">Data Mining & Management Lab, UAlbany</p>
                </div>
              </div>
              <ul className="text-xs text-gray-600 space-y-0.5 pl-11">
                <li>• Analyzed time-evolving networks for anomalous patterns & communities</li>
                <li>• Optimized graph parameters with ROC AUC metrics on temporal data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education section */}
        <div className="shrink-0 pt-3 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">Education</h3>
          <div className="p-2.5 bg-gray-50/70 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="relative w-8 h-8 p-0.5 bg-white border border-gray-200/80 rounded-lg shadow-xs shrink-0 flex items-center justify-center">
              <Image
                src="/images/companies/ualbany-logo.png"
                alt="UAlbany"
                fill
                sizes="32px"
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-gray-900 truncate">B.S. Computer Science & Applied Mathematics</h4>
              <p className="text-xs text-gray-600">University at Albany, SUNY (2015 - 2019)</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};