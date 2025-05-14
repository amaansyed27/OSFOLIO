
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Award, CheckCircle } from 'lucide-react';

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    title: "Winner – Android Club Winter of Code",
    description: "Secured 1st place in a one-month open-source competition with a 31-day streak and 2,705 points, leading by a 1,300-point margin.",
    icon: <Trophy className="h-8 w-8 text-yellow-400" />
  },
  {
    title: "Finalist – University Health Hackathon",
    description: "Developed SOMA, a health-focused app that reached the final round.",
    icon: <Award className="h-8 w-8 text-blue-400" />
  },
  {
    title: "Figma Wireframe Efficiency",
    description: "Improved wireframe delivery time by 30% in a month at makemycards.com.",
    icon: <CheckCircle className="h-8 w-8 text-green-400" />
  },
  {
    title: "User Satisfaction Enhancement",
    description: "Achieved a 95% satisfaction rating from user feedback for designs at makemycards.com.",
    icon: <Star className="h-8 w-8 text-purple-400" />
  }
];

const AchievementsApp: React.FC = () => {
  return (
    <div className="text-white h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-os-accent" />
          Achievements & Awards
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="bg-black/20 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-black/30 rounded-full p-4 mb-4">
              {achievement.icon}
            </div>
            <h3 className="text-xl font-semibold text-os-accent mb-2">{achievement.title}</h3>
            <p className="text-white/80 leading-relaxed">{achievement.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsApp;
