// Knowledge base for OSCAR - Contains structured information about Amaan Syed
export interface KnowledgeCategory {
  category: string;
  subcategories: {
    name: string;
    facts: string[];
    keywords: string[];
  }[];
}

export const knowledgeBase: KnowledgeCategory[] = [
  {
    category: "Personal",
    subcategories: [
      {
        name: "Background",
        facts: [
          "Amaan Syed is a tech geek and Native Android Developer based in Pune, India.",
          "Amaan is passionate about user-centric design and enhancing digital experiences.",
          "Amaan is dedicated to delivering designs that align with user needs and business goals.",
          "He's eager to contribute to high-impact projects that emphasize quality and innovation."
        ],
        keywords: ["background", "about", "personal", "who", "amaan", "person", "introduction"]
      },
      {
        name: "Contact",
        facts: [
          "Phone: +91 9325491427",
          "Email: amaansyed27@gmail.com",
          "Location: Pune, India",
          "LinkedIn: linkedin.com/in/amaan-syed",
          "GitHub: github.com/amaan-syed"
        ],
        keywords: ["contact", "phone", "email", "linkedin", "github", "reach", "connect"]
      }
    ]
  },
  {
    category: "Professional",
    subcategories: [
      {
        name: "Experience",
        facts: [
          "Android Developer Intern at Android Club, VIT Bhopal (March 2025 - Present)",
          "At Android Club, he developed user-friendly interfaces for seamless app navigation.",
          "At Android Club, he assisted in integrating third-party APIs to expand app capabilities.",
          "At Android Club, he created custom mobile applications using native technologies.",
          "Figma Wireframe Designer at makemycards.com (September 2024 - October 2024)",
          "At makemycards.com, he worked with marketing teams to align branding elements with UI/UX design.",
          "At makemycards.com, he created wireframes, storyboards, user flows, and site maps.",
          "At makemycards.com, he presented and defended designs to peers and executive stakeholders.",
          "At makemycards.com, he conducted user research and evaluated feedback to improve user experience.",
          "At makemycards.com, he designed intuitive interfaces for web and mobile applications using Figma.",
          "Event Management Member at Null VIT Bhopal Student Chapter (March 2024 - August 2024)",
          "At Null VIT Bhopal, he led volunteer teams to execute high-impact events.",
          "Powertrain Department Member at Team GarVIT (November 2023 - May 2024)",
          "At Team GarVIT, he worked in a team setting, providing support and guidance.",
          "At Team GarVIT, he developed cutting-edge powertrain solutions through cross-functional collaboration."
        ],
        keywords: ["experience", "work", "job", "intern", "internship", "android club", "makemycards", "null vit", "garvit", "professional"]
      },
      {
        name: "Education",
        facts: [
          "Bachelor of Computer Science at Vellore Institute of Technology (VIT) (September 2023 - June 2028)",
          "Currently pursuing a Bachelor's degree in Computer Science.",
          "High School Diploma (Science) from The Bishop's School, Pune (January 2011 - January 2023)",
          "Completed Android Developer with Kotlin online course on Udemy",
          "Received AcWoC'25 Top Contributor #1 certification from Android Club, VIT Bhopal"
        ],
        keywords: ["education", "school", "college", "university", "degree", "bachelor", "diploma", "course", "certification", "learn"]
      },
      {
        name: "Skills",
        facts: [
          "Native Android Development",
          "Kotlin",
          "Figma",
          "UI Design",
          "UX Design",
          "Wireframing",
          "Prototyping",
          "User Research",
          "API Integration"
        ],
        keywords: ["skills", "abilities", "can do", "expertise", "proficient", "knowledge", "capabilities"]
      }
    ]
  },
  {
    category: "Projects",
    subcategories: [
      {
        name: "Current Projects",
        facts: [
          "Dataweave: A web-based visual tool for designing and managing relational database schemas.",
          "Dataweave offers an intuitive drag-and-drop interface to model ER diagrams and convert them into SQL schema code.",
          "Dataweave is built with React, TypeScript, and Vite.",
          "Hola: An AI-powered voice chatbot app developed using Jetpack Compose and Google's Gemini API.",
          "Hola provides a natural conversational interface with voice-to-text support using Android's Speech API.",
          "Sentinel: A safety-focused mobile app with features like live location sharing, emergency SOS triggers, and nearby help alerts.",
          "Sentinel includes a one-tap SOS alert system with custom contacts and real-time location sharing.",
          "Joto: A clean, minimalistic note-taking and doodling Android app built with Jetpack Compose.",
          "Joto offers sketch + note support in a distraction-free interface with custom canvas tools."
        ],
        keywords: ["projects", "current projects", "dataweave", "hola", "sentinel", "joto", "apps", "applications"]
      },
      {
        name: "Upcoming Projects",
        facts: [
          "OSCAR – Optimized System for Commands and Assistance: A second-brain operating system inspired by JARVIS.",
          "OSCAR is built using Python, locally-running LLMs, and a custom neural voice model.",
          "OSCAR can operate apps autonomously, respond conversationally, and assist in real-time.",
          "Unnamed Browser Project: An AI-driven, productivity-centric web browser with local LLM integration.",
          "The browser project will feature context-aware browsing, tab memory, and session recall.",
          "Unnamed Linux Distro: A custom Linux distribution with OSCAR embedded at its core.",
          "The Linux distro will come with built-in automation and assistant features, optimized for offline productivity.",
          "Amaan has 85+ additional unique project ideas stored in his Notion workspace."
        ],
        keywords: ["upcoming", "future", "planned", "next", "oscar", "browser", "linux", "ideas"]
      }
    ]
  },
  {
    category: "Achievements",
    subcategories: [
      {
        name: "Awards",
        facts: [
          "Winner – Android Club Winter of Code: Secured 1st place with a 31-day streak and 2,705 points.",
          "Finalist – University Health Hackathon: Developed SOMA, a health-focused app that reached the final round.",
          "Improved wireframe delivery time by 30% in a month at makemycards.com.",
          "Achieved a 95% satisfaction rating from user feedback for designs at makemycards.com."
        ],
        keywords: ["achievements", "awards", "recognition", "winner", "acwoc", "hackathon", "accomplishments"]
      }
    ]
  }
];

// A list of friendly greetings that OSCAR can use
export const greetings = [
  "Hello! I'm OSCAR, Amaan's AI assistant. How can I help you learn about him today?",
  "Hi there! I'm OSCAR, Amaan's digital assistant. Feel free to ask me anything about him!",
  "Greetings! I'm OSCAR, here to provide information about Amaan Syed. What would you like to know?",
  "Welcome! I'm OSCAR, Amaan's personal AI. I'd be happy to tell you about his work, education, or projects.",
  "Hey! OSCAR here - Amaan's digital companion. Ask me anything about his skills, background, or achievements!"
];

// Fallback responses when OSCAR doesn't understand a query
export const fallbackResponses = [
  "I'm not sure I understand that question about Amaan. Could you rephrase it?",
  "Hmm, I don't have that specific information about Amaan. Try asking about his projects, education, skills, or experience?",
  "I'm still learning about Amaan! Could you ask something about his background, skills, or projects instead?",
  "I don't have that detail about Amaan yet. Would you like to know about his education, work experience, or tech skills instead?",
  "That's beyond my knowledge about Amaan. I can tell you about his projects, education, work experience, or tech skills if you'd like!"
];

// Introduction to specific topics that OSCAR can provide more details about
export const topicIntroductions = [
  "I can tell you about Amaan's background, skills, education, experience, projects, or achievements. What interests you most?",
  "Would you like to learn about Amaan's projects, education history, work experience, or technical skills?",
  "I have information about Amaan's professional background, educational journey, technical capabilities, and ongoing projects. What would you like to explore?",
  "I can share details about Amaan's work at Android Club, his education at VIT, or his various tech projects. What sounds interesting to you?"
];
