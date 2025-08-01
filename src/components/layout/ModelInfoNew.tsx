/**
 * ModelInfo Component
 * 
 * A dynamic information panel that updates based on scroll position and user interactions.
 * Features:
 * - Scroll-based section updates (Hero, Experience, Projects)
 * - Interactive experience and project details on hover/click
 * - Skills popup for the model section
 * - Smooth transitions and animations
 * - External GitHub repository links
 * - Responsive design with mobile/desktop considerations
 * 
 * @component
 */

'use client';

import React, { useState, useRef } from 'react';
import SkillsInfo from './SkillsInfo';
import { useScrollSections } from '@/hooks/useScrollSections';
import { useClickOutside } from '@/hooks/useClickOutside';
import { EXPERIENCE_DETAILS, PROJECT_DETAILS, PROJECT_GITHUB_LINKS } from '@/constants/portfolio';

export default function ModelInfo() {
  // Scroll-based section management
  const { currentSection, isContactVisible, isTransitioning } = useScrollSections();

  // State for interactive elements
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);

  // Refs for click outside handling
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  /**
   * Toggles experience details display
   */
  const toggleExperienceDetails = (experience: string) => {
    setActiveExperience(activeExperience === experience ? null : experience);
  };

  /**
   * Toggles project details display
   */
  const toggleProjectDetails = (project: string) => {
    setActiveProject(activeProject === project ? null : project);
  };

  /**
   * Toggles skills popup display
   */
  const toggleSkills = () => {
    setIsSkillsVisible(!isSkillsVisible);
  };

  // Handle click outside to close details
  useClickOutside({
    ref: experienceRef,
    callback: () => {
      setActiveExperience(null);
      setActiveProject(null);
    },
    enabled: Boolean(activeExperience || activeProject)
  });

  useClickOutside({
    ref: skillsRef,
    callback: () => setIsSkillsVisible(false),
    enabled: isSkillsVisible
  });

  return (
    <React.Fragment>
      {/* Blue to transparent gradient overlay - spans full viewport */}
      <div className="fixed bottom-0 left-0 w-full h-32 lg:h-40 pointer-events-none z-40 bg-gradient-to-t from-[#EFF2F9] via-[#EFF2F9]/80 to-transparent"></div>
      
      <div 
        className={`fixed bottom-8 left-4 sm:left-8 md:left-12 z-50 transition-all duration-500 ease-in-out ${
          isContactVisible 
            ? 'opacity-0 translate-y-4 pointer-events-none' 
            : 'opacity-100 translate-y-0 pointer-events-auto'
        }`} 
        ref={experienceRef}
      >
        {/* Content with conditional rendering and additional animation */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isContactVisible 
              ? 'opacity-0 translate-y-2 scale-95' 
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
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
                className={`text-[#6E7F8D] text-xs sm:text-sm md:text-base leading-tight tracking-tight text-left transition-all duration-300 ease-in-out ${
                  isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
                style={{ fontFamily: 'Montserrat' }}
              >
                {currentSection.title}
              </h2>
              
              {/* Arrow icon - only show for Model section */}
              {currentSection.title.includes('Model') && (
                <button
                  className={`text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-all duration-300 ${
                    isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                  onClick={toggleSkills}
                  aria-label="Toggle skills display"
                >
                  ↗
                </button>
              )}
            </div>
          </div>
        
        {/* Dynamic content items */}
        <div className={`flex gap-1 items-start transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        } ${
          currentSection.title.includes('Experience') || currentSection.title.includes('Projects')
            ? 'flex-col' 
            : 'flex-col sm:flex-row sm:gap-3 flex-wrap'
        }`}>
          {currentSection.items.map((item, index) => (
            <div 
              key={index} 
              className={`relative group transition-all duration-300 ease-in-out ${
                isTransitioning 
                  ? 'opacity-0 translate-y-2' 
                  : 'opacity-100 translate-y-0'
              }`}
              style={{ 
                transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms` 
              }}
            >
              <div className="flex items-center gap-2">
                <span 
                  className="text-[#6E7F8D] text-[10px] sm:text-xs md:text-sm font-normal leading-tight tracking-tight text-left"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="font-semibold">{item}</span>
                </span>
                
                {/* External link icons - show for experience and project items */}
                {(currentSection.title.includes('Experience') || currentSection.title.includes('Projects')) && (
                  <div className="flex items-center gap-1">
                    {/* GitHub icon - only show for projects with public repos */}
                    {currentSection.title.includes('Projects') && PROJECT_GITHUB_LINKS[item] && (
                      <a 
                        href={PROJECT_GITHUB_LINKS[item]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6E7F8D] hover:text-[#171717] transition-colors duration-200"
                        aria-label={`View ${item} on GitHub`}
                      >
                        <svg 
                          className="w-[10px] h-[10px] sm:w-3 sm:h-3" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    
                    <button
                      className="text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-colors duration-200"
                      onClick={() => {
                        if (currentSection.title.includes('Experience')) {
                          toggleExperienceDetails(item);
                        } else if (currentSection.title.includes('Projects')) {
                          toggleProjectDetails(item);
                        }
                      }}
                      aria-label={`Toggle details for ${item}`}
                    >
                      ↗
                    </button>
                  </div>
                )}
              </div>

              {/* Experience details box - click */}
              {currentSection.title.includes('Experience') && (activeExperience === item) && (
                <div className="absolute bottom-full left-0 mb-2 opacity-100 pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {EXPERIENCE_DETAILS[item]}
                    </p>
                  </div>
                </div>
              )}

              {/* Project details box - click */}
              {currentSection.title.includes('Projects') && (activeProject === item) && (
                <div className="absolute bottom-full left-0 mb-2 opacity-100 pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {PROJECT_DETAILS[item]}
                    </p>
                  </div>
                </div>
              )}

              {/* Hover experience details box */}
              {currentSection.title.includes('Experience') && (
                <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {EXPERIENCE_DETAILS[item]}
                    </p>
                  </div>
                </div>
              )}

              {/* Hover project details box */}
              {currentSection.title.includes('Projects') && (
                <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {PROJECT_DETAILS[item]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
}
