'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import SkillsInfo from './SkillsInfo';
import { useScrollSections } from '@/hooks/useScrollSections';
import { EXPERIENCE_DETAILS, PROJECT_DETAILS, PROJECT_GITHUB_LINKS, SKILLS } from '@/constants/portfolio';

export default function ModelInfo() {
  const { currentSection, isContactVisible, isTransitioning } = useScrollSections();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [displayedContent, setDisplayedContent] = useState<string | null>(null);
  const [isShadowVisible, setIsShadowVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const [skillsContainerVisible, setSkillsContainerVisible] = useState(false);
  const [skillsCount, setSkillsCount] = useState(0);

  const textTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shadowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const skillsCountRef = useRef(0);
  const skillsAnimRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skillsShadowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skillsCloseDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isExperience = currentSection.title.includes('Experience');
  const isProjects = currentSection.title.includes('Projects');
  const isModel = currentSection.title.includes('Model');

  const detailContent = hoveredItem
    ? (isExperience ? EXPERIENCE_DETAILS[hoveredItem] : isProjects ? PROJECT_DETAILS[hoveredItem] : null)
    : null;

  const stepSkillsTo = useCallback((target: number, onComplete?: () => void) => {
    if (skillsAnimRef.current) clearTimeout(skillsAnimRef.current);
    const step = () => {
      const current = skillsCountRef.current;
      if (current === target) {
        onComplete?.();
        return;
      }
      const next = current < target ? current + 1 : current - 1;
      skillsCountRef.current = next;
      setSkillsCount(next);
      skillsAnimRef.current = setTimeout(step, 30);
    };
    step();
  }, []);

  const handleSkillsEnter = useCallback(() => {
    if (skillsCloseDelayRef.current) clearTimeout(skillsCloseDelayRef.current);
    if (skillsShadowTimeoutRef.current) clearTimeout(skillsShadowTimeoutRef.current);
    setSkillsContainerVisible(true);
    skillsShadowTimeoutRef.current = setTimeout(() => {
      stepSkillsTo(SKILLS.length);
    }, 500);
  }, [stepSkillsTo]);

  const handleSkillsLeave = useCallback(() => {
    if (skillsShadowTimeoutRef.current) clearTimeout(skillsShadowTimeoutRef.current);
    skillsCloseDelayRef.current = setTimeout(() => {
      stepSkillsTo(0, () => setSkillsContainerVisible(false));
    }, 100);
  }, [stepSkillsTo]);

  useEffect(() => {
    const clearAll = () => {
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
      if (shadowTimeoutRef.current) clearTimeout(shadowTimeoutRef.current);
      if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    };

    if (detailContent) {
      clearAll();
      setIsTextVisible(false);
      setDisplayedContent(detailContent);
      requestAnimationFrame(() => {
        setIsShadowVisible(true);
        textTimeoutRef.current = setTimeout(() => setIsTextVisible(true), 500);
      });
    } else {
      setIsTextVisible(false);
      shadowTimeoutRef.current = setTimeout(() => setIsShadowVisible(false), 500);
      contentTimeoutRef.current = setTimeout(() => setDisplayedContent(null), 1050);
    }

    return clearAll;
  }, [detailContent]);

  useEffect(() => {
    setHoveredItem(null);
    setIsShadowVisible(false);
    setIsTextVisible(false);
    setDisplayedContent(null);
    if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
    if (shadowTimeoutRef.current) clearTimeout(shadowTimeoutRef.current);
    if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    if (skillsAnimRef.current) clearTimeout(skillsAnimRef.current);
    if (skillsShadowTimeoutRef.current) clearTimeout(skillsShadowTimeoutRef.current);
    if (skillsCloseDelayRef.current) clearTimeout(skillsCloseDelayRef.current);
    skillsCountRef.current = 0;
    setSkillsCount(0);
    setSkillsContainerVisible(false);
  }, [currentSection.title]);

  return (
    <React.Fragment>
      <div className="fixed bottom-0 left-0 w-full h-32 lg:h-40 pointer-events-none z-40 bg-gradient-to-t from-[#EFF2F9] via-[#EFF2F9]/80 to-transparent"></div>

      {/* Shared detail box — left-aligned with info panel, vertically centered */}
      <div
        className={`hidden lg:block fixed top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-12 z-50 w-[280px] sm:w-[320px] md:w-[360px] transition-opacity duration-500 ${
          isContactVisible ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div className={`bg-[#EFF2F9] rounded-[15px] info-detail-box ${isShadowVisible ? 'info-detail-box--visible' : ''}`}>
          {displayedContent && (
            <div className="p-4">
              <p className={`info-detail-text text-[#171717] text-[10px] sm:text-xs md:text-sm leading-relaxed ${isTextVisible ? 'info-detail-text--visible' : ''}`}>
                {displayedContent}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Skills popup — same left/vertical alignment as detail box */}
      {isModel && (
        <div
          className={`hidden lg:block fixed top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-12 z-50 w-[300px] sm:w-[350px] md:w-[400px] transition-opacity duration-500 ${
            isContactVisible || !skillsContainerVisible ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
          onMouseEnter={handleSkillsEnter}
          onMouseLeave={handleSkillsLeave}
        >
          <div className={`bg-[#EFF2F9] rounded-[20px] p-6 info-detail-box ${skillsContainerVisible ? 'info-detail-box--visible' : ''}`}>
            <SkillsInfo visibleCount={skillsCount} />
          </div>
        </div>
      )}

      <div
        className={`fixed bottom-8 left-4 sm:left-8 md:left-12 z-50 transition-all duration-500 ease-in-out ${
          isContactVisible
            ? 'opacity-0 translate-y-4 pointer-events-none'
            : 'opacity-100 translate-y-0 pointer-events-auto'
        }`}
      >
        <div className="relative">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isContactVisible
                ? 'opacity-0 translate-y-2 scale-95'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="flex flex-col gap-1 items-start text-left">
              <div className="relative">
                <div className="flex items-center gap-2">
                  <h2
                    className={`text-[#6E7F8D] text-xs sm:text-sm md:text-base leading-tight tracking-tight text-left transition-all duration-300 ease-in-out ${
                      isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  >
                    {currentSection.title}
                  </h2>

                  {isModel && (
                    <button
                      className={`hidden lg:inline text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-all duration-300 ${
                        isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                      }`}
                      onMouseEnter={handleSkillsEnter}
                      onMouseLeave={handleSkillsLeave}
                      aria-label="View skills"
                    >
                      {'↗︎'}
                    </button>
                  )}
                </div>
              </div>

              <div className={`flex gap-1 items-start transition-all duration-300 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              } ${
                isExperience || isProjects ? 'flex-col' : 'flex-col sm:flex-row sm:gap-3 flex-wrap'
              }`}>
                {currentSection.items.map((item, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 ease-in-out ${
                      isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                    style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#6E7F8D] text-[10px] sm:text-xs md:text-sm font-semibold leading-tight tracking-tight text-left">
                        {item}
                      </span>

                      {(isExperience || isProjects) && (
                        <div className="flex items-center gap-1">
                          {isProjects && PROJECT_GITHUB_LINKS[item] && (
                            <a
                              href={PROJECT_GITHUB_LINKS[item]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#6E7F8D] hover:text-[#171717] transition-colors duration-200"
                              aria-label={`View ${item} on GitHub`}
                            >
                              <svg className="w-[10px] h-[10px] sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}

                          <button
                            className="hidden lg:inline text-[#6E7F8D] text-[10px] sm:text-xs cursor-pointer select-none hover:text-[#171717] transition-colors duration-200"
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                            aria-label={`View details for ${item}`}
                          >
                            {'↗︎'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
