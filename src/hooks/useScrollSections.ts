import { useState, useEffect, useCallback } from 'react';
import { SectionContent, ScrollPosition } from '@/types/portfolio';
import { SCROLL_THRESHOLDS } from '@/constants/portfolio';

interface UseScrollSectionsReturn {
  currentSection: SectionContent;
  isContactVisible: boolean;
  isTransitioning: boolean;
  scrollPosition: ScrollPosition;
}

export const useScrollSections = (): UseScrollSectionsReturn => {
  const [currentSection, setCurrentSection] = useState<SectionContent>({
    title: "Model: Jiehoon Lee",
    items: [
      "Origin: Miami, FL",
      "Status: Aspiring Software Engineer",
      "Boston University Edition*"
    ]
  });

  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    current: 0,
    previous: 0,
    direction: 'down'
  });

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setScrollPosition(prev => ({
        current: scrollY,
        previous: prev.current,
        direction: scrollY > prev.current ? 'down' : 'up'
      }));

      if (scrollY >= windowHeight * SCROLL_THRESHOLDS.CONTACT_START) {
        setIsContactVisible(true);
        return;
      } else {
        setIsContactVisible(false);
      }
      
      if (scrollY < windowHeight * SCROLL_THRESHOLDS.HERO_END) {
        updateSection({
          title: "Model: Jiehoon Lee",
          items: [
            "Origin: Miami, FL",
            "Status: Aspiring Software Engineer",
            "Boston University Edition*"
          ]
        });
      } else if (scrollY >= windowHeight * SCROLL_THRESHOLDS.HERO_END && scrollY < windowHeight * SCROLL_THRESHOLDS.EXPERIENCE_END) {
        updateSection({
          title: "Experience: Professional Journey",
          items: [
            "Freelance Software Engineer @ Jin Marketing",
            "Web Developer @ Arché Journal",
            "Software Engineer Fellow @ BU Spark! Innovation Program"
          ]
        });
      } else if (scrollY >= windowHeight * SCROLL_THRESHOLDS.EXPERIENCE_END) {
        updateSection({
          title: "Projects: Technical Showcase",
          items: [
            "Docuquery",
            "chatsqrd",
            "NBA Player Stats Predictor",
            "Trellis"
          ]
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateSection]);

  return {
    currentSection,
    isContactVisible,
    isTransitioning,
    scrollPosition
  };
};
