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
      className="fixed inset-0 z-50 bg-os-desktopBg flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* App header with back button */}
      <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-lg">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-3 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          {icon && <div className="text-os-accent mr-2">{icon}</div>}
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* App content with scrolling */}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </motion.div>
  );
};

export default MobileAppView;
