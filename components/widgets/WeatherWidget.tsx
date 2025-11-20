
import React from 'react';
import { CloudRain, MapPin } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  return (
    <div className="w-[250px] bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-2xl p-6 flex flex-col items-center pointer-events-auto hover:bg-white/80 transition-colors cursor-default select-none">
      <div className="flex items-center gap-2 text-gray-800 text-lg font-bold uppercase tracking-wider mb-4">
        <MapPin size={20} />
        <span>Vancouver</span>
      </div>
      
      <div className="flex flex-col items-center">
        <CloudRain size={100} className="text-blue-600 drop-shadow-xl mb-2" />
        <span className="text-7xl font-bold text-gray-900 leading-none">12°</span>
        <span className="text-2xl text-gray-800 font-medium mt-2">Rainy</span>
      </div>
    </div>
  );
};
export default WeatherWidget;
