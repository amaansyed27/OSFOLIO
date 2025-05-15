import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Bot,
  Clock,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface TaskbarProps {
  openApp: (appName: string) => void;
  openedApps: string[];
  apps: { name: string; icon: React.ReactNode; displayName: string }[];
}

const Taskbar: React.FC<TaskbarProps> = ({ openApp, openedApps, apps }) => {
  // Get current time for taskbar with enhanced formatting
  const [currentTime, setCurrentTime] = React.useState<string>('');
  const [currentDate, setCurrentDate] = React.useState<string>('');

  React.useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateString = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTimeAndDate();
    const intervalId = setInterval(updateTimeAndDate, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  // Filter only the opened apps for the taskbar, but never show Oscar in the regular taskbar
  const openApps = apps.filter(app => openedApps.includes(app.name) && app.name !== 'Oscar');

  return (
    <div className="taskbar">
      <div className="flex-1 flex justify-center items-center">
        <motion.div 
          className="flex space-x-1 bg-os-barcelona-blue/50 px-4 py-1 rounded-full backdrop-blur-md border border-white/10"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {/* Animated Oscar button with McLaren orange gradient */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 rounded-full relative"
              onClick={() => openApp('Oscar')}
            >
              <motion.div 
                className="flex items-center justify-center w-8 h-8 bg-mclaren-gradient rounded-full shadow-md"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Bot className="h-5 w-5 text-white" />
              </motion.div>
              
              {/* Subtle pulse animation for Oscar button */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                style={{ backgroundColor: 'rgba(255, 135, 37, 0.3)' }}
              />
            </Button>
          </motion.div>

          {openApps.length > 0 && (
            <>
              <div className="h-8 border-r border-white/10 mx-1"></div>
              <div className="flex space-x-2">
                <AnimatePresence>
                  {openApps.map(app => (
                    <motion.div
                      key={app.name}
                      initial={{ scale: 0.8, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: 10 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      layout
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 relative"
                        onClick={() => openApp(app.name)}
                        aria-label={`Open ${app.name}`}
                      >
                        {app.icon}
                        <div className="absolute bottom-0 w-6 h-1 bg-os-mclaren-papaya rounded-full opacity-80"></div>
                        
                        {/* Add subtle shimmer effect on hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          style={{ opacity: 0.5 }}
                        />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </div>
      
      <div className="flex items-center space-x-3 mr-2">
        {/* Enhanced system tray with date/time and volume */}
        <motion.div 
          className="flex items-center space-x-1 bg-black/20 px-2 py-1 rounded-full"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          transition={{ duration: 0.2 }}
        >
          {/* Social links with improved animation */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-os-barcelona-red/30 h-8 w-8"
            onClick={() => window.open('https://github.com/amaansyed27', '_blank')}
          >
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Github className="h-4 w-4" />
            </motion.div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-os-barcelona-blue/30 h-8 w-8"
            onClick={() => window.open('https://linkedin.com/in/amaansyed27', '_blank')}
          >
            <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
              <Linkedin className="h-4 w-4" />
            </motion.div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-os-mclaren-papaya/30 h-8 w-8"
            onClick={() => window.open('mailto:amaansyed27@gmail.com', '_blank')}
          >
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Mail className="h-4 w-4" />
            </motion.div>
          </Button>
          
          {/* Volume indicator */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 h-8 w-8"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
          
          {/* Enhanced date/time display */}
          <div className="bg-black/30 text-white rounded-full border border-white/10 flex items-center px-3 py-1">
            <Clock className="h-3 w-3 mr-1.5 text-os-mclaren-papaya" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">{currentTime}</span>
              <span className="text-[10px] text-white/70">{currentDate}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Taskbar;
