import React from 'react';
import { workExperience } from '../../data/portfolioData';
import { Briefcase } from 'lucide-react';

const WorkExperience: React.FC = () => {
  return (
    <div className="p-6 bg-white min-h-full font-sans">
      <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-200 pb-4">
        <div className="p-3 bg-blue-100 rounded-full border-2 border-blue-800">
          <Briefcase size={32} className="text-blue-800" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Professional Experience</h1>
          <p className="text-gray-600">Back-end focus full stack software engineer with 2+ years of exerience in the fintech space</p>
        </div>
      </div>

      <div className="space-y-8">
        {workExperience.map((job) => (
          <div key={job.id} className="relative pl-4 sm:pl-8 border-l-4 border-gray-300 hover:border-blue-500 transition-colors">
            {/* Timeline Dot */}
            <div className="absolute -left-[10px] top-1 w-4 h-4 bg-white border-4 border-gray-400 rounded-full"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-blue-900">{job.company}</h2>
                <h3 className="text-lg font-semibold text-gray-700">{job.role}</h3>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 bg-gray-100 border border-gray-300 text-sm font-mono rounded">
                  {job.dates}
                </span>
                <p className="text-sm text-gray-500 mt-1">{job.location}</p>
              </div>
            </div>

            <p className="text-gray-700 italic mb-3">{job.description}</p>

            <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 mb-4 bg-gray-50 p-3 rounded border border-gray-200">
              {job.achievements.map((achievement, idx) => (
                <li key={idx} className="leading-relaxed">{achievement}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs rounded shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
