'use client';

import { useState, useRef, useEffect } from 'react';
import ModelInfo from './ModelInfo';
import SkillsInfo from './SkillsInfo';
import LegoModel3D from '../common/LegoModel3D';

export default function Hero() {
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  const toggleSkills = () => {
    setIsSkillsVisible(!isSkillsVisible);
  };

  // Handle clicking outside to close the skills box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target as Node)) {
        setIsSkillsVisible(false);
      }
    };

    if (isSkillsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSkillsVisible]);

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* 3D Lego Model - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <LegoModel3D />
      </div>

      {/* Model Info - positioned at bottom left */}
      <div className="absolute bottom-8 left-4 sm:left-8 md:left-12">
        <ModelInfo />
      </div>

      {/* Features element - positioned at bottom right */}
      <div className="absolute bottom-8 right-4 sm:right-8 md:right-12 group" ref={featuresRef}>
        {/* Hover box with SkillsInfo */}
        <div className={`absolute bottom-full right-0 mb-4 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto ${
          isSkillsVisible 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="bg-[#EFF2F9] neumorphism rounded-[20px] p-6 w-[300px] sm:w-[350px] md:w-[400px]">
            <SkillsInfo />
          </div>
        </div>
        
        {/* Features text */}
        <span 
          className="text-[#6E7F8D] font-small cursor-pointer select-none"
          onClick={toggleSkills}
        >
          Features
        </span>
      </div>
    </section>
  );
}
