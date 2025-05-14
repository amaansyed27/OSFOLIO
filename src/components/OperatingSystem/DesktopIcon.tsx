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
      className="desktop-icon w-20"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-center text-white mb-2 h-14">
        {React.cloneElement(icon as React.ReactElement, {
          className: "h-16 w-16" // Increased from h-8 w-8 to h-16 w-16
        })}
      </div>
      <span className="text-white/90 text-sm text-center block px-1">
        {name}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;