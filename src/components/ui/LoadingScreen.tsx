import React, { useState, useEffect, useRef } from 'react';
import RotatingText, { RotatingTextRef } from './RotatingText';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  loadingTexts?: string[];
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  loadingTexts = ['Projects', 'Experiences', 'Skills', 'Portfolio'],
  className = ""
}) => {
  const [boxTextIndex, setBoxTextIndex] = useState(0);

  // Approximate character widths for different text lengths
  const getTextWidth = (text: string) => {
    const baseWidth = 14; // Base width per character in pixels (reduced)
    return text.length * baseWidth + 16; // Minimal padding since box already has px-3
  };

  const handleTextChange = (index: number) => {
    // Delay box animation to happen after text animation completes
    setTimeout(() => {
      setBoxTextIndex(index);
    }, 400); // Delay to allow text animation to complete
  };

  if (!isLoading) return null;

  return (
    <div className={`loading-screen ${!isLoading ? 'fade-out' : ''} ${className}`}>
      <div className="loading-content">
        <div className="flex items-center justify-center gap-3">
          <span className="text-white text-2xl font-light tracking-wider">Loading</span>
          <motion.div 
            className="py-2 px-3 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center"
            animate={{ 
              width: getTextWidth(loadingTexts[boxTextIndex])
            }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
          >
            <RotatingText
              texts={loadingTexts}
              mainClassName="text-white text-2xl font-light tracking-wider overflow-hidden text-center"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={1500}
              animatePresenceMode="wait"
              auto={true}
              onNext={handleTextChange}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 