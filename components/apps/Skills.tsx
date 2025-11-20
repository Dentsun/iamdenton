import React, { useEffect, useState } from 'react';
import { skills } from '../../data/portfolioData';
import * as SiIcons from 'react-icons/si';
import { Cpu } from 'lucide-react';

const Skills: React.FC = () => {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = SiIcons[iconName];
    return Icon ? <Icon size={32} /> : <Cpu size={32} />;
  };

  return (
    <div className="p-6 bg-[#f0f0f0] min-h-full select-text">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-800 border-b-4 border-double border-gray-800 inline-block pb-1">
          Technical Arsenal
        </h1>
      </div>

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {skills.filter(s => s.category === category).map((skill) => (
                <div key={skill.name} className="bg-white p-3 border border-gray-300 shadow-sm flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform hover:shadow-md group">
                  <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
                    {getIcon(skill.icon)}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm text-gray-800">{skill.name}</div>
                    <div className="text-xs text-gray-500">{skill.years}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
