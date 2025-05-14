
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Moon,
  Bot
} from "lucide-react";
import { motion } from 'framer-motion';

interface TaskbarProps {
  openApp: (appName: string) => void;
  openedApps: string[];
  apps: { name: string; icon: React.ReactNode; displayName: string }[];
}

const Taskbar: React.FC<TaskbarProps> = ({ openApp, openedApps, apps }) => {
  // Get current time for taskbar
  const [currentTime, setCurrentTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  // Filter only the opened apps for the taskbar, but never show Oscar in the regular taskbar
  const openApps = apps.filter(app => openedApps.includes(app.name) && app.name !== 'Oscar');

  return (
    <div className="taskbar">
      <div className="flex-1 flex justify-center items-center">
        <motion.div 
          className="flex space-x-1 bg-black/40 px-4 py-1 rounded-full backdrop-blur-md"
          layout
        >
          {/* Oscar button is ONLY shown here, never in the app list below */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-full"
            onClick={() => openApp('Oscar')}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
          </Button>

          {openApps.length > 0 && (
            <>
              <div className="h-8 border-r border-white/10 mx-1"></div>
              <div className="flex space-x-2">
                {openApps.map(app => (
                  <motion.div
                    key={app.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 relative"
                      onClick={() => openApp(app.name)}
                    >
                      {app.icon}
                      <div className="absolute bottom-0 w-1 h-1 bg-os-accent rounded-full"></div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
      
      <div className="flex items-center space-x-3 mr-2">
        {/* Social links on the right side */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={() => window.open('https://github.com/amaansyed27', '_blank')}
          >
            <Github className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={() => window.open('https://linkedin.com/in/amaansyed27', '_blank')}
          >
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={() => window.open('mailto:amaansyed27@gmail.com', '_blank')}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            <Moon className="h-4 w-4" />
          </Button>
          <div className="bg-black/30 text-white text-sm px-3 py-1 rounded-full ml-1">
            {currentTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
