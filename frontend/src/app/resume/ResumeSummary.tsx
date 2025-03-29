// src/components/resume/ResumeSummary.tsx
import Link from 'next/link';

export const ResumeSummary = () => {
  return (
    <Link href="/resume" className="block h-full">
      <div className="h-full flex flex-col bg-white rounded-lg overflow-hidden">
        {/* Skills section */}
        <div className="shrink-0 pb-3">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Key Skills
          </h3>
          <div className="flex flex-wrap gap-2.5">
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
                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full 
                         border border-emerald-200 hover:bg-emerald-100 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience section - increased spacing between companies */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Experience</h3>
          
          <div className="space-y-5">
            <div className="border-l-2 border-emerald-200 pl-4">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Senior Software Engineer, UI/UX</h4>
                  <p className="text-gray-700">Stickshift AI</p>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap ml-2">
                  Dec 2023 - Oct 2024
                </div>
              </div>
              <ul className="mt-1 text-sm text-gray-600 space-y-1">
                <li>• Added GPT-4 Turbo and Claude 3 Haiku integration</li>
                <li>• Implemented Bing Autosuggest for real-time search</li>
                <li>• Designed & built mobile-friendly React UI</li>
              </ul>
            </div>

            <div className="border-l-2 border-emerald-200 pl-4">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Software Engineer, Platform & Data</h4>
                  <p className="text-gray-700">Goldman Sachs & Co.</p>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap ml-2">
                  Feb 2022 - Apr 2023
                </div>
              </div>
              <ul className="mt-1 text-sm text-gray-600 space-y-1">
                <li>• Developed streamlined data pipeline strategy</li>
                <li>• Created custom internal Python libraries</li>
                <li>• Managed CI/CD pipelines in Gitlab CI</li>
              </ul>
            </div>

            <div className="border-l-2 border-emerald-200 pl-4">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">Associate Software Developer</h4>
                  <p className="text-gray-700">IBM</p>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap ml-2">
                  Aug 2020 - Dec 2021
                </div>
              </div>
              <ul className="mt-1 text-sm text-gray-600 space-y-1">
                <li>• Developed REST services with Java Spring Boot</li>
                <li>• Implemented APIs for GSA Data Scientists</li>
                <li>• Created automated DB configuration scripts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education section */}
        <div className="shrink-0 mt-1 pt-2 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-1.5">Education</h3>
          <div className="border-l-2 border-emerald-200 pl-4">
            <h4 className="font-medium">B.S. Computer Science and Applied Mathematics</h4>
            <p className="text-gray-700">University at Albany, SUNY</p>
            <p className="text-sm text-gray-500">2015 - 2019</p>
          </div>
        </div>
      </div>
    </Link>
  );
};