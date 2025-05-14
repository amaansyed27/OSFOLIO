import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Calendar, ArrowLeft, ArrowRight, RefreshCw, Home, Star, Search, Globe, Info, ChevronDown, Monitor, Code, Github, ExternalLink } from 'lucide-react';

interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  url?: string;
  favicon?: string;
  skills?: string[];
  links?: {
    title: string;
    url: string;
    icon: 'github' | 'external';
  }[];
}

const educations: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Vellore Institute of Technology (VIT)",
    period: "09/2023 – 06/2028",
    description: "Currently pursuing my Bachelor's degree, focusing on Computer Science and Software Development.",
    url: "education://vit.ac.in/computer-science/bachelor",
    favicon: "🎓",
    skills: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"],
    links: [
      {
        title: "University Portal",
        url: "https://vit.ac.in",
        icon: "external"
      }
    ]
  },
  {
    degree: "High School Diploma (Science)",
    institution: "The Bishop's School, Pune",
    period: "01/2011 – 01/2023",
    description: "Completed my high school education with a focus on science and mathematics.",
    url: "education://bishops-school.edu/science-track",
    favicon: "🏫",
    skills: ["Mathematics", "Physics", "Chemistry", "Computer Science"]
  },
  {
    degree: "Android Developer with Kotlin",
    institution: "Udemy",
    period: "Online Course",
    description: "Comprehensive course focused on Android development using Kotlin, covering UI design, data storage, networking, and publishing apps.",
    url: "education://udemy.com/courses/android-kotlin",
    favicon: "📱",
    skills: ["Kotlin", "Android SDK", "Material Design", "Firebase", "Room Database"],
    links: [
      {
        title: "Course Repository",
        url: "https://github.com/amaansyed27/android-kotlin-course",
        icon: "github"
      },
      {
        title: "Certificate",
        url: "https://udemy.com/certificate/UC-123456",
        icon: "external"
      }
    ]
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    institution: "freeCodeCamp",
    period: "Online Course",
    description: "Intensive bootcamp covering frontend and backend technologies for building modern web applications.",
    url: "education://freecodecamp.org/full-stack",
    favicon: "💻",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    links: [
      {
        title: "My Projects",
        url: "https://github.com/amaansyed27/fcc-projects",
        icon: "github"
      }
    ]
  }
];

const EducationApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('formal');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [currentURL, setCurrentURL] = useState("education://amaan-syed/academic-records");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));
  
  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date().toISOString().slice(0, 19).replace('T', ' '));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulate page load
  const reloadPage = () => {
    setLoading(true);
    setCurrentURL("education://amaan-syed/academic-records" + (activeTab !== 'formal' ? `/${activeTab}` : ""));
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  
  // Filter educations based on tab and search
  const getFilteredEducations = () => {
    let filtered = [...educations];
    
    // Filter by tab
    if (activeTab === 'courses') {
      filtered = filtered.filter(edu => 
        edu.institution.includes("Udemy") || 
        edu.institution.includes("freeCodeCamp") ||
        edu.period.includes("Online")
      );
    } else if (activeTab === 'formal') {
      filtered = filtered.filter(edu => 
        !edu.period.includes("Online") && 
        !edu.institution.includes("Udemy") && 
        !edu.institution.includes("freeCodeCamp")
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(edu => 
        edu.degree.toLowerCase().includes(query) || 
        edu.institution.toLowerCase().includes(query) ||
        (edu.description && edu.description.toLowerCase().includes(query)) ||
        (edu.skills && edu.skills.some(skill => skill.toLowerCase().includes(query)))
      );
    }
    
    return filtered;
  };
  
  // Change tab and simulate page load
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    reloadPage();
  };

  const renderSkillBadges = (skills: string[] | undefined) => {
    if (!skills) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {skills.map((skill, idx) => (
          <span 
            key={idx} 
            className="px-2 py-1 text-xs bg-os-primary/20 text-os-accent rounded-md border border-os-accent/20"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="text-os-foreground h-full flex flex-col overflow-hidden bg-os-background rounded-lg border border-white/10 shadow-lg">
      
      {/* Browser tabs */}
      <div className="flex bg-[#0C214A] border-b border-gray-700">
        <div 
          className={`px-4 py-2 flex items-center cursor-pointer ${activeTab === 'formal' ? 'bg-[#012456] text-white' : 'bg-[#071a36] text-white/70 hover:text-white/90 hover:bg-[#0a1d3d]'}`}
          onClick={() => handleTabChange('formal')}
        >
          <Book className="h-4 w-4 mr-2" />
          <span>Formal Education</span>
        </div>
        <div 
          className={`px-4 py-2 flex items-center cursor-pointer ${activeTab === 'courses' ? 'bg-[#012456] text-white' : 'bg-[#071a36] text-white/70 hover:text-white/90 hover:bg-[#0a1d3d]'}`}
          onClick={() => handleTabChange('courses')}
        >
          <Monitor className="h-4 w-4 mr-2" />
          <span>Online Courses</span>
        </div>
      </div>
      
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 p-2 bg-[#012456] border-b border-[#1E3465]">
        <button 
          className="p-1 bg-[#0C214A] rounded hover:bg-[#1E3465] disabled:opacity-50"
          disabled
          title="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button 
          className="p-1 bg-[#0C214A] rounded hover:bg-[#1E3465] disabled:opacity-50"
          disabled
          title="Forward"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <button 
          className="p-1 bg-[#0C214A] rounded hover:bg-[#1E3465] transition-colors"
          onClick={reloadPage}
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <button 
          className="p-1 bg-[#0C214A] rounded hover:bg-[#1E3465] transition-colors"
          onClick={() => {
            setActiveTab('formal');
            reloadPage();
          }}
          title="Home"
        >
          <Home className="h-4 w-4" />
        </button>
        
        {/* Address bar */}
        <div className="flex-1 flex bg-[#0C214A] rounded border border-[#1E3465] px-2 py-1">
          <Globe className="h-4 w-4 mr-2 text-os-accent" />
          <div className="text-sm text-white/90 truncate font-mono">{currentURL}</div>
        </div>
        
        {/* Search bar */}
        <div className="relative">
          <div className="flex bg-[#0C214A] rounded border border-[#1E3465] px-2 py-1">
            <Search className="h-4 w-4 mr-2 text-white/60" />
            <input 
              type="text" 
              placeholder="Search education..." 
              className="bg-transparent border-none outline-none text-sm w-40 placeholder-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Browser status bar */}
      <div className="bg-[#012456] border-b border-[#1E3465] px-3 py-1 flex justify-between items-center text-xs text-white/60">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
          <span>Secure connection</span>
        </div>
        <div>
          {loading ? "Loading..." : `${getFilteredEducations().length} ${activeTab === 'formal' ? 'educational' : 'online course'} records found`}
        </div>
        <div>Last updated: 2025-05-14 19:52:33</div>
      </div>
      
      {/* Main content area with custom scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#012456] scrollbar-dark">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-os-accent mb-4"></div>
              <p>Loading education records...</p>
              <p className="text-white/50 text-sm mt-1">Please wait...</p>
            </div>
          </div>
        ) : getFilteredEducations().length > 0 ? (
          <>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold text-white flex items-center mb-2 sm:mb-0">
                {activeTab === 'formal' ? (
                  <>
                    <Book className="mr-2 h-5 w-5 text-os-accent" />
                    Formal Education
                  </>
                ) : (
                  <>
                    <Code className="mr-2 h-5 w-5 text-os-accent" />
                    Online Courses & Certifications
                  </>
                )}
              </h2>
              <div className="sm:ml-auto text-xs text-white/50 border border-white/20 rounded px-2 py-1 bg-black/20">
                {searchQuery ? `Search results for: "${searchQuery}"` : "Showing all results"}
              </div>
            </div>
          
            <div className="space-y-6">
              {getFilteredEducations().map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-lg">{edu.favicon}</span>
                    <div className="text-xs text-white/50 font-mono truncate bg-black/30 px-2 py-1 rounded">{edu.url}</div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-os-accent">{edu.degree}</h3>
                      <p className="text-white/70">{edu.institution}</p>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                      <Calendar className="h-4 w-4 mr-1 text-white/60" />
                      <span className="text-white/60 text-sm">{edu.period}</span>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-white/80 mt-2 leading-relaxed">{edu.description}</p>
                  )}
                  
                  {renderSkillBadges(edu.skills)}
                  
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      className="flex items-center text-xs text-os-accent hover:text-os-accent/80 hover:underline transition-colors"
                      onClick={() => setShowDetails(showDetails === index ? null : index)}
                    >
                      <Info className="h-3 w-3 mr-1" />
                      {showDetails === index ? "Hide details" : "View details"}
                      <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${showDetails === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className="flex space-x-2">
                      {edu.links && edu.links.map((link, idx) => (
                        <button 
                          key={idx} 
                          className="text-xs bg-[#0C214A] hover:bg-[#1E3465] px-2 py-1 rounded flex items-center transition-colors"
                          title={link.url}
                        >
                          {link.icon === 'github' ? (
                            <Github className="h-3 w-3 inline mr-1" />
                          ) : (
                            <ExternalLink className="h-3 w-3 inline mr-1" />
                          )}
                          {link.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {showDetails === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-3 border-t border-white/10"
                      >
                        <div className="bg-[#071a36] rounded p-3 text-sm scrollbar-dark">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-os-accent font-medium mb-2">Course Details</h4>
                              <p className="text-white/70 mb-1">Duration: {
                                edu.period.includes("–") ? 
                                  `${edu.period.split("–")[0].trim()} to ${edu.period.split("–")[1].trim()}` : 
                                  "Self-paced"
                              }</p>
                              <p className="text-white/70 mb-1">Format: {
                                edu.institution.includes("VIT") ? "In-person" : 
                                edu.period.includes("Online") ? "Online" : 
                                "Hybrid"
                              }</p>
                              <p className="text-white/70">Certificate: {
                                edu.links?.some(link => link.title.includes("Certificate")) ? "Available" : 
                                edu.institution.includes("VIT") ? "Upon graduation" : 
                                "Not provided"
                              }</p>
                            </div>
                            <div>
                              <h4 className="text-os-accent font-medium mb-2">Additional Information</h4>
                              <p className="text-white/70 mb-1">Website: <span className="text-os-accent hover:underline cursor-pointer">Visit site</span></p>
                              <p className="text-white/70 mb-1">Location: {
                                edu.institution.includes("VIT") ? "Vellore, Tamil Nadu, India" :
                                edu.institution.includes("Bishop") ? "Pune, Maharashtra, India" :
                                "Online"
                              }</p>
                              <p className="text-white/70">Last Accessed: 2025-05-14 19:52:33</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 bg-black/20 p-2 rounded text-xs">
                            <p className="font-mono text-white/50">System Note: This educational record was imported from {edu.institution}'s database on 2025-05-01.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8 bg-[#071a36] rounded-lg border border-[#1E3465] max-w-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No Results Found</h3>
              <p className="text-white/70 mb-4">
                We couldn't find any {activeTab} records matching "{searchQuery}".
              </p>
              <button 
                className="px-4 py-2 bg-os-primary hover:bg-os-secondary rounded transition-colors"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationApp;