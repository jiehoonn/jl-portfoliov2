'use client';

import React, { useState, useEffect, useRef } from 'react';
import SkillsInfo from './SkillsInfo';

interface SectionContent {
  title: string;
  items: string[];
}

interface ExperienceDetails {
  [key: string]: string;
}

export default function ModelInfo() {
  const [currentSection, setCurrentSection] = useState<SectionContent>({
    title: "Model: Jiehoon Lee",
    items: [
      "Origin: Miami, FL",
      "Status: Aspiring Software Engineer",
      "Boston University Edition*"
    ]
  });

  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Experience details that will be shown in the hover boxes
  const experienceDetails: ExperienceDetails = {
    "Software Development Intern @ Accelerant": "Details about your software development internship at Accelerant will go here. You can describe the technologies used, projects worked on, and skills gained.",
    "Frontend Engineer @ Jin Marketing": "Details about your frontend engineering role at Jin Marketing will go here. You can describe the projects built, technologies used, and impact made.",
    "Web Developer @ Arché Journal": "Details about your web development work at Arché Journal will go here. You can describe the website features developed, user experience improvements, and technical challenges solved.",
    "Software Engineer Fellow @ BU Spark! Innovation Program": "Details about your software engineer fellowship at BU Spark! will go here. You can describe the innovation projects, collaborative work, and technologies explored."
  };

  const toggleExperienceDetails = (experience: string) => {
    setActiveExperience(activeExperience === experience ? null : experience);
  };

  const toggleSkills = () => {
    setIsSkillsVisible(!isSkillsVisible);
  };

  // Handle clicking outside to close the experience details
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (experienceRef.current && !experienceRef.current.contains(event.target as Node)) {
        setActiveExperience(null);
      }
      if (skillsRef.current && !skillsRef.current.contains(event.target as Node)) {
        setIsSkillsVisible(false);
      }
    };

    if (activeExperience || isSkillsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeExperience, isSkillsVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Define section thresholds
      if (scrollY < windowHeight * 0.8) {
        // Hero section
        setCurrentSection({
          title: "Model: Jiehoon Lee",
          items: [
            "Origin: Miami, FL",
            "Status: Aspiring Software Engineer",
            "Boston University Edition*"
          ]
        });
      } else if (scrollY >= windowHeight * 0.8) {
        // Experience section
        setCurrentSection({
          title: "Experience: Professional Journey",
          items: [
            "Software Development Intern @ Accelerant",
            "Frontend Engineer @ Jin Marketing",
            "Web Developer @ Arché Journal",
            "Software Engineer Fellow @ BU Spark! Innovation Program"
          ]
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 left-4 sm:left-8 md:left-12 z-50 transition-all duration-500 ease-in-out" ref={experienceRef}>
      <div className="flex flex-col gap-1 items-start text-left">
        {/* Title with Skills Arrow */}
        <div className="relative group" ref={skillsRef}>
          {/* Skills popup - only show for Model section */}
          {currentSection.title.includes('Model') && (
            <div className={`absolute bottom-full left-0 mb-4 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto ${
              isSkillsVisible 
                ? 'opacity-100 pointer-events-auto' 
                : 'opacity-0 group-hover:opacity-100'
            }`}>
              <div className="bg-[#EFF2F9] neumorphism rounded-[20px] p-6 w-[300px] sm:w-[350px] md:w-[400px]">
                <SkillsInfo />
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <h2 
              className="text-[#6E7F8D] text-xs sm:text-sm md:text-base leading-tight tracking-tight text-left"
              style={{ fontFamily: 'Montserrat' }}
            >
              {currentSection.title}
            </h2>
            
            {/* Arrow icon - only show for Model section */}
            {currentSection.title.includes('Model') && (
              <span 
                className="text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-colors duration-200"
                onClick={toggleSkills}
              >
                ↗
              </span>
            )}
          </div>
        </div>
        
        {/* Dynamic content items */}
        <div className={`flex gap-1 items-start ${
          currentSection.title.includes('Experience') 
            ? 'flex-col' 
            : 'flex-col sm:flex-row sm:gap-3 flex-wrap'
        }`}>
          {currentSection.items.map((item, index) => (
            <div key={index} className="relative group">
              <div className="flex items-center gap-2">
                <span 
                  className="text-[#6E7F8D] text-[10px] sm:text-xs md:text-sm font-normal leading-tight tracking-tight text-left"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="font-semibold">{item}</span>
                </span>
                
                {/* External link icon - only show for experience items */}
                {currentSection.title.includes('Experience') && (
                  <span 
                    className="text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-colors duration-200"
                    onClick={() => toggleExperienceDetails(item)}
                  >
                    ↗
                  </span>
                )}
              </div>

              {/* Experience details box */}
              {currentSection.title.includes('Experience') && (activeExperience === item) && (
                <div className="absolute bottom-full left-0 mb-2 opacity-100 pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {experienceDetails[item]}
                    </p>
                  </div>
                </div>
              )}

              {/* Hover experience details box */}
              {currentSection.title.includes('Experience') && (
                <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {experienceDetails[item]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
