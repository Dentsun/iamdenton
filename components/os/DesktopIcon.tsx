import React, { useState, useRef, useEffect } from 'react';

interface DesktopIconProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  initialPosition?: { x: number; y: number };
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onClick, initialPosition = { x: 0, y: 0 } }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!iconRef.current) return;

      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      // Check if moved more than 5px to differentiate from click
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMoved.current = true;
      }

      const newX = position.x + dx;
      const newY = position.y + dy;

      // Get icon dimensions and screen bounds
      const iconRect = iconRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - iconRect.width;
      const maxY = window.innerHeight - 48 - iconRect.height; // 48px for taskbar

      // Constrain to screen bounds
      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: constrainedX, y: constrainedY });
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    hasMoved.current = false;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If we just finished dragging, don't trigger click
    if (hasMoved.current) {
      hasMoved.current = false;
      return;
    }

    // Handle double click for opening
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      onClick();
    } else {
      clickTimeout.current = setTimeout(() => {
        clickTimeout.current = null;
      }, 300);
    }
  };

  return (
    <div
      ref={iconRef}
      className="flex flex-col items-center w-36 gap-2 p-2 cursor-pointer hover:bg-white/20 border border-transparent hover:border-white/30 rounded-lg group transition-colors absolute"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div className="drop-shadow-xl filter transition-transform group-hover:scale-110 duration-200 pointer-events-none">
        {icon}
      </div>
      <span className="text-white text-sm text-center font-sans px-2 bg-[#008080]/0 group-hover:bg-[#000080]/60 rounded retro-text-shadow leading-tight shadow-black drop-shadow-md pointer-events-none">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;