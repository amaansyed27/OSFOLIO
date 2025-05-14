
import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 0-100
  color?: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: "Development",
    skills: [
      { name: "Android Development", level: 90, color: "#3DDC84" },
      { name: "Kotlin", level: 85, color: "#7F52FF" },
      { name: "Java", level: 75, color: "#F89820" },
      { name: "React", level: 70, color: "#61DAFB" },
      { name: "TypeScript", level: 65, color: "#3178C6" }
    ]
  },
  {
    name: "Design",
    skills: [
      { name: "Figma", level: 85, color: "#F24E1E" },
      { name: "UI Design", level: 80, color: "#FF7262" },
      { name: "UX Design", level: 75, color: "#FF4088" },
      { name: "Wireframing", level: 90, color: "#A259FF" },
      { name: "Prototyping", level: 85, color: "#0ACF83" }
    ]
  },
  {
    name: "Other Skills",
    skills: [
      { name: "User Research", level: 80, color: "#64B5F6" },
      { name: "API Integration", level: 75, color: "#26C6DA" },
      { name: "Git/GitHub", level: 85, color: "#F05032" },
      { name: "Problem Solving", level: 90, color: "#9C27B0" },
      { name: "Team Collaboration", level: 85, color: "#00BCD4" }
    ]
  }
];

const SkillsApp: React.FC = () => {
  return (
    <div className="text-white h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Code className="mr-2 h-5 w-5 text-os-accent" />
          Skills & Capabilities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            className="bg-black/20 rounded-lg p-4 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-os-accent mb-4">{category.name}</h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">{skill.name}</span>
                    <span className="text-white/60 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color || "#3DDC84" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: skillIndex * 0.1 + categoryIndex * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-black/20 rounded-lg p-4 border border-white/10 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-os-accent mb-4">Skills Summary</h3>
        <p className="text-white/80 leading-relaxed">
          NATIVE ANDROID DEVELOPMENT ⋅ KOTLIN ⋅ FIGMA ⋅ UI DESIGN ⋅ UX DESIGN ⋅ WIREFRAMING ⋅ PROTOTYPING ⋅ USER RESEARCH ⋅ API INTEGRATION
        </p>
      </motion.div>
    </div>
  );
};

export default SkillsApp;
