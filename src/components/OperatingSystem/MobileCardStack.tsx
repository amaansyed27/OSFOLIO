import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Bot, ChevronUp, ArrowUp, ArrowUpRight } from 'lucide-react';

interface Card {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  content: React.ReactNode;
  summary?: string;
}

interface MobileCardStackProps {
  cards: Card[];
  onCardOpen: (id: string) => void;
  onOscarOpen: () => void;
}

const MobileCardStack: React.FC<MobileCardStackProps> = ({ 
  cards, 
  onCardOpen,
  onOscarOpen
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const constraintsRef = useRef(null);
  const [isSwipeIndicatorVisible, setIsSwipeIndicatorVisible] = useState(true);

  // Hide swipe indicator after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSwipeIndicatorVisible(false);
    }, 5000); // Hide after 5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  // Handle card drag end
  const handleDragEnd = (info: PanInfo) => {
    const swipeThreshold = 100;
    
    if (info.offset.y < -swipeThreshold) {
      // Swiped up
      if (activeIndex < cards.length - 1) {
        setDirection('up');
        setActiveIndex(activeIndex + 1);
      } else {
        // At the last card, possibly show a modal or return to first card
        setActiveIndex(0);
      }
    } else if (info.offset.y > swipeThreshold) {
      // Swiped down
      if (activeIndex > 0) {
        setDirection('down');
        setActiveIndex(activeIndex - 1);
      }
    }
    
    setIsDragging(false);
  };

  // Card variants for animations
  const cardVariants = {
    active: { 
      scale: 1, 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    previous: (custom: number) => ({ 
      scale: 0.95 - (0.05 * custom), 
      y: 20 + (10 * custom), 
      opacity: 0.6 - (0.1 * custom),
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }),
    next: (custom: number) => ({ 
      scale: 0.95 - (0.05 * custom), 
      y: -150 - (10 * custom), 
      opacity: 0.6 - (0.1 * custom),
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    })
  };

  // Get card state (active, previous, or next)
  const getCardState = (index: number) => {
    if (index === activeIndex) return "active";
    if (index < activeIndex) return "previous";
    return "next";
  };

  // Get custom value for staggered animations
  const getCustom = (index: number) => {
    if (index === activeIndex) return 0;
    return Math.abs(index - activeIndex);
  };

  // Handle direct open of the current card
  const handleOpenCurrentCard = () => {
    const currentCard = cards[activeIndex];
    if (currentCard) {
      onCardOpen(currentCard.id);
    }
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" ref={constraintsRef}>
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#121212] via-[#1E1E1E] to-[#181818]" 
        animate={{ 
          background: [
            "linear-gradient(45deg, rgba(18,18,18,1) 0%, rgba(30,30,30,1) 50%, rgba(24,24,24,1) 100%)",
            "linear-gradient(135deg, rgba(18,18,18,1) 0%, rgba(30,30,30,1) 50%, rgba(24,24,24,1) 100%)",
            "linear-gradient(225deg, rgba(18,18,18,1) 0%, rgba(30,30,30,1) 50%, rgba(24,24,24,1) 100%)",
            "linear-gradient(315deg, rgba(18,18,18,1) 0%, rgba(30,30,30,1) 50%, rgba(24,24,24,1) 100%)",
            "linear-gradient(45deg, rgba(18,18,18,1) 0%, rgba(30,30,30,1) 50%, rgba(24,24,24,1) 100%)"
          ]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear" 
        }}
      />

      {/* Subtle particles for background texture */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 8,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      ))}
      
      {/* Swipe instruction indicator - shows initially and fades away */}
      <AnimatePresence>
        {isSwipeIndicatorVisible && (
          <motion.div
            className="absolute bottom-28 z-20 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="p-3 bg-black/40 rounded-full backdrop-blur-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <ArrowUp className="h-6 w-6 text-white" />
            </motion.div>
            <p className="text-white/80 text-sm mt-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
              Swipe up or down to navigate
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card stack */}
      <div className="relative h-[78vh] w-full z-10 mt-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute top-0 left-0 right-0 mx-4 rounded-xl shadow-lg overflow-hidden"
            style={{ 
              // More solid background with improved contrast - solid color
              background: `linear-gradient(145deg, ${card.color}, ${card.color}DD)`,
              height: "calc(100% - 20px)",
              zIndex: cards.length - Math.abs(activeIndex - index)
            }}
            drag="y"
            dragConstraints={constraintsRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => handleDragEnd(info)}
            variants={cardVariants}
            custom={getCustom(index)}
            animate={getCardState(index)}
            initial={index > activeIndex ? "next" : "previous"}
          >
            {/* Card content */}
            <div className="p-6 h-full flex flex-col">
              {/* Card header with title only */}
              <div className="flex items-center mb-3">
                <div className="bg-black/30 p-2 rounded-lg mr-3">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold">{card.title}</h2>
              </div>
              
              {/* Card divider */}
              <div className="h-px bg-white/20 w-full mb-4"></div>
              
              {/* Card main content - enhanced with rich layout */}
              <div className="flex-grow overflow-hidden">
                {card.content}
              </div>
              
              {/* New position: Open button in the center bottom of the card */}
              {index === activeIndex && (
                <div className="flex flex-col items-center mt-auto mb-2">
                  <motion.button
                    className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenCurrentCard}
                  >
                    <span className="font-medium">Open</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                  <p className="text-xs text-white/60 mt-2 text-center">
                    Click the Open button to view full details
                  </p>
                </div>
              )}
              
              {/* Card footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <motion.div 
                    className="mr-2 w-6 h-6 flex items-center justify-center bg-black/30 rounded-full"
                    animate={{ 
                      y: index === activeIndex ? [0, -3, 0] : 0 
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: index === activeIndex ? Infinity : 0,
                      repeatType: "loop"
                    }}
                  >
                    <ChevronUp className="h-4 w-4 text-white/80" />
                  </motion.div>
                  <span className="text-xs text-white/70">Swipe up to navigate</span>
                </div>
                <div className="bg-black/30 px-2 py-1 rounded-full text-xs">
                  {activeIndex + 1}/{cards.length}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation indicator dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {cards.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? 'bg-white' : 'bg-white/30'
              }`}
              animate={{ 
                scale: index === activeIndex ? 1.2 : 1,
                opacity: index === activeIndex ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Oscar assistant button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-os-mclaren-papaya to-os-barcelona-red flex items-center justify-center shadow-lg border border-white/10 z-20"
        onClick={onOscarOpen}
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          delay: 0.5 
        }}
      >
        <Bot className="h-6 w-6 text-white" />
        
        {/* Subtle pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/30"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ 
            scale: [0.85, 1.1, 0.85], 
            opacity: [0, 0.5, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1
          }}
        />
      </motion.button>
    </div>
  );
};

export default MobileCardStack;
