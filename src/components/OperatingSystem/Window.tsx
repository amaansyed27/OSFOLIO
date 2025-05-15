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
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(defaultPosition.x);
  const y = useMotionValue(defaultPosition.y);

  // Keep windows within viewport bounds - no changes to this functionality
  useEffect(() => {
    const checkBounds = () => {
      if (isMaximized) return;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      if (x.get() < 0) x.set(10);
      if (y.get() < 0) y.set(10);
      if (x.get() > windowWidth - 100) x.set(windowWidth - 100);
      if (y.get() > windowHeight - 100) y.set(windowHeight - 100);
    };
    
    checkBounds();
    window.addEventListener('resize', checkBounds);
    return () => window.removeEventListener('resize', checkBounds);
  }, [x, y, isMaximized]);

  // Refined drag handling with better state management
  const handleDragStart = () => {
    setIsDragging(true);
    bringToFront();
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleDrag = (_: any, info: PanInfo) => {
    if (isMaximized) return;
    
    const newX = x.get() + info.delta.x;
    const newY = y.get() + info.delta.y;
    
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
  
  // Updated window color function with enhanced gradients
  const getWindowColor = () => {
    if (title.includes('PowerShell')) {
      return "bg-gradient-to-r from-os-barcelona-blue to-os-barcelona-red"; 
    } else if (title.includes('System Properties')) {
      return "bg-gradient-to-r from-os-barcelona-blue to-os-mclaren-papaya";
    } else if (title.includes('File Explorer')) {
      return "bg-os-barcelona-blue";
    } else if (title.includes('Edge')) {
      return "bg-os-mclaren-blue";
    } else if (title.includes('Teams')) {
      return "bg-gradient-to-r from-os-mclaren-blue to-os-mclaren-papaya";
    } else if (title.includes('Xbox')) {
      return "bg-gradient-to-r from-green-600 to-os-barcelona-blue";
    } else if (title.includes('Task Manager')) {
      return "bg-gradient-to-r from-os-barcelona-blue to-purple-700";
    } else if (title.includes('Mail')) {
      return "bg-gradient-to-r from-os-mclaren-papaya to-os-barcelona-red";
    } else if (title.includes('Get Help')) {
      return "bg-gradient-to-r from-os-mclaren-blue to-indigo-600";
    } else {
      return "bg-barcelona-gradient";
    }
  };

  return (
    <motion.div
      className={`glass-window absolute overflow-hidden rounded-md shadow-lg border ${isDragging ? 'border-os-mclaren-papaya shadow-os-mclaren-papaya/30' : 'border-white/20'} transition-shadow`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        width: isMaximized ? 'calc(100vw - 10px)' : defaultSize.width, 
        height: isMaximized ? 'calc(100vh - 60px)' : defaultSize.height,
        left: isMaximized ? 5 : undefined,
        top: isMaximized ? 5 : undefined,
        boxShadow: isDragging 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 135, 37, 0.3)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ x, y, zIndex }}
      transition={{ 
        duration: 0.2,
        type: "spring", 
        damping: 20, 
        stiffness: 300
      }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onClick={bringToFront}
      role="dialog"
      aria-labelledby={`window-title-${title.replace(/\s+/g, '-')}`}
      tabIndex={0}
    >
      {/* Title bar with enhanced accessibility */}
      <div 
        className={`${getWindowColor()} text-white h-10 flex items-center justify-between px-3 cursor-move`} 
        onDoubleClick={toggleMaximize}
        id={`window-title-${title.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center space-x-2">
          {icon && (
            <div className="text-white">
              {icon}
            </div>
          )}
          <span className="text-sm font-medium truncate max-w-[300px]">{title}</span>
        </div>
        
        {/* Enhanced window control buttons */}
        <div className="flex items-center space-x-2">
          <button 
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={onMinimize}
            aria-label="Minimize window"
          >
            <Minimize2 className="h-2 w-2 opacity-0 group-hover:opacity-100 text-yellow-900" />
          </button>
          <button 
            className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={toggleMaximize}
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
          >
            <Maximize2 className="h-2 w-2 opacity-0 group-hover:opacity-100 text-green-900" />
          </button>
          <button 
            className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={onClose}
            aria-label="Close window"
          >
            <X className="h-2 w-2 opacity-0 group-hover:opacity-100 text-red-900" />
          </button>
        </div>
      </div>
      
      {/* Window content with smooth scrolling */}
      <div className="h-[calc(100%-40px)] overflow-hidden">
        {children}
      </div>
      
      {/* Window resize indicator - subtle visual hint */}
      {!isMaximized && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center opacity-50 hover:opacity-100">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
            <path d="M0,8 L8,0 L8,8 Z" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default Window;