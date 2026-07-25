// src/app/resume/page.tsx
"use client";
import Image from 'next/image';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';
import { trackInteraction } from '../../lib/api/analytics';

interface Experience {
  company: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies?: string[];
}

const experiences: Experience[] = [
  {
    company: "Stickshift AI",
    logo: "/images/companies/stickshift-logo.png",
    role: "Senior Software Engineer, UI/UX",
    period: "Dec 2023 - Oct 2024",
    location: "Austin, Texas",
    description: [
      "Added integration for GPT-4 Turbo and Claude 3 Haiku based search assistant",
      "Implemented Bing Autosuggest API for real-time search suggestions",
      "Designed & implemented mobile friendly UI using React",
      "Upgraded existing UI components to better conform to proximity & consistency design principles"
    ],
    technologies: ["React", "GPT-4", "Claude 3", "Bing API", "UI/UX", "Mobile Design"]
  },
  {
    company: "Goldman Sachs & Co.",
    logo: "/images/companies/goldman-sachs-logo.png",
    role: "Software Engineer, Platform & Data",
    period: "Feb 2022 - April 2023",
    location: "Dallas, Texas",
    description: [
      "Developed and implemented a streamlined data pipeline strategy to ensure data integrity across all stages of the data lifecycle for Digital Loan Agent system",
      "Developed and published custom internal Python libraries to GS private PyPi via Gitlab CI pipeline with automated dynamic versioning",
      "Developed and managed CI/CD pipelines in Gitlab CI including testing, packaging & deployment jobs across multiple services",
      "Developed a Demo Service for testing new features due to infancy and instability of DLA system",
      "Implemented Gitlab and Jira integration to allow team to reference Jira tickets in Git commit messages"
    ],
    technologies: ["Python", "GitLab CI", "PyPi", "Data Pipeline", "CI/CD", "Jira"]
  },
  {
    company: "IBM",
    logo: "/images/companies/ibm-logo.png",
    role: "Associate Software Developer",
    period: "August 2020 - December 2021",
    location: "Washington, D.C.",
    description: [
      "Developed several REST services with Java, Spring Boot, PostgreSQL and AWS for GSA and FDA",
      "Iteratively designed and implemented DB schema, as well as developed an API and REST service for Data Scientists",
      "Created Python scripts to automate DB instance configuration, data ingestion and data removal",
      "Occasionally performed code reviews for Data Scientists on GSA project"
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Python", "REST API"]
  },
  {
    company: "Data Mining and Management Lab, UAlbany",
    logo: "/images/companies/ualbany-logo.png",
    role: "Research Assistant",
    period: "August 2018 - February 2019",
    location: "Albany, New York",
    description: [
      "Analyzed time-evolving networks for anomalous event patterns",
      "Engineered software to identify and mine dynamic communities in temporal graphs",
      "Utilized metrics such as ROC AUC to optimize parameter values",
      "Synthesized mock data for testing",
      "Worked around a messy legacy codebase to implement new functionality"
    ],
    technologies: ["Data Mining", "Network Analysis", "ROC AUC", "Data Synthesis", "Graph Theory"]
  }
];

export default function ResumePage() {
  return (
    <div className="w-full max-w-[92%] mx-auto py-4 md:py-6 space-y-6">
      {/* Header Profile Info */}
      <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 hover:shadow-md transition-all duration-200">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-md p-1 bg-white">
              <Image
                src="/images/profile.jpg"
                alt="Vadim Castro"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Vadim Castro</h1>
            <h2 className="text-lg font-semibold text-emerald-600 mt-1">Software Engineer — Platform & Data</h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-2 leading-relaxed">
              Specialized in distributed data pipelines, cloud infrastructure, Python/Java services, and React web applications.
            </p>
            
            <div className="flex justify-center mt-5">
              <div className="flex items-center gap-3">
                <a
                  href="tel:914-222-0975"
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900"
                  title="Call"
                  onClick={() => trackInteraction('social_click', 'phone', { location: 'resume' })}
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a
                  href="mailto:vadimcastro1@gmail.com?subject=Hey%20Vadim!"
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900"
                  title="Send Email"
                  onClick={() => trackInteraction('social_click', 'email', { location: 'resume' })}
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vadimcastro"
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  onClick={() => trackInteraction('social_click', 'linkedin', { location: 'resume' })}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/vadimcastro"
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  onClick={() => trackInteraction('social_click', 'github', { location: 'resume' })}
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience List */}
      <section className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-gray-900 uppercase tracking-wider px-1">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.company} experience={exp} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4 pt-2">
        <h2 className="text-xl font-heading font-bold text-gray-900 uppercase tracking-wider px-1">
          Education
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 md:w-14 md:h-14 p-1.5 bg-white border border-gray-200/80 rounded-xl shadow-xs flex items-center justify-center shrink-0">
              <Image
                src="/images/companies/ualbany-logo.png"
                alt="University at Albany logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">University at Albany, SUNY</h3>
                <span className="text-xs text-gray-500 font-medium shrink-0">Aug 2015 — May 2019</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="text-sm font-semibold text-emerald-600">B.S. Computer Science & Applied Mathematics</p>
                <span className="text-xs text-gray-500 shrink-0">Albany, NY</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Relevant Coursework:</p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Distributed & Parallel Computing (Graduate)",
                "Algorithms & Data Structures",
                "Systems Programming",
                "Object Oriented Programming",
                "Automata & Formal Languages",
                "Linear Algebra",
                "Discrete Probability",
                "Honors Calculus",
                "Combinatorics",
                "Number Theory"
              ].map((course, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-3">
        <div className="relative w-12 h-12 md:w-14 md:h-14 p-1.5 bg-white border border-gray-200/80 rounded-xl shadow-xs flex items-center justify-center shrink-0">
          <Image
            src={experience.logo}
            alt={`${experience.company} logo`}
            fill
            className="object-contain p-1"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">{experience.company}</h3>
            <span className="text-xs text-gray-500 font-medium shrink-0">{experience.period}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm font-semibold text-emerald-600">{experience.role}</p>
            <span className="text-xs text-gray-500 shrink-0">{experience.location}</span>
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-gray-600">
        {experience.description.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      {experience.technologies && (
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap gap-1.5">
          {experience.technologies.map((tech, i) => (
            <span 
              key={i}
              className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200/80"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
