import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootScreen from '@/components/OperatingSystem/BootScreen';
import Taskbar from '@/components/OperatingSystem/Taskbar';
import Window from '@/components/OperatingSystem/Window';
import DesktopIcon from '@/components/OperatingSystem/DesktopIcon';
import MobileAppView from '@/components/OperatingSystem/MobileAppView';
import SEO from '@/components/SEO/SEO';
import { 
  ChevronRight, 
  Grip, 
  Github, 
  Linkedin, 
  RefreshCcw, 
  Settings, 
  Info, 
  FolderOpen, 
  Monitor, 
  User, 
  Link as LinkIcon, 
  Bot,
  FileText,
  Award,
  Mail,
  MessageSquare,
  Book,
  Database,
  MapPin,
  Trophy
} from 'lucide-react';

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
import MobileCardStack from '@/components/OperatingSystem/MobileCardStack';

// Custom icon components for Windows-style icons
const IconImage = ({ iconName }: { iconName: string }) => (
  <img 
    src={`/assets/app_icons/${iconName}.ico`} 
    alt={iconName} 
    className="h-5 w-5" 
    style={{ imageRendering: 'auto' }}
  />
);

// Improved context menu component with fixed hover states
const ContextMenu = ({ x, y, onClose, options }: {
  x: number;
  y: number;
  onClose: () => void;
  options: { label: string; icon: React.ReactNode; onClick: () => void }[];
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      className="fixed bg-os-barcelona-blue/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10 z-50 overflow-hidden"
      style={{ left: x, top: y, width: 220 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.1 }}
    >
      <div className="py-1">
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex items-center px-4 py-2 cursor-pointer transition-colors duration-150 ${
                hoveredIndex === index ? 'bg-white/10' : ''
              }`}
              onClick={() => {
                option.onClick();
                onClose();
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="w-5 h-5 mr-3 flex items-center justify-center text-white/80">
                {option.icon}
              </span>
              <span className="text-sm text-white">{option.label}</span>
            </div>
            {index < options.length - 1 && index % 3 === 2 && (
              <div className="border-b border-white/10 my-1" />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

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
  
  // SEO optimization
  const keywords = 'amaan, amaan syed, syed amaan, amaansyed27, portfolio, software engineer, developer, react, frontend, web development, interactive portfolio';
  
  // Desktop layout state
  const [desktopLayout, setDesktopLayout] = useState({
    columns: 2,
    maxIconsPerColumn: 5,
  });

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
  }>({
    show: false,
    x: 0,
    y: 0
  });
  
  // Parallax effect state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Define all window states
  const [windows, setWindows] = useState<WindowState[]>(createInitialWindows());

  // Setup browser history handling for back button - now unconditional!
  useEffect(() => {
    // Only run the effect when on mobile
    if (!isMobile) return;
    
    // Only add history entry if we're viewing an app
    if (activeMobileApp) {
      window.history.pushState({ app: activeMobileApp }, "", `#${activeMobileApp.toLowerCase()}`);
    }
    
    // Handle back button press
    const handlePopState = (event: PopStateEvent) => {
      if (!event.state || !event.state.app) {
        setActiveMobileApp(null);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeMobileApp, isMobile]);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  // Calculate desktop layout
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

  // Handle desktop parallax effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        setMousePosition({ x, y });
      }, 50); // Debounce time
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Define all application methods
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

  // Handle desktop right click
  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY
    });
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

  // Context menu options
  const contextMenuOptions = [
    { 
      label: "View", 
      icon: <Monitor size={16} />,
      onClick: () => console.log("View clicked")
    },
    { 
      label: "Sort By", 
      icon: <FolderOpen size={16} />,
      onClick: () => console.log("Sort clicked") 
    },
    { 
      label: "Refresh", 
      icon: <RefreshCcw size={16} />,
      onClick: () => window.location.reload() 
    },
    { 
      label: "Settings", 
      icon: <Settings size={16} />,
      onClick: () => openApp("About") 
    },
    { 
      label: "Portfolio Info", 
      icon: <Info size={16} />,
      onClick: () => openApp("Oscar") 
    },
  ];

  // Card colors for mobile view
  const cardColors = {
    'About': '#0078d4',
    'Experience': '#0E639C',
    'Education': '#10A4FB',
    'Skills': '#9B59B6',
    'Projects': '#3498DB',
    'Achievements': '#F39C12',
    'Contact': '#E74C3C',
    'Chat': '#2ECC71',
    'Oscar': '#8E44AD',
  };

  // Create mobile app cards - moved outside conditional rendering to avoid hook order issues
  const createMobileAppCards = () => {
    if (!isMobile) return [];
    
    // Find the active app if one is selected
    const activeApp = activeMobileApp 
      ? windows.find(window => window.name === activeMobileApp) 
      : undefined;
    
    // Prepare cards for mobile stack view with richer content
    return windows.map(window => ({
      id: window.name,
      title: window.name,
      icon: window.icon,
      color: cardColors[window.name] || '#0078d4',
      content: (
        <div>
          {/* ...existing card content... */}
          {window.name === 'About' && (
            <div className="space-y-4">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 text-os-mclaren-papaya mr-2" />
                  <h3 className="font-medium text-sm">Personal Profile</h3>
                </div>
                <p className="text-sm text-white/80">
                  Hi, I'm Amaan, a tech geek and Native Android Developer based in Pune. 
                  I'm passionate about user-centric design and enhancing digital experiences.
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-black/20 p-2 rounded-full">
                    <MapPin className="h-4 w-4 text-os-mclaren-papaya" />
                  </div>
                  <span className="text-sm">Pune, India</span>
                </div>
                <div className="bg-black/20 rounded-full px-3 py-1">
                  <span className="text-xs text-white/80">Tech Geek</span>
                </div>
              </div>
              
              <p className="text-sm italic text-white/60 text-center border-l-4 border-os-mclaren-papaya pl-3 py-1">
                "Racing through code, one pixel at a time"
              </p>
            </div>
          )}
          
          {window.name === 'Experience' && (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">Android Developer Intern</h3>
                  <span className="bg-os-mclaren-papaya/30 text-xs px-2 py-0.5 rounded">Current</span>
                </div>
                <div className="text-xs text-white/80 mb-1">Android Club, VIT Bhopal</div>
                <p className="text-xs text-white/70">
                  Developing user-friendly interfaces and integrating third-party APIs to enhance app capabilities.
                </p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">Figma Wireframe Designer</h3>
                <div className="text-xs text-white/80 mb-1">makemycards.com</div>
                <p className="text-xs text-white/70">
                  Created wireframes and UI designs for a Mumbai-based startup revolutionizing wedding invitations.
                </p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-1">Team Experience</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-black/30 rounded px-2 py-1">Event Management</span>
                  <span className="text-xs bg-black/30 rounded px-2 py-1">Team GarVIT</span>
                </div>
              </div>
            </div>
          )}
          
          {window.name === 'Education' && (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Book className="h-4 w-4 text-os-mclaren-papaya mr-2" />
                  <h3 className="font-medium text-sm">Bachelor of Computer Science</h3>
                </div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-white/80">Vellore Institute of Technology</span>
                  <span className="text-white/60">2023 - 2028</span>
                </div>
                <p className="text-xs text-white/70">
                  Currently pursuing my Bachelor's degree, focusing on Computer Science.
                </p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Book className="h-4 w-4 text-os-mclaren-papaya mr-2" />
                  <h3 className="font-medium text-sm">High School Diploma (Science)</h3>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/80">The Bishop's School, Pune</span>
                  <span className="text-white/60">2011 - 2023</span>
                </div>
              </div>
            </div>
          )}
          
          {window.name === 'Skills' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium mb-2">Technical Skills</h3>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>Android Development</span>
                      <span>90%</span>
                    </div>
                    <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[90%] rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>Kotlin</span>
                      <span>85%</span>
                    </div>
                    <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>UI/UX Design</span>
                      <span>80%</span>
                    </div>
                    <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[80%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <h3 className="text-sm font-medium mb-2">Other Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-black/30 text-xs rounded px-2 py-1">Figma</span>
                  <span className="bg-black/30 text-xs rounded px-2 py-1">Wireframing</span>
                  <span className="bg-black/30 text-xs rounded px-2 py-1">API Integration</span>
                  <span className="bg-black/30 text-xs rounded px-2 py-1">Prototyping</span>
                  <span className="bg-black/30 text-xs rounded px-2 py-1">User Research</span>
                </div>
              </div>
            </div>
          )}
          
          {window.name === 'Projects' && (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-1">Dataweave</h3>
                <div className="flex gap-2 mb-2">
                  <span className="bg-black/30 text-[10px] rounded px-1.5 py-0.5">React</span>
                  <span className="bg-black/30 text-[10px] rounded px-1.5 py-0.5">TypeScript</span>
                  <span className="bg-black/30 text-[10px] rounded px-1.5 py-0.5">Vite</span>
                </div>
                <p className="text-xs text-white/70">
                  A visual tool for designing and managing relational database schemas with drag-and-drop interface.
                </p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-1">Hola</h3>
                <div className="flex gap-2 mb-2">
                  <span className="bg-black/30 text-[10px] rounded px-1.5 py-0.5">Android</span>
                  <span className="bg-black/30 text-[10px] rounded px-1.5 py-0.5">Compose</span>
                  <span className="bg-black/30 text-[10px] rounded px-1.5 py-0.5">Gemini API</span>
                </div>
                <p className="text-xs text-white/70">
                  AI-powered voice chatbot app with speech recognition and advanced language capabilities.
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 bg-black/20 p-3 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">Sentinel</h3>
                  <p className="text-xs text-white/70">Personal safety companion app</p>
                </div>
                <div className="flex-1 bg-black/20 p-3 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">Joto</h3>
                  <p className="text-xs text-white/70">Minimal note taking app</p>
                </div>
              </div>
            </div>
          )}
          
          {window.name === 'Achievements' && (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  <h3 className="font-medium text-sm">Android Club Winter of Code</h3>
                </div>
                <p className="text-xs text-white/80">
                  Secured 1st place with a 31-day streak and 2,705 points, leading by a 1,300-point margin.
                </p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Award className="h-4 w-4 text-blue-400 mr-2" />
                  <h3 className="font-medium text-sm">University Health Hackathon</h3>
                </div>
                <p className="text-xs text-white/80">
                  Developed SOMA, a health-focused app that reached the final round.
                </p>
              </div>
              
              <div className="flex gap-2 mt-2">
                <div className="flex-1 text-center bg-black/20 p-3 rounded-lg">
                  <div className="text-lg font-bold mb-1">30%</div>
                  <div className="text-xs text-white/70">Improved wireframe delivery time</div>
                </div>
                <div className="flex-1 text-center bg-black/20 p-3 rounded-lg">
                  <div className="text-lg font-bold mb-1">95%</div>
                  <div className="text-xs text-white/70">User satisfaction rating</div>
                </div>
              </div>
            </div>
          )}
          
          {window.name === 'Contact' && (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-os-mclaren-papaya mr-3" />
                    <span className="text-sm">amaansyed27@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-os-mclaren-papaya mr-3" />
                    <span className="text-sm">Pune, India</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-3">Connect With Me</h3>
                <div className="flex gap-2">
                  <div className="flex-1 bg-black/30 p-2 rounded-lg flex items-center justify-center gap-2">
                    <Github className="h-4 w-4" />
                    <span className="text-xs">GitHub</span>
                  </div>
                  <div className="flex-1 bg-black/30 p-2 rounded-lg flex items-center justify-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    <span className="text-xs">LinkedIn</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {window.name === 'Chat' && (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <MessageSquare className="h-4 w-4 text-os-mclaren-papaya mr-2" />
                  <h3 className="font-medium text-sm">Interactive Chat</h3>
                </div>
                <p className="text-sm text-white/80">
                  Connect with me through an interactive chat to discuss projects, collaborations, or just say hello!
                </p>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/60">Status</div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm">Available to chat</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {window.name === 'Oscar' && (
            <div className="space-y-3">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Bot className="h-4 w-4 text-purple-400 mr-2" />
                  <h3 className="font-medium text-sm">OSCAR – AI Assistant</h3>
                </div>
                <p className="text-sm text-white/80">
                  Your personal portfolio guide. Ask me anything about Amaan's skills, projects, or background!
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-3">
                <p className="text-xs text-white/80">
                  <span className="font-bold">OSCAR</span> is also an upcoming project - a second-brain operating system inspired by JARVIS, built with Python, local LLMs, and a neural voice model.
                </p>
              </div>
            </div>
          )}
        </div>
      )
    }));
  };
  
  const appCards = createMobileAppCards();

  // Define all the available applications with Windows-style icon names
  function createInitialWindows(): WindowState[] {
    return [
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
  }

  // Rendering logic with proper conditionals that don't affect hook order
  if (isMobile) {
    // Find the active app if one is selected
    const activeApp = activeMobileApp 
      ? windows.find(window => window.name === activeMobileApp) 
      : undefined;
      
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
        <AnimatePresence>
          {isBooting && <BootScreen onBootComplete={handleBootComplete} />}
        </AnimatePresence>

        {!isBooting && (
          <>
            {/* Modern mobile app view - render when an app is selected */}
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
            
            {/* Main mobile UI - Fluid Card Stack */}
            {!activeApp && (
              <div className="flex flex-col h-screen">
                {/* Name and profile moved from header to a fixed top bar that doesn't get obscured */}
                <motion.div 
                  className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-b from-[#121212] to-transparent pt-4 pb-8 px-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                      <img src="/assets/notion-face.png" alt="Amaan Syed" className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3">
                      <h1 className="text-base font-semibold">Amaan Syed</h1>
                      <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#272727] text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></span>
                        <span className="text-white/80 text-[10px]">Native Android Developer</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card Stack Implementation with improved UI */}
                <div className="flex-1 relative pt-14">
                  <MobileCardStack 
                    cards={appCards}
                    onCardOpen={(id) => openApp(id)}
                    onOscarOpen={() => openApp('Oscar')}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Desktop view - enhanced with Barcelona/McLaren colors
  return (
    <div 
      className="h-screen w-screen bg-os-desktopBg text-white overflow-hidden"
      onContextMenu={handleDesktopRightClick}
      onClick={() => contextMenu.show && setContextMenu({...contextMenu, show: false})}
    >
      <SEO 
        title="Amaan Syed | Software Engineer & Developer Portfolio"
        description="Amaan Syed - Interactive OS-themed portfolio showcasing software engineering skills, projects, and professional experience"
        keywords={keywords}
      />
      <AnimatePresence>
        {isBooting && <BootScreen onBootComplete={handleBootComplete} />}
      </AnimatePresence>

      {!isBooting && (
        <>
          {/* Enhanced background with Barcelona colors and parallax effect */}
          <motion.div 
            className="fixed inset-0 z-0 bg-barcelona-gradient bg-opacity-30 flex flex-col items-center justify-center"
            style={{ 
              backgroundPosition: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`,
              transition: "background-position 0.1s ease-out"
            }}
          >
            {/* Add subtle particle effect */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{
                    duration: Math.random() * 5 + 10,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              ))}
            </div>

            <motion.div 
              className="text-center p-6 bg-black/20 backdrop-blur-md rounded-lg border border-white/10 shadow-lg max-w-md"
              animate={{ 
                y: mousePosition.y * -15,
                x: mousePosition.x * -15,
                rotateY: mousePosition.x * 5,
                rotateX: mousePosition.y * -5,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-os-mclaren-papaya shadow-lg">
                <img src="/assets/notion-face.png" alt="Amaan Syed" className="w-full h-full object-cover" />
              </div>
              <motion.h1 
                className="text-3xl font-bold text-os-mclaren-papaya mb-2"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(255,135,37,0.3)",
                    "0 0 10px rgba(255,135,37,0.5)",
                    "0 0 5px rgba(255,135,37,0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Amaan Syed | Tech Geek
              </motion.h1>
              <p className="text-white mb-4 text-lg font-medium">"Racing through code, one pixel at a time"</p>
              <p className="text-white/80 text-sm">Use apps and Oscar to learn more about me, or chat with others online</p>
              
              {/* Enhanced Barcelona/McLaren styled buttons */}
              <div className="mt-4 flex justify-center gap-4">
                <motion.a 
                  href="https://github.com/amaansyed27" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-os-barcelona-blue hover:bg-os-barcelona-blue/80 text-white py-2 px-4 rounded-md shadow-md transition-all flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(0, 0, 200, 0.5)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/in/amaansyed27" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-os-mclaren-papaya hover:bg-os-mclaren-papaya/80 text-white py-2 px-4 rounded-md shadow-md transition-all flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(255, 135, 37, 0.5)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Desktop context menu */}
          <AnimatePresence>
            {contextMenu.show && (
              <ContextMenu 
                x={contextMenu.x} 
                y={contextMenu.y} 
                onClose={() => setContextMenu({...contextMenu, show: false})}
                options={contextMenuOptions}
              />
            )}
          </AnimatePresence>
          
          {/* Desktop icons - keeping existing functionality with enhanced animations */}
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
          
          {/* Application windows - enhanced with smooth animations */}
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
          
          {/* Enhanced Taskbar */}
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