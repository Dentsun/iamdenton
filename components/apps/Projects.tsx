import React from 'react';
import { projects } from '../../data/portfolioData';
import { FolderGit2, Star } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 font-mono">&lt;Projects /&gt;</h1>
        <p className="text-gray-600 text-sm">Technical implementations and hackathons</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] p-4 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FolderGit2 size={20} className="text-purple-700" />
                <h2 className="font-bold text-lg leading-tight">{project.title}</h2>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4 flex-grow">{project.description}</p>

            <div className="mb-4 bg-yellow-50 p-2 border border-yellow-200 rounded text-xs text-gray-800">
              <strong className="block mb-1 flex items-center gap-1 text-yellow-700">
                <Star size={10} fill="currentColor" /> Highlights:
              </strong>
              <ul className="list-disc list-inside space-y-1">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-3 border-t border-gray-100">
               <div className="flex flex-wrap gap-1">
                 {project.tech.map(t => (
                   <span key={t} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider font-bold border border-gray-300">
                     {t}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
