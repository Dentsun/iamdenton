import React, { useState, useEffect, useRef } from 'react';
import { useWindow } from '../../context/WindowContext';
import { User, LogOut, Mail, MapPin } from 'lucide-react';

interface TaskbarProps {
  onLogout: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onLogout }) => {
  const { windows, activeWindowId, focusWindow, minimizeWindow } = useWindow();
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };

    if (isStartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStartOpen]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleWindowClick = (id: string) => {
    if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-1 fixed bottom-0 left-0 right-0 z-50 select-none">
      
      {/* Start Menu Popup */}
      {isStartOpen && (
        <div 
          ref={startMenuRef}
          className="absolute bottom-10 left-0 w-64 bg-white border-2 border-blue-800 shadow-2xl rounded-t-lg overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-2 fade-in duration-200"
        >
          {/* Start Menu Header */}
          <div className="bg-blue-600 p-3 flex items-center gap-3 border-b-2 border-orange-400 shadow-sm">
             <div className="bg-white rounded-full p-1 border-2 border-white shadow-sm">
                <User className="text-blue-600" size={32} />
             </div>
             <span className="text-white font-bold text-lg tracking-wide shadow-black drop-shadow-sm">Denton Sun</span>
          </div>
          
          {/* Start Menu Body */}
          <div className="flex flex-col p-2 bg-white h-full border-l-4 border-blue-200">
             <div className="py-2 px-2 text-gray-700 font-bold text-sm border-b border-gray-200 mb-2">
                Software Engineer
             </div>
             
             <div className="space-y-1">
               <div className="flex items-center gap-2 px-2 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded transition-colors group">
                 <MapPin size={16} className="text-gray-500 group-hover:text-white" />
                 <span className="text-sm text-gray-800 group-hover:text-white">Vancouver, BC</span>
               </div>
               
               <a href="mailto:dentonjdsun@gmail.com" className="flex items-center gap-2 px-2 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded transition-colors group decoration-0">
                 <Mail size={16} className="text-gray-500 group-hover:text-white" />
                 <span className="text-sm text-gray-800 group-hover:text-white">Contact Me</span>
               </a>
             </div>

             <div className="mt-auto border-t border-gray-200 pt-2 flex justify-end">
                <div 
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-1 hover:bg-red-500 hover:text-white cursor-pointer rounded text-gray-600 transition-colors text-xs font-bold uppercase tracking-wider"
                >
                   <LogOut size={12} />
                   <span>Log Off</span>
                </div>
             </div>
          </div>
        </div>
      )}

      <div className="flex items-center h-full gap-1 flex-1 overflow-hidden">
        {/* Start Button */}
        <button 
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={`h-8 px-2 flex items-center gap-1 bg-[#c0c0c0] retro-border font-bold mr-2 hover:bg-white/20 transition-colors text-black
            ${isStartOpen ? 'retro-border-inset bg-[#d0d0d0]' : 'active:retro-border-inset'}
          `}
        >
           <span className="italic font-serif text-xl px-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-transparent bg-clip-text select-none">❖</span>
           <span className="text-black">Start</span>
        </button>

        {/* Divider */}
        <div className="w-[2px] h-6 bg-gray-400 mx-1 border-r border-white"></div>

        {/* Open Windows */}
        <div className="flex gap-1 overflow-x-auto h-full items-center w-full scrollbar-hide">
          {windows.map((win) => (
            <button
              key={win.id}
              onClick={() => handleWindowClick(win.id)}
              className={`h-7 px-2 min-w-[120px] max-w-[160px] flex items-center gap-2 truncate text-sm transition-colors
                ${activeWindowId === win.id && !win.isMinimized 
                  ? 'retro-border-inset bg-[#e0e0e0] font-bold' 
                  : 'retro-border bg-[#c0c0c0] hover:bg-[#d0d0d0]'
                }`}
            >
              <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></div>
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="h-8 px-3 retro-border-inset bg-[#c0c0c0] flex items-center gap-2 ml-2 text-xs font-sans text-black">
        <span className="hidden sm:inline">🔊</span>
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default Taskbar;