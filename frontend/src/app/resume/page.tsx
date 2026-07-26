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
    role: "Senior Software Engineer",
    period: "Dec 2023 - Dec 2025",
    location: "Austin, TX",
    description: [
      "Architected and launched a full-stack AI platform from the ground up — built with React.js, Node.js, and PostgreSQL — enabling conversational access to multiple LLM providers from a single interface.",
      "Designed a provider-agnostic LLM abstraction layer standardizing request/response handling across OpenAI, Anthropic, and xAI APIs, enabling rapid model swaps with zero front-end changes.",
      "Owned the full model integration lifecycle across two years: GPT-4 → GPT-5, Claude 3 → Claude 4.5, Grok → Grok 4 — maintaining backward compatibility through every upgrade cycle.",
      "Designed and shipped multiple iterations of a fully mobile-responsive UI using React.js and Material-UI, improving usability and engagement across all device types.",
      "Led performance profiling of streaming response handling and token budget management; hardened API error handling and retry logic across all integrations, measurably reducing user-facing failure rates.",
      "Refactored component architecture with shared context providers, reducing initial load time and improving render performance at scale."
    ],
    technologies: ["React.js", "Node.js", "PostgreSQL", "OpenAI", "Anthropic", "xAI", "GPT-5", "Claude 4.5", "Grok 4", "Material-UI"]
  },
  {
    company: "Goldman Sachs & Co.",
    logo: "/images/companies/goldman-sachs-logo.png",
    role: "Platform & Data Engineer",
    period: "Feb 2022 - Apr 2023",
    location: "Dallas, TX",
    description: [
      "Retrofitted proprietary Goldman Sachs Legend financial models into type-safe Pydantic schemas and PostgreSQL models for the Digital Loan Agent (DLA) system — ensuring auditable data integrity across schema definition, in-app state, and at-rest storage.",
      "Packaged and published the DLA data model libraries to a private Goldman Sachs PyPI registry via GitLab CI, implementing automated PEP 440 semantic versioning — enabling consistent, versioned consumption across all dependent services.",
      "Built the entire CI/CD infrastructure from scratch using GitLab CI YAML, Docker, and Makefiles — covering automated testing, packaging, and multi-service deployment across Orchestration, Payments, and Demo environments.",
      "Designed and delivered REST APIs enabling the DLA system to query processed data from the pipeline and database, bridging the data layer to downstream consumers and unlocking real-time loan decisioning workflows.",
      "Developed a full-stack Demo Service (React frontend, Node.js/Python backend) to safely validate new DLA features in isolation, reducing production risk during the system's early high-instability phase.",
      "Integrated GitLab + Jira into the CI/CD pipeline to auto-track, update, and close tickets from commit events — eliminating manual project management overhead for the engineering team."
    ],
    technologies: ["Python", "Pydantic", "PostgreSQL", "PyPI", "GitLab CI", "Docker", "Makefiles", "REST APIs", "React", "Node.js", "Jira"]
  },
  {
    company: "IBM",
    logo: "/images/companies/ibm-logo.png",
    role: "Associate Software Developer",
    period: "Aug 2020 - Dec 2021",
    location: "Washington, D.C.",
    description: [
      "Developed multiple REST APIs and microservices using Java, Spring Boot, PostgreSQL, and AWS for federal clients including the GSA and FDA.",
      "Designed iterative database schemas and built a data access API for Data Scientists on the GSA project, accelerating their analytical workflows.",
      "Authored Python automation scripts for database configuration, data ingestion, and teardown — eliminating hours of manual DevOps work per sprint.",
      "Conducted peer code reviews for Data Scientist contributors, improving code quality and enforcing API standards across a cross-functional team."
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Python", "REST APIs", "Microservices"]
  },
  {
    company: "Data Mining and Management Lab, UAlbany",
    logo: "/images/companies/ualbany-logo.png",
    role: "Research Assistant",
    period: "Aug 2018 - Feb 2019",
    location: "Albany, NY",
    description: [
      "Analyzed time-evolving networks for anomalous event patterns and dynamic community evolution.",
      "Engineered software to identify and mine dynamic communities in temporal graphs using ROC AUC metrics.",
      "Synthesized mock datasets for analytical model verification and refactored core graph mining routines."
    ],
    technologies: ["Data Mining", "Network Analysis", "ROC AUC", "Data Synthesis", "Graph Theory"]
  }
];

export default function ResumePage() {
  return (
    <div className="w-full max-w-[92%] mx-auto py-4 md:py-6 space-y-6">
      {/* Header Profile Info */}
      <section className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 hover:shadow-xs transition-all duration-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          <div className="flex items-start space-x-4 min-w-0 flex-1">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-xs shrink-0 bg-white p-0.5 mt-0.5">
              <Image
                src="/images/profile.jpg"
                alt="Vadim Castro"
                fill
                sizes="64px"
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Vadim Castro</h1>
              <p className="text-xs sm:text-sm font-semibold text-emerald-600 mt-0.5">
                Software Engineer — Distributed Systems, Cloud & Data Infrastructure
              </p>
              <p className="text-xs sm:text-sm text-gray-600 max-w-3xl lg:max-w-4xl mt-1.5 leading-relaxed">
                Full-stack software engineer with 5+ years of experience engineering high-throughput distributed systems, cloud platform infrastructure, and high-performance applications across enterprise fintech, AI, and federal systems.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <a
              href="tel:914-222-0975"
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900 shadow-2xs"
              title="Call"
              onClick={() => trackInteraction('social_click', 'phone', { location: 'resume' })}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="mailto:vadimcastro1@gmail.com?subject=Hey%20Vadim!"
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900 shadow-2xs"
              title="Send Email"
              onClick={() => trackInteraction('social_click', 'email', { location: 'resume' })}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/vadimcastro"
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900 shadow-2xs"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              onClick={() => trackInteraction('social_click', 'linkedin', { location: 'resume' })}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/vadimcastro"
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-gray-900 shadow-2xs"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              onClick={() => trackInteraction('social_click', 'github', { location: 'resume' })}
            >
              <Github className="w-4 h-4" />
            </a>
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
                sizes="56px"
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
            sizes="56px"
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
