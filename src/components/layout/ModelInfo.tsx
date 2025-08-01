'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SkillsInfo from './SkillsInfo';

interface SectionContent {
  title: string;
  items: string[];
}

interface ExperienceDetails {
  [key: string]: string;
}

interface ProjectDetails {
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
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

    // Experience details that will be shown in the hover boxes
  const experienceDetails: ExperienceDetails = {
    "Software Development Intern @ Accelerant": "Currently designing sophisticated layered churn-prediction machine learning models while building the supporting Node.js/Express ETL pipeline integrated with PostgreSQL databases. I'm documenting comprehensive workflows in GitHub SOPs to enable real-time customer churn intervention capabilities for global teams, combining data science with robust backend engineering to deliver scalable business solutions.",
    "Frontend Engineer @ Jin Marketing": "Delivering scalable web solutions deployed on Vercel while leveraging AWS for data and image optimization to achieve faster load times and enhanced performance. I utilize Next.js and Tailwind CSS to craft consistent, responsive designs that provide user-friendly interfaces. Additionally, I engineered a Django-based admin dashboard tailored for non-tech-savvy business owners, centralizing control of all business websites and integrating Gmail API for real-time email notifications.",
    "Web Developer @ Arché Journal": "Enhanced user experience by designing and implementing responsive React components, including dynamic social media integration and visually distinct publication sections, which improved navigation clarity and increased user engagement by 23%. I successfully migrated deployment from manual FTP uploads to an automated Git-based workflow with AWS hosting optimization, reducing page load time by 35% and simplifying content updates for future development teams.",
    "Software Engineer Fellow @ BU Spark! Innovation Program": "Developed chatsqrd, an innovative adaptive educational app leveraging conversational AI through OpenAI API and speech recognition via ElevenLabs, significantly boosting accessibility and engagement for children struggling with traditional learning methods. I collaborated in Agile teams using Jira and Figma to rapidly iterate on conversational UI prototypes, integrating OpenAI APIs to improve learner outcomes and create more inclusive educational experiences."
  };

  // Project details that will be shown in the hover boxes
  const projectDetails: ProjectDetails = {
    "Stock Trading Platform": "Developed a comprehensive stock trading platform using React.js and Flask, featuring secure user account management with password hashing and SQLite database integration. The application includes interactive visualizations of historical stock trends through Alpha Vantage API integration and React charting libraries, enabling effective market data analysis. Containerized with Docker and implemented automated CI/CD pipelines using GitHub Actions to streamline deployments and enhance development efficiency.",
    "chatsqrd": "Built an adaptive educational app leveraging conversational AI through OpenAI API and speech recognition via ElevenLabs. Implemented a hybrid Firestore database structure that reduced database read operations by ~60% through efficient conversation history management. Engineered modular React frontend components and developed a fallback audio processing pipeline using MediaRecorder API for seamless speech-to-text transcription across various network and browser conditions.",
    "Jin Marketing Business Suite": "Designing and implementing multiple business websites using Figma, Next.js, and Tailwind CSS for various popular Boston establishments including Underdog Hot Chicken (underdoghotchickenboston.com), Han Nightclub (hanlounge.com), Gopchang Story (WIP), First Liquor Corporation (WIP), Sojuba (WIP), and Tofu Story (WIP). Co-engineering a comprehensive Django-based admin dashboard that centralizes management of all business operations, allowing the owner to control multiple websites from a single unified interface with a streamlined Next.js frontend.",
    "Spotify Playlist Recommender": "Developing a machine learning-powered music recommendation system to improve upon Spotify's current algorithm by better understanding individual music taste patterns. Integrating multiple APIs including Spotify API for user data and music features, Genius API for lyrical analysis, and Last.fm API for enhanced music metadata. The project aims to create a more personalized and accurate music discovery experience through advanced algorithmic analysis of listening habits and preferences."
  };

  const toggleExperienceDetails = (experience: string) => {
    setActiveExperience(activeExperience === experience ? null : experience);
  };

  const toggleProjectDetails = (project: string) => {
    setActiveProject(activeProject === project ? null : project);
  };

  const toggleSkills = () => {
    setIsSkillsVisible(!isSkillsVisible);
  };

  // Helper function to handle smooth section transitions
  const updateSection = useCallback((newSection: SectionContent) => {
    if (newSection.title !== currentSection.title) {
      setIsTransitioning(true);
      // Trigger fade out
      setTimeout(() => {
        setCurrentSection(newSection);
        // Trigger fade in after content change
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);
    }
  }, [currentSection.title]);

  // Handle clicking outside to close the experience details
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (experienceRef.current && !experienceRef.current.contains(event.target as Node)) {
        setActiveExperience(null);
        setActiveProject(null);
      }
      if (skillsRef.current && !skillsRef.current.contains(event.target as Node)) {
        setIsSkillsVisible(false);
      }
    };

    if (activeExperience || activeProject || isSkillsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeExperience, activeProject, isSkillsVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if Contact section is visible (assuming it starts around 2.8x window height)
      if (scrollY >= windowHeight * 2.8) {
        setIsContactVisible(true);
        return; // Early return to avoid setting other sections
      } else {
        setIsContactVisible(false);
      }
      
      // Define section thresholds
      if (scrollY < windowHeight * 0.8) {
        // Hero section
        updateSection({
          title: "Model: Jiehoon Lee",
          items: [
            "Origin: Miami, FL",
            "Status: Aspiring Software Engineer",
            "Boston University Edition*"
          ]
        });
      } else if (scrollY >= windowHeight * 0.8 && scrollY < windowHeight * 1.8) {
        // Experience section
        updateSection({
          title: "Experience: Professional Journey",
          items: [
            "Software Development Intern @ Accelerant",
            "Frontend Engineer @ Jin Marketing",
            "Web Developer @ Arché Journal",
            "Software Engineer Fellow @ BU Spark! Innovation Program"
          ]
        });
      } else if (scrollY >= windowHeight * 1.8) {
        // Projects section
        updateSection({
          title: "Projects: Technical Showcase",
          items: [
            "Stock Trading Platform",
            "chatsqrd",
            "Jin Marketing Business Suite",
            "Spotify Playlist Recommender"
          ]
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateSection]);

  return (
    <>
      {/* Blue to transparent gradient overlay - spans full viewport */}
      <div className="fixed bottom-0 left-0 w-full h-32 lg:h-40 pointer-events-none z-40 bg-gradient-to-t from-[#EFF2F9] via-[#EFF2F9]/80 to-transparent"></div>
      
      <div className={`fixed bottom-8 left-4 sm:left-8 md:left-12 z-50 transition-all duration-500 ease-in-out ${
        isContactVisible 
          ? 'opacity-0 translate-y-4 pointer-events-none' 
          : 'opacity-100 translate-y-0 pointer-events-auto'
      }`} ref={experienceRef}>
        {/* Content with conditional rendering and additional animation */}
        <div className={`transition-all duration-300 ease-in-out ${
          isContactVisible 
            ? 'opacity-0 translate-y-2 scale-95' 
            : 'opacity-100 translate-y-0 scale-100'
        }`}>
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
                <span 
                  className={`text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-all duration-300 ${
                    isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                  onClick={toggleSkills}
                >
                  ↗
                </span>
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
                
                {/* External link icon - show for experience and project items */}
                {(currentSection.title.includes('Experience') || currentSection.title.includes('Projects')) && (
                  <div className="flex items-center gap-1">
                    {/* GitHub icon - only show for projects with public repos */}
                    {currentSection.title.includes('Projects') && item !== 'Jin Marketing Business Suite' && (
                      <a 
                        href={
                          item === 'Stock Trading Platform' ? 'https://github.com/jiehoonn/411-finalproject' :
                          item === 'chatsqrd' ? 'https://github.com/miloopark/chatchat/tree/dev' :
                          item === 'Spotify Playlist Recommender' ? 'https://github.com/jiehoonn/spotify-song-recommender' : 
                          '#'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6E7F8D] hover:text-[#171717] transition-colors duration-200"
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
                    
                    <span 
                      className="text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-colors duration-200"
                      onClick={() => {
                        if (currentSection.title.includes('Experience')) {
                          toggleExperienceDetails(item);
                        } else if (currentSection.title.includes('Projects')) {
                          toggleProjectDetails(item);
                        }
                      }}
                    >
                      ↗
                    </span>
                  </div>
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

              {/* Project details box */}
              {currentSection.title.includes('Projects') && (activeProject === item) && (
                <div className="absolute bottom-full left-0 mb-2 opacity-100 pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {projectDetails[item]}
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

              {/* Hover project details box */}
              {currentSection.title.includes('Projects') && (
                <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                  <div className="bg-[#EFF2F9] neumorphism rounded-[15px] p-4 w-[280px] sm:w-[320px] md:w-[360px]">
                    <p className="text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Montserrat' }}>
                      {projectDetails[item]}
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
    </>
  );
}
