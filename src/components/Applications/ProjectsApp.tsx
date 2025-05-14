
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Github, ExternalLink, Folder } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  previewLink?: string;
  image?: string;
}

const currentProjects: Project[] = [
  {
    title: "Dataweave",
    description: "A web-based visual tool for designing and managing relational database schemas. It offers an intuitive drag-and-drop interface to model ER diagrams and automatically convert them into SQL schema code.",
    tags: ["React", "TypeScript", "Vite", "Database Design"],
    githubLink: "https://github.com/amaansyed27/Dataweave",
    image: "https://via.placeholder.com/300x200/164B75/FFFFFF?text=Dataweave"
  },
  {
    title: "Hola",
    description: "An AI-powered voice chatbot app developed using Jetpack Compose and integrated with Google's Gemini API. It provides a natural conversational interface for users to talk with the bot via voice input.",
    tags: ["Android", "Jetpack Compose", "Gemini API", "Voice"],
    githubLink: "https://github.com/amaansyed27/Hola",
    image: "https://via.placeholder.com/300x200/164B75/FFFFFF?text=Hola"
  },
  {
    title: "Sentinel",
    description: "A safety-focused mobile app designed to protect users in emergency situations. It includes features like live location sharing, emergency SOS triggers, and nearby help alerts.",
    tags: ["Android", "Kotlin", "Compose", "Safety"],
    githubLink: "https://github.com/amaansyed27/Sentinel",
    image: "https://via.placeholder.com/300x200/164B75/FFFFFF?text=Sentinel"
  },
  {
    title: "Joto",
    description: "A clean, minimalistic note-taking and doodling Android app built with Jetpack Compose. It's designed for quick thoughts, creative sketches, and seamless writing.",
    tags: ["Android", "Jetpack Compose", "Notes", "Sketching"],
    githubLink: "https://github.com/amaansyed27/Joto",
    image: "https://via.placeholder.com/300x200/164B75/FFFFFF?text=Joto"
  }
];

const upcomingProjects: Project[] = [
  {
    title: "OSCAR",
    description: "Your Personal JARVIS: A second-brain operating system for Windows inspired by JARVIS built from the ground up using Python, locally-running LLMs, and a custom neural voice model.",
    tags: ["Python", "LLMs", "Voice Synthesis", "Automation"],
    githubLink: "#",
    image: "https://via.placeholder.com/300x200/164B75/FFFFFF?text=OSCAR"
  },
  {
    title: "Unnamed Browser Project",
    description: "A futuristic browser project powered by AI-first principles, designed for multitasking, knowledge retention, and productivity.",
    tags: ["Local LLM", "Browser", "AI", "Productivity"],
    githubLink: "#",
    image: "https://via.placeholder.com/300x200/164B75/FFFFFF?text=Browser+Project"
  },
  {
    title: "Unnamed Linux Distro",
    description: "A custom Linux distribution embedded with OSCAR at its core - designed for developers, creators, and researchers.",
    tags: ["Linux", "OSCAR", "Automation", "Development"],
    githubLink: "#",
    image: "https://via.placeholder.com/300x200/164B75/FFFFFF?text=Linux+Distro"
  }
];

const ProjectsApp: React.FC = () => {
  return (
    <div className="text-white h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FileText className="mr-2 h-5 w-5 text-os-accent" />
          Projects
        </h2>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="mb-6 bg-black/30">
          <TabsTrigger value="current" className="data-[state=active]:bg-os-primary data-[state=active]:text-white">
            <Folder className="mr-2 h-4 w-4" />
            Current Projects
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-os-primary data-[state=active]:text-white">
            <Folder className="mr-2 h-4 w-4" />
            Upcoming Projects
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
          
          <motion.div
            className="bg-black/20 rounded-lg p-4 border border-white/10 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-os-accent mb-2">...and 85+ more ideas</h3>
            <p className="text-white/80 leading-relaxed">
              I actively think, plan, and build over 85+ unique projects stored in my Notion workspace.
              Concepts span AI tools, developer utilities, creative platforms, productivity systems, and user-first applications.
              Some evolve into full apps, others fuel hackathons and prototypes. My creative engine never sleeps – I prototype often and experiment relentlessly.
            </p>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      className="bg-black/20 rounded-lg overflow-hidden border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {project.image && (
        <div className="h-40 bg-os-primary/20 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-os-accent mb-2">{project.title}</h3>
        <p className="text-white/80 text-sm mb-4 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex} 
              className="bg-os-primary/30 text-white/90 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3">
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-white/80 hover:text-white text-sm"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          
          {project.previewLink && (
            <a 
              href={project.previewLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-white/80 hover:text-white text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsApp;
