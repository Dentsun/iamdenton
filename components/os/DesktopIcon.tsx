import React from 'react';

interface DesktopIconProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onClick }) => {
  return (
    <div
      className="flex flex-col items-center w-36 gap-2 p-2 cursor-pointer hover:bg-white/20 border border-transparent hover:border-white/30 rounded-lg group transition-colors"
      onDoubleClick={onClick}
      onClick={(e) => {
          // Simulate single click selection styling if needed, mainly standard is double click
          e.stopPropagation();
      }}
    >
      <div className="drop-shadow-xl filter transition-transform group-hover:scale-110 duration-200">
        {icon}
      </div>
      <span className="text-white text-sm text-center font-sans px-2 bg-[#008080]/0 group-hover:bg-[#000080]/60 rounded retro-text-shadow leading-tight shadow-black drop-shadow-md">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;