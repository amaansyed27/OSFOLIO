
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [bootStage, setBootStage] = useState(0);
  
  useEffect(() => {
    // Stage 0: Initial boot animation
    const timer1 = setTimeout(() => {
      setBootStage(1);
    }, 2000);
    
    // Stage 1: Display name and tagline
    const timer2 = setTimeout(() => {
      setBootStage(2);
    }, 4000);
    
    // Stage 2: Final boot up stage
    const timer3 = setTimeout(() => {
      onBootComplete();
    }, 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onBootComplete]);

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-boot-gradient text-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {bootStage === 0 && (
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-16 h-16 border-4 border-t-os-accent border-r-os-primary border-b-os-secondary border-l-transparent rounded-full animate-spin mb-8"></div>
          <p className="text-sm text-white/70">System Initializing...</p>
        </motion.div>
      )}
      
      {bootStage === 1 && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-wider mb-2">AMAAN SYED</h1>
          <p className="text-xl text-os-accent">Tech Geek — Native Android Developer</p>
        </motion.div>
      )}
      
      {bootStage === 2 && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg mb-6">Loading Environment...</p>
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-os-accent"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            ></motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BootScreen;
