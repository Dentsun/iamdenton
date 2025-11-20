import React from 'react';
import { Rnd } from 'react-rnd';
import { useWindow } from '../../context/WindowContext';
import { X, Minus, Square } from 'lucide-react';

interface WindowFrameProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title,
  children,
  isMinimized,
  isMaximized,
  zIndex,
  defaultSize = { width: 600, height: 400 },
  defaultPosition
}) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useWindow();
  const isActive = activeWindowId === id;

  // Calculate center position if no default provided
  const startX = defaultPosition?.x || (window.innerWidth - defaultSize.width) / 2 + (Math.random() * 40 - 20);
  const startY = defaultPosition?.y || (window.innerHeight - defaultSize.height) / 2 + (Math.random() * 40 - 20);

  if (isMinimized) return null;

  return (
    <Rnd
      default={{
        x: startX,
        y: startY,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={300}
      minHeight={200}
      bounds="window"
      dragHandleClassName="window-title-bar"
      style={{ zIndex }}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      size={isMaximized ? { width: '100%', height: 'calc(100% - 48px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      onDragStart={() => focusWindow(id)}
      onMouseDown={() => focusWindow(id)}
      className="flex flex-col pointer-events-auto"
    >
      <div className={`flex flex-col h-full bg-[#c0c0c0] border-2 retro-border shadow-xl overflow-hidden`}>
        {/* Title Bar */}
        <div
          className={`window-title-bar h-8 flex items-center justify-between px-1 select-none cursor-default ${
            isActive
              ? 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white'
              : 'bg-[#808080] text-[#c0c0c0]'
          }`}
        >
          <div className="flex items-center gap-2 pl-1 pointer-events-none">
            {/* Generic icon if none specific, can be enhanced */}
            <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
            <span className="font-bold text-sm tracking-wide truncate max-w-[200px] sm:max-w-md">{title}</span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
              className="w-5 h-5 bg-[#c0c0c0] retro-border flex items-center justify-center active:retro-border-inset"
              aria-label="Minimize"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Minus size={10} color="black" strokeWidth={4} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
              className="w-5 h-5 bg-[#c0c0c0] retro-border flex items-center justify-center active:retro-border-inset"
              aria-label="Maximize"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Square size={10} color="black" strokeWidth={3} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
              className="w-5 h-5 bg-[#c0c0c0] retro-border flex items-center justify-center active:retro-border-inset ml-1"
              aria-label="Close"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <X size={12} color="black" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-auto p-1 relative bg-[#c0c0c0]">
           {/* White content area inset - Added text-gray-900 to ensure text is visible */}
           <div className="h-full w-full bg-white text-gray-900 border-2 border-t-gray-800 border-l-gray-800 border-r-white border-b-white overflow-auto custom-scrollbar">
             {children}
           </div>
        </div>
      </div>
    </Rnd>
  );
};

export default WindowFrame;