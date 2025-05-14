import React, { useState, useEffect } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';
import { Maximize2, Minimize2, X } from 'lucide-react';

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  zIndex: number;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  icon?: React.ReactNode;
  bringToFront: () => void;
}

const Window: React.FC<WindowProps> = ({
  title,
  isOpen,
  onClose,
  onMinimize,
  zIndex,
  children,
  defaultPosition = { x: 100, y: 50 },
  defaultSize = { width: 800, height: 600 },
  icon,
  bringToFront,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevPosition, setPrevPosition] = useState(defaultPosition);
  const [prevSize, setPrevSize] = useState(defaultSize);

  const x = useMotionValue(defaultPosition.x);
  const y = useMotionValue(defaultPosition.y);

  // Keep windows within viewport bounds
  useEffect(() => {
    const checkBounds = () => {
      if (isMaximized) return;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Ensure window is not positioned outside of viewport
      if (x.get() < 0) x.set(10);
      if (y.get() < 0) y.set(10);
      if (x.get() > windowWidth - 100) x.set(windowWidth - 100);
      if (y.get() > windowHeight - 100) y.set(windowHeight - 100);
    };
    
    checkBounds();
    window.addEventListener('resize', checkBounds);
    return () => window.removeEventListener('resize', checkBounds);
  }, [x, y, isMaximized]);

  const handleDrag = (_: any, info: PanInfo) => {
    if (isMaximized) return;
    
    const newX = x.get() + info.delta.x;
    const newY = y.get() + info.delta.y;
    
    // Constrain within viewport
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if (newX >= 0 && newX <= windowWidth - 100) {
      x.set(newX);
    }
    
    if (newY >= 0 && newY <= windowHeight - 100) {
      y.set(newY);
    }
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      x.set(prevPosition.x);
      y.set(prevPosition.y);
    } else {
      setPrevPosition({ x: x.get(), y: y.get() });
      setPrevSize({ width: defaultSize.width, height: defaultSize.height });
      setIsMaximized(true);
      x.set(0);
      y.set(0);
    }
  };

  if (!isOpen) return null;
  
  // Determine the appropriate background color based on window title
  const getWindowColor = () => {
    if (title.includes('PowerShell')) {
      return "bg-[#5c2d91]"; // Purple for PowerShell
    } else if (title.includes('System Properties')) {
      return "bg-gradient-to-r from-[#005a9e] to-[#0078d4]"; // Blue gradient for System Properties
    } else if (title.includes('File Explorer')) {
      return "bg-[#0078D4]"; // Blue for File Explorer
    } else if (title.includes('Edge')) {
      return "bg-[#0078D4]"; // Blue for Edge/Internet Explorer
    } else {
      return "bg-[#333]"; // Default dark gray
    }
  };

  return (
    <motion.div
      className="glass-window absolute overflow-hidden rounded shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        width: isMaximized ? 'calc(100vw - 10px)' : defaultSize.width, 
        height: isMaximized ? 'calc(100vh - 60px)' : defaultSize.height,
        left: isMaximized ? 5 : undefined,
        top: isMaximized ? 5 : undefined
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ x, y, zIndex }}
      transition={{ duration: 0.2 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={bringToFront}
      onDrag={handleDrag}
      onClick={bringToFront}
    >
      {/* Custom title bar based on app type */}
      <div 
        className={`${getWindowColor()} text-white h-10 flex items-center justify-between px-3`} 
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center space-x-2">
          {icon && <div className="text-white">{icon}</div>}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300"
            onClick={onMinimize}
          />
          <button 
            className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-300"
            onClick={toggleMaximize}
          />
          <button 
            className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-300"
            onClick={onClose}
          />
        </div>
      </div>
      
      {/* Window content - direct children without additional padding/styling */}
      <div className="h-[calc(100%-40px)] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;