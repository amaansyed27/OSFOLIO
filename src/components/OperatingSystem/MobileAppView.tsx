import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MobileAppViewProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

const MobileAppView: React.FC<MobileAppViewProps> = ({
  title,
  icon,
  children,
  onClose,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#121212] flex flex-col"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8
      }}
    >
      {/* Modern minimal app header */}
      <div className="flex items-center justify-between py-3 px-4 bg-[#1a1a1a] shadow-sm border-b border-white/5">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-3 text-white hover:bg-white/10 rounded-full"
            onClick={onClose}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center">
            {icon && (
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#272727] mr-3">
                {React.cloneElement(icon as React.ReactElement, {
                  className: "h-4 w-4"
                })}
              </div>
            )}
            <h2 className="text-base font-medium text-white">{title}</h2>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* App content with improved scrolling and animations */}
      <div className="flex-1 overflow-y-auto overscroll-none">
        <motion.div
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.1, 
            duration: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Bottom pill indicator with animation */}
      <motion.div 
        className="pb-2 pt-1 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="w-10 h-1 bg-white/20 rounded-full"
          animate={{ 
            width: [30, 40, 30],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MobileAppView;
