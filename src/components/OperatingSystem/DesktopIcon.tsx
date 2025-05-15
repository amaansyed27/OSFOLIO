import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon, onClick }) => {
  return (
    <motion.div
      className="desktop-icon w-20 relative group"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 15 } 
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-center text-white mb-2 h-14 relative">
        {React.cloneElement(icon as React.ReactElement, {
          className: "h-16 w-16 relative z-10" // Increased from h-8 w-8 to h-16 w-16
        })}
        
        {/* Add subtle glow effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-white/0 blur-xl group-hover:bg-white/20 z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      {/* Enhanced label with better contrast for readability */}
      <span className="text-white text-sm text-center block px-1 py-0.5 group-hover:bg-black/40 rounded-md backdrop-blur-sm transition-all duration-200 group-hover:shadow-sm shadow-white/10">
        {name}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;