// src/app/resume/page.tsx
"use client";
import Image from 'next/image';

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
    period: "Dec 2023 - Current",
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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Vadim Castro"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Vadim R. Castro</h1>
        <p className="text-lg text-gray-600">Software Engineer — Platform & Data</p>
        <div className="flex justify-center space-x-6 text-sm text-emerald-600">
          <a href="mailto:vadimcastro1@gmail.com" className="hover:text-emerald-700 transition-colors duration-200">
            vadimcastro1@gmail.com
          </a>
          <a href="tel:516-509-0993" className="hover:text-emerald-700 transition-colors duration-200">
            516-509-0993
          </a>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-200 pb-2">Professional Experience</h2>
        {experiences.map((exp) => (
          <ExperienceCard key={exp.company} experience={exp} />
        ))}
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src="/images/companies/ualbany-logo.png"
              alt="University at Albany logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">University at Albany, SUNY</h3>
            <p className="text-emerald-600">B.S. Computer Science and Applied Mathematics</p>
            <p className="text-gray-600">August 2015 — May 2019</p>
            <p className="text-gray-600">Albany, NY</p>
            <div className="mt-4">
              <p className="font-medium">Relevant Coursework:</p>
              <p className="text-gray-600 mt-1">
                Distributed and Parallel Computing (Graduate), Number Theory, Systems Programming,
                Automata & Formal Languages, Algorithms & Data Structures, Discrete Probability, 
                Introduction to Combinatorics, Honors Calculus of Several Variables, Object Oriented 
                Programming, Linear Algebra
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={experience.logo}
            alt={`${experience.company} logo`}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{experience.company}</h3>
              <p className="text-emerald-600 font-medium">{experience.role}</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>{experience.period}</p>
              <p>{experience.location}</p>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5">
            {experience.description.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 text-emerald-500">•</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          {experience.technologies && (
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full
                           border border-emerald-200 hover:bg-emerald-100 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
