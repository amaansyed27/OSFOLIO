import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, ChevronDown, ExternalLink, Code, Terminal, Clock } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  description: string;
  period: string;
  startDate?: Date;
  endDate?: Date;
  expanded?: boolean;
  keywords?: string[];
}

// Parse date from period string (e.g. "03/2025 – Present")
const parseDate = (dateStr: string): Date => {
  if (dateStr === "Present") return new Date();
  const [month, year] = dateStr.split('/');
  return new Date(parseInt(year), parseInt(month) - 1);
};

// Process experience data with parsed dates
const rawExperiences: Experience[] = [
  {
    title: "Android Developer Intern",
    company: "Android Club, VIT Bhopal",
    description: "Developed user-friendly interfaces for seamless app navigation and an enhanced user experience. Assisted in integrating third-party APIs to expand app capabilities. Created custom mobile applications using native technologies.",
    period: "03/2025 – Present",
    keywords: ["android", "mobile", "development", "APIs", "UI/UX"],
    expanded: true
  },
  {
    title: "Figma Wireframe Designer",
    company: "makemycards.com",
    description: "Worked with marketing teams to align branding elements with UI/UX design. Created wireframes, storyboards, user flows, and site maps to communicate design ideas effectively. Presented and defended designs to peers and executive stakeholders. Conducted user research and evaluated feedback to improve user experience. Designed intuitive interfaces for web and mobile applications using Figma.",
    period: "09/2024 – 10/2024",
    keywords: ["figma", "design", "UI/UX", "wireframes", "user research"]
  },
  {
    title: "Event Management Member",
    company: "Null VIT Bhopal Student Chapter",
    description: "Led volunteer teams to execute high-impact events, enhancing brand visibility and attendee satisfaction.",
    period: "03/2024 – 08/2024",
    keywords: ["events", "management", "leadership", "team", "organization"]
  },
  {
    title: "Powertrain Department Member",
    company: "Team GarVIT",
    description: "Worked in a team setting, providing support and guidance. Developed cutting-edge powertrain solutions through cross-functional collaboration. Demonstrated adaptability and a commitment to continuous improvement.",
    period: "11/2023 – 05/2024",
    keywords: ["powertrain", "engineering", "collaboration", "technical", "automotive"]
  },
];

// Process the raw experiences to add parsed dates
const processExperiences = (experiences: Experience[]): Experience[] => {
  return experiences.map(exp => {
    const [startStr, endStr] = exp.period.split(' – ');
    return {
      ...exp,
      startDate: parseDate(startStr),
      endDate: endStr === "Present" ? new Date() : parseDate(endStr),
    };
  });
};

const processedExperiences = processExperiences(rawExperiences);

// Command handling utilities
interface CommandOutput {
  id: string;
  type: 'command' | 'output' | 'error' | 'info';
  content: React.ReactNode;
}

interface CommandHistory {
  command: string;
  output: CommandOutput[];
}

const formatTimespan = (startDate: Date, endDate: Date): string => {
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
};

const ExperienceApp: React.FC = () => {
  // State management
  const [experiences, setExperiences] = useState<Experience[]>(processedExperiences);
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [currentDateTime, setCurrentDateTime] = useState("2025-05-14 18:29:43"); // Fixed format
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const suggestions = ['exp', 'exp recent', 'exp longest', 'sum', 'skills', 'timeline', 'status', 'cls'];
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Initialize with a welcome message
  useEffect(() => {
    const initialOutput: CommandOutput[] = [
      {
        id: 'welcome-1',
        type: 'info',
        content: (
          <div className="text-[#569CD6] mb-2">
            <div>Windows PowerShell</div>
            <div>Copyright (C) Microsoft Corporation. All rights reserved.</div>
          </div>
        )
      },
      {
        id: 'welcome-2',
        type: 'info',
        content: (
          <div className="text-[#DCDCAA] mb-4">
            <div>Amaan Syed's Career Module v1.0</div>
            <div>Type <span className="text-[#4EC9B0]">help</span> to see available commands.</div>
          </div>
        )
      }
    ];
    
    setCommandHistory([{ command: '', output: initialOutput }]);
  }, []);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Scroll to bottom of terminal on new command
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Toggle expanded state for mobile timeline
  const toggleExpand = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].expanded = !updatedExperiences[index].expanded;
    setExperiences(updatedExperiences);
  };

  // Command parser and executor
  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    const commandLower = cmd.toLowerCase().trim();
    let output: CommandOutput[] = [];
    
    // Handle various commands (simplified from previous version)
    if (commandLower === 'help' || commandLower === '?') {
      output = [{
        id: `help-${Date.now()}`,
        type: 'output',
        content: (
          <div className="mb-4">
            <div className="text-[#4EC9B0] font-bold mb-2">Available Commands:</div>
            <table className="w-full text-sm">
              <tbody>
                <tr><td className="py-1 pr-4 text-[#DCDCAA]">exp</td><td>Show all experiences</td></tr>
                <tr><td className="py-1 pr-4 text-[#DCDCAA]">exp recent</td><td>Most recent experience</td></tr>
                <tr><td className="py-1 pr-4 text-[#DCDCAA]">sum</td><td>Career summary</td></tr>
                <tr><td className="py-1 pr-4 text-[#DCDCAA]">skills</td><td>List skills</td></tr>
                <tr><td className="py-1 pr-4 text-[#DCDCAA]">cls</td><td>Clear screen</td></tr>
              </tbody>
            </table>
          </div>
        )
      }];
    }
    else if (commandLower === 'exp') {
      output = experiences.map(exp => ({
        id: `exp-${exp.company}-${Date.now()}`,
        type: 'output',
        content: renderExperienceCard(exp)
      }));
    }
    else if (commandLower === 'cls' || commandLower === 'clear') {
      setCommandHistory([]);
      return;
    }
    else {
      output = [{
        id: `error-${Date.now()}`,
        type: 'error',
        content: (
          <div className="text-red-400 mb-4">
            Command not recognized: '{cmd}'. Type <span className="text-[#4EC9B0]">help</span> for available commands.
          </div>
        )
      }];
    }
    
    // Add command to history
    setCommandHistory(prev => [...prev, { command: cmd, output }]);
    setCurrentCommand('');
    setCommandHistoryIndex(-1);
    setShowSuggestions(false);
  };

  // Render experience card for terminal output
  const renderExperienceCard = (exp: Experience) => (
    <div className="mb-4 bg-[#0C214A] rounded-md p-3 border border-[#1E3465]">
      <div className="text-[#4EC9B0] font-bold">{exp.title}</div>
      <div className="text-[#DCDCAA]">{exp.company}</div>
      <div className="flex items-center text-white/60 text-sm mb-2">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{exp.period}</span>
        <span className="mx-2">•</span>
        <span>{formatTimespan(exp.startDate!, exp.endDate!)}</span>
      </div>
      <div className="text-white/80 text-sm border-l-2 border-[#569CD6] pl-3 mb-2">
        {exp.description}
      </div>
      {exp.keywords && (
        <div className="flex flex-wrap gap-1 mt-2">
          {exp.keywords.map(keyword => (
            <span key={keyword} className="text-xs bg-[#16325a] text-[#4EC9B0] px-2 py-1 rounded">
              {keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  // Handle command input
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(currentCommand);
  };

  // Handle keyboard navigation in command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryIndex < commandHistory.length - 1) {
        const newIndex = commandHistoryIndex + 1;
        setCommandHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex > 0) {
        const newIndex = commandHistoryIndex - 1;
        setCommandHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (commandHistoryIndex === 0) {
        setCommandHistoryIndex(-1);
        setCurrentCommand('');
      }
      setShowSuggestions(false);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setShowSuggestions(!showSuggestions);
    }
  };

  // Render the mobile timeline view
  const renderMobileTimeline = () => (
    <div className="h-full flex flex-col bg-[#012456] overflow-hidden">
      {/* Mobile header */}
      <div className="bg-[#0C214A] p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Terminal className="h-4 w-4 mr-2 text-[#4EC9B0]" />
          <span className="font-medium text-[#4EC9B0]">Career Timeline</span>
        </div>
        <div className="text-xs text-[#DCDCAA]">
          {currentDateTime}
        </div>
      </div>
      
      {/* Mobile timeline content */}
      <div className="flex-1 p-3 overflow-y-auto scrollbar-dark">
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="border-l-4 border-[#0078d4] bg-[#0C214A] rounded-r-lg overflow-hidden"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header (always visible) */}
              <div 
                className="p-3 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[#4EC9B0] font-bold flex items-center">
                      <span className="mr-2">
                        {exp.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                      {exp.title}
                    </h3>
                    <p className="text-[#DCDCAA]">{exp.company}</p>
                  </div>
                  <div className="flex items-center ml-2 text-white/70 whitespace-nowrap">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>
              </div>
              
              {/* Expandable content */}
              <AnimatePresence>
                {exp.expanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-[#1E3465]"
                  >
                    <div className="p-3">
                      <div className="text-white/80 mb-2 text-sm">
                        {exp.description}
                      </div>
                      
                      {exp.keywords && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.keywords.map(keyword => (
                            <span key={keyword} className="text-xs bg-[#16325a] text-[#4EC9B0] px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render the desktop PowerShell terminal view
  const renderDesktopTerminal = () => (
    <div className="h-full flex flex-col bg-[#012456] font-mono overflow-hidden">
      {/* Terminal output area */}
      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto scrollbar-dark">
        {/* Command history */}
        {commandHistory.map((entry, historyIndex) => (
          <div key={`history-${historyIndex}`} className="mb-4">
            {/* Only show command prompt if there was a command */}
            {entry.command && (
              <div className="flex text-sm mb-1">
                <span className="text-[#4EC9B0]">PS C:\Users\Amaan27-Buzz&gt;</span>
                <span className="ml-2 text-white">{entry.command}</span>
              </div>
            )}
            
            {/* Command output */}
            {entry.output.map((item) => (
              <div key={item.id} className={`${
                item.type === 'error' ? 'text-red-400' : 
                item.type === 'info' ? 'text-[#569CD6]' : 
                'text-white'
              }`}>
                {item.content}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Command input area */}
      <div className="relative">
        <form onSubmit={handleCommandSubmit} className="border-t border-[#1E3465] p-3 flex items-center">
          <span className="text-[#4EC9B0] mr-2 whitespace-nowrap">PS C:\Users\Amaan27-Buzz&gt;</span>
          <input 
            type="text" 
            className="bg-transparent border-none outline-none flex-1 text-white text-sm"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or press Tab for suggestions"
            autoFocus
          />
        </form>
        
        {/* Command suggestions */}
        {showSuggestions && (
          <div className="absolute bottom-full left-0 right-0 bg-[#0C214A] border border-[#1E3465] rounded-t-md p-2 max-h-32 overflow-y-auto">
            <div className="grid grid-cols-2 gap-1">
              {suggestions.map(suggestion => (
                <div
                  key={suggestion}
                  onClick={() => {
                    setCurrentCommand(suggestion);
                    setShowSuggestions(false);
                  }}
                  className="text-[#4EC9B0] text-sm cursor-pointer hover:bg-[#16325a] px-2 py-1 rounded"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render different UI based on device type
  return isMobile ? renderMobileTimeline() : renderDesktopTerminal();
};

export default ExperienceApp;