/**
 * Custom hook for managing scroll-based section visibility
 * Handles smooth scrolling between sections and updates active section state
 */
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Update scroll position state
      setScrollPosition(prev => ({
        current: scrollY,
        previous: prev.current,
        direction: scrollY > prev.current ? 'down' : 'up'
      }));
      
      // Check if Contact section is visible
      if (scrollY >= windowHeight * SCROLL_THRESHOLDS.CONTACT_START) {
        setIsContactVisible(true);
        return;
      } else {
        setIsContactVisible(false);
      }
      
      // Define section thresholds and update active section
      if (scrollY < windowHeight * SCROLL_THRESHOLDS.HERO_END) {
        // Hero section
        updateSection({
          title: "Model: Jiehoon Lee",
          items: [
            "Origin: Miami, FL",
            "Status: Aspiring Software Engineer",
            "Boston University Edition*"
          ]
        });
      } else if (scrollY >= windowHeight * SCROLL_THRESHOLDS.HERO_END && scrollY < windowHeight * SCROLL_THRESHOLDS.EXPERIENCE_END) {
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
      } else if (scrollY >= windowHeight * SCROLL_THRESHOLDS.EXPERIENCE_END) {
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

  return {
    currentSection,
    isContactVisible,
    isTransitioning,
    scrollPosition
  };
};
