import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootScreen from '@/components/OperatingSystem/BootScreen';
import Taskbar from '@/components/OperatingSystem/Taskbar';
import Window from '@/components/OperatingSystem/Window';
import DesktopIcon from '@/components/OperatingSystem/DesktopIcon';
import MobileAppView from '@/components/OperatingSystem/MobileAppView';
import AnimatedBackground from '@/components/OperatingSystem/AnimatedBackground';
import { ChevronRight, Grip } from 'lucide-react';

// Import App Components
import AboutApp from '@/components/Applications/AboutApp';
import ExperienceApp from '@/components/Applications/ExperienceApp';
import EducationApp from '@/components/Applications/EducationApp';
import SkillsApp from '@/components/Applications/SkillsApp';
import ProjectsApp from '@/components/Applications/ProjectsApp';
import AchievementsApp from '@/components/Applications/AchievementsApp';
import ContactApp from '@/components/Applications/ContactApp';
import ChatApp from '@/components/Applications/ChatApp';
import OscarApp from '@/components/Applications/OscarApp';
import { useIsMobile } from '@/hooks/use-mobile';

// Custom icon components for Windows-style icons
const IconImage = ({ iconName }: { iconName: string }) => (
  <img 
    src={`/assets/app_icons/${iconName}.ico`} 
    alt={iconName} 
    className="h-5 w-5" 
    style={{ imageRendering: 'auto' }}
  />
);

interface WindowState {
  name: string;
  displayName: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: React.ReactNode;
  content: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const isMobile = useIsMobile();
  const [activeMobileView, setActiveMobileView] = useState<'apps' | 'info'>('apps');
  const [activeMobileApp, setActiveMobileApp] = useState<string | null>(null);
  
  // New state for managing desktop layout
  const [desktopLayout, setDesktopLayout] = useState({
    columns: 2,
    maxIconsPerColumn: 5,
  });

  // Define all the available applications with Windows-style icon names
  const createInitialWindows = (): WindowState[] => [
    {
      name: 'About',
      displayName: 'System Properties - Amaan Syed',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="system"/>,
      content: <AboutApp />,
      defaultPosition: { x: 80, y: 50 },
      defaultSize: { width: 800, height: 600 }, // Larger for VS Code styling
    },
    {
      name: 'Experience',
      displayName: 'Career Timeline', // Updated name to match the new view
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="people" />, // Using people.ico
      content: <ExperienceApp />,
      defaultPosition: { x: 150, y: 70 },
      defaultSize: { width: 750, height: 550 },
    },
    {
      name: 'Education',
      displayName: 'Microsoft Edge',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="internet_exp" />,
      content: <EducationApp />,
      defaultPosition: { x: 200, y: 90 },
      defaultSize: { width: 700, height: 500 },
    },
    {
      name: 'Skills',
      displayName: 'Task Manager',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="taskmanager" />,
      content: <SkillsApp />,
      defaultPosition: { x: 250, y: 110 },
      defaultSize: { width: 800, height: 600 },
    },
    {
      name: 'Projects',
      displayName: 'File Explorer',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="explorer" />,
      content: <ProjectsApp />,
      defaultPosition: { x: 300, y: 130 },
      defaultSize: { width: 850, height: 650 },
    },
    {
      name: 'Achievements',
      displayName: 'Xbox Game Bar',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="xbox-ach" />,
      content: <AchievementsApp />,
      defaultPosition: { x: 350, y: 150 },
      defaultSize: { width: 750, height: 500 },
    },
    {
      name: 'Contact',
      displayName: 'Mail',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="mail" />,
      content: <ContactApp />,
      defaultPosition: { x: 400, y: 170 },
      defaultSize: { width: 800, height: 550 },
    },
    {
      name: 'Chat',
      displayName: 'Microsoft Teams',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="teams" />,
      content: <ChatApp />,
      defaultPosition: { x: 450, y: 190 },
      defaultSize: { width: 800, height: 600 },
    },
    {
      name: 'Oscar',
      displayName: 'Get Help',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      icon: <IconImage iconName="get_help" />,
      content: <OscarApp />,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 750, height: 550 },
    },
  ];

  const [windows, setWindows] = useState<WindowState[]>(createInitialWindows());

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  // Calculate the appropriate desktop layout based on screen dimensions
  useEffect(() => {
    const calculateLayout = () => {
      const taskbarHeight = 56; // Height of the taskbar in pixels
      const iconHeight = 80; // Height of each icon in pixels
      const verticalSpacing = 10; // Spacing between icons
      const availableHeight = window.innerHeight - taskbarHeight;
      
      // Calculate max icons per column based on available height
      const maxPerColumn = Math.floor(availableHeight / (iconHeight + verticalSpacing));
      
      // Determine number of columns based on icon count and max per column
      const totalIcons = windows.length;
      const columnsNeeded = Math.ceil(totalIcons / Math.max(1, maxPerColumn));
      
      setDesktopLayout({
        columns: Math.max(1, Math.min(columnsNeeded, 3)), // Cap at 3 columns max
        maxIconsPerColumn: Math.max(3, maxPerColumn), // Ensure at least 3 icons can fit
      });
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    
    return () => {
      window.removeEventListener('resize', calculateLayout);
    };
  }, [windows.length]);

  const openApp = (appName: string) => {
    // For mobile view, just set the active app
    if (isMobile) {
      setActiveMobileApp(appName);
      return;
    }
    
    // Desktop window handling
    setWindows(prevWindows => 
      prevWindows.map(window => {
        if (window.name === appName) {
          // If the window is minimized, restore it
          if (window.isMinimized) {
            const newZIndex = maxZIndex + 1;
            setMaxZIndex(newZIndex);
            return { ...window, isOpen: true, isMinimized: false, zIndex: newZIndex };
          }
          // If the window is closed, open it
          else if (!window.isOpen) {
            const newZIndex = maxZIndex + 1;
            setMaxZIndex(newZIndex);
            return { ...window, isOpen: true, zIndex: newZIndex };
          }
          // If the window is already open, bring it to front
          else {
            const newZIndex = maxZIndex + 1;
            setMaxZIndex(newZIndex);
            return { ...window, zIndex: newZIndex };
          }
        }
        return window;
      })
    );
  };

  const closeApp = (appName: string) => {
    // For mobile view, clear the active app
    if (isMobile) {
      setActiveMobileApp(null);
      return;
    }
    
    // Desktop window handling
    setWindows(prevWindows => 
      prevWindows.map(window => 
        window.name === appName ? { ...window, isOpen: false, isMinimized: false } : window
      )
    );
  };

  const minimizeApp = (appName: string) => {
    setWindows(prevWindows => 
      prevWindows.map(window => 
        window.name === appName ? { ...window, isMinimized: true } : window
      )
    );
  };

  const bringToFront = (appName: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    setWindows(prevWindows => 
      prevWindows.map(window => 
        window.name === appName ? { ...window, zIndex: newZIndex } : window
      )
    );
  };

  // Get a list of currently opened apps for the taskbar
  const openedApps = windows.filter(window => window.isOpen).map(window => window.name);

  // Desktop icons configuration - same as the windows
  const desktopIcons = windows.map(window => ({
    name: window.name,
    icon: window.icon,
  }));

  // Create a structure for the desktop icons layout
  const createDesktopIconGrid = () => {
    const { columns, maxIconsPerColumn } = desktopLayout;
    const grid = Array.from({ length: columns }, () => []);
    
    // Distribute icons across columns
    desktopIcons.forEach((icon, index) => {
      const columnIndex = Math.floor(index / maxIconsPerColumn);
      const safeColumnIndex = Math.min(columnIndex, columns - 1);
      grid[safeColumnIndex].push(icon);
    });
    
    return grid;
  };

  const desktopIconGrid = createDesktopIconGrid();

  // Handle mobile view - improved modern mobile UI
  if (isMobile) {
    // Find the active app if one is selected
    const activeApp = activeMobileApp 
      ? windows.find(window => window.name === activeMobileApp) 
      : undefined;
    
    return (
      <div className="min-h-screen bg-os-desktopBg text-white">
        <AnimatePresence>
          {isBooting && <BootScreen onBootComplete={handleBootComplete} />}
        </AnimatePresence>

        {!isBooting && (
          <>
            {/* Mobile app view - render when an app is selected */}
            <AnimatePresence>
              {activeApp && (
                <MobileAppView
                  title={activeApp.name}
                  icon={activeApp.icon}
                  onClose={() => closeApp(activeApp.name)}
                >
                  {activeApp.content}
                </MobileAppView>
              )}
            </AnimatePresence>
            
            {/* Main mobile UI - only visible when no app is active */}
            {!activeApp && (
              <div className="flex flex-col h-screen">
                {/* Header area with subtitle */}
                <div className="text-center pt-8 pb-4 px-4 bg-black/30 backdrop-blur-sm">
                  <h1 className="text-3xl font-bold mb-1">AMAAN SYED</h1>
                  <p className="text-os-accent text-sm">Tech Geek — Native Android Developer</p>
                </div>

                {/* Main content area */}
                <div className="flex-grow overflow-y-auto p-4">
                  {activeMobileView === 'apps' ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-3 gap-4"
                    >
                      {windows.map((app, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/20 hover:bg-white/10 active:bg-white/20 transition-colors"
                          onClick={() => openApp(app.name)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-os-accent mb-2 flex items-center justify-center w-12 h-12 bg-black/30 rounded-xl">
                            {app.icon}
                          </div>
                          <span className="text-xs text-center">{app.name}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4"
                    >
                      <h2 className="text-xl font-bold mb-4">About This Portfolio</h2>
                      <p className="mb-3 text-white/80">
                        Welcome to my interactive portfolio website built to mimic an operating system interface.
                      </p>
                      <div className="p-3 rounded-lg bg-black/20 mb-4">
                        <h3 className="font-medium mb-2">How to Navigate</h3>
                        <ul className="text-sm space-y-2 text-white/70">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-os-accent" />
                            <span>Tap on any app icon to open the corresponding section</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-os-accent" />
                            <span>Swipe between pages using the navigation buttons below</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-os-accent" />
                            <span>For the best experience, rotate your device to landscape mode</span>
                          </li>
                        </ul>
                      </div>
                      <p className="text-xs text-white/50 italic">
                        "Racing through code, one pixel at a time"
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Bottom navigation bar - modern mobile style */}
                <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg px-6 py-3 flex justify-around items-center">
                  <button
                    className={`flex flex-col items-center ${activeMobileView === 'apps' ? 'text-os-accent' : 'text-white/60'}`}
                    onClick={() => setActiveMobileView('apps')}
                  >
                    <Grip className="h-5 w-5 mb-0.5" />
                    <span className="text-xs">Apps</span>
                  </button>
                  
                  <button 
                    className="bg-white/10 p-3 rounded-full -mt-5 border-4 border-black/80"
                    onClick={() => openApp('Oscar')}
                  >
                    <IconImage iconName="get_help" />
                  </button>
                  
                  <button
                    className={`flex flex-col items-center ${activeMobileView === 'info' ? 'text-os-accent' : 'text-white/60'}`}
                    onClick={() => setActiveMobileView('info')}
                  >
                    <IconImage iconName="info" />
                    <span className="text-xs">Guide</span>
                  </button>
                </div>
                
                {/* User guide hint - faded out */}
                <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none">
                  <div className="text-white/30 text-xs bg-black/20 px-3 py-1 rounded-full">
                    Click on the icons to explore!, or use guide
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Desktop view - full OS experience
  return (
    <div className="h-screen w-screen bg-os-desktopBg text-white overflow-hidden">
      <AnimatePresence>
        {isBooting && <BootScreen onBootComplete={handleBootComplete} />}
      </AnimatePresence>

      {!isBooting && (
        <>
          {/* Animated background with ASCII art and text */}
          <AnimatedBackground />
          
          {/* Desktop icons - Dynamic grid layout with reduced horizontal padding */}
          <div className="fixed left-2 top-2 flex gap-x-4 z-10">
            {desktopIconGrid.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-y-2">
                {column.map((icon, iconIndex) => (
                  <DesktopIcon
                    key={`${colIndex}-${iconIndex}`}
                    name={icon.name}
                    icon={icon.icon}
                    onClick={() => openApp(icon.name)}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Application windows */}
          <AnimatePresence>
            {windows.map((window) => (
              window.isOpen && !window.isMinimized && (
                <Window
                  key={window.name}
                  title={window.displayName || window.name}
                  isOpen={window.isOpen && !window.isMinimized}
                  onClose={() => closeApp(window.name)}
                  onMinimize={() => minimizeApp(window.name)}
                  zIndex={window.zIndex}
                  defaultPosition={window.defaultPosition}
                  defaultSize={window.defaultSize}
                  icon={window.icon}
                  bringToFront={() => bringToFront(window.name)}
                >
                  {window.content}
                </Window>
              )
            ))}
          </AnimatePresence>
          
          {/* Taskbar */}
          <Taskbar 
            openApp={openApp} 
            openedApps={openedApps} 
            apps={windows}
          />
        </>
      )}
    </div>
  );
};

export default Index;