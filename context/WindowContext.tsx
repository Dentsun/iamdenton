import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WindowState } from '../types';

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, content: ReactNode, icon?: string, size?: {width: number, height: number}) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [windowOrder, setWindowOrder] = useState<string[]>([]); // Tracks z-index order

  const openWindow = (id: string, title: string, content: ReactNode, icon?: string, defaultSize = { width: 600, height: 400 }) => {
    if (windows.find((w) => w.id === id)) {
      // If minimized, restore it
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
      );
      focusWindow(id);
      return;
    }

    const newWindow: WindowState = {
      id,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: windowOrder.length + 1,
      content,
      icon,
      defaultSize
    };

    setWindows((prev) => [...prev, newWindow]);
    setWindowOrder((prev) => [...prev, id]);
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setWindowOrder((prev) => prev.filter((wId) => wId !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    focusWindow(id);
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindowOrder((prev) => {
      const newOrder = prev.filter((wId) => wId !== id);
      newOrder.push(id);
      return newOrder;
    });
    
    // Update z-indexes based on new order
    setWindows(prev => prev.map(w => {
        const wIndex = windowOrder.indexOf(w.id);
        // If it's the focused one, we temporarily treat it as top, 
        // but the order state is the source of truth for next render
        return w; 
    }));
  };

  // Calculate z-index dynamically based on order array
  const getZIndex = (id: string) => {
     return windowOrder.indexOf(id) + 10;
  };

  const windowsWithZIndex = windows.map(w => ({
      ...w,
      zIndex: getZIndex(w.id)
  }));

  return (
    <WindowContext.Provider
      value={{
        windows: windowsWithZIndex,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
};
