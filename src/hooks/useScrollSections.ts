import { useState, useEffect, useCallback } from 'react';
import { SectionContent } from '@/types/portfolio';
import { SCROLL_THRESHOLDS } from '@/constants/portfolio';

interface UseScrollSectionsReturn {
  currentSection: SectionContent;
  isContactVisible: boolean;
  isTransitioning: boolean;
}

export const useScrollSections = (): UseScrollSectionsReturn => {
  const [currentSection, setCurrentSection] = useState<SectionContent>({
    title: "Model: Jiehoon Lee",
    items: [
      "Origin: Miami, FL",
      "Status: SWE @ Tubi",
      "Boston University Edition*"
    ]
  });

  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const updateSection = useCallback((newSection: SectionContent) => {
    if (newSection.title !== currentSection.title) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSection(newSection);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200);
    }
  }, [currentSection.title]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY >= windowHeight * SCROLL_THRESHOLDS.CONTACT_START) {
        setIsContactVisible(true);
        return;
      }

      setIsContactVisible(false);

      if (scrollY < windowHeight * SCROLL_THRESHOLDS.HERO_END) {
        updateSection({
          title: "Model: Jiehoon Lee",
          items: [
            "Origin: Miami, FL",
            "Status: SWE @ Tubi",
            "Boston University Edition*"
          ]
        });
      } else if (scrollY < windowHeight * SCROLL_THRESHOLDS.EXPERIENCE_END) {
        updateSection({
          title: "Experience: Professional Journey",
          items: [
            "Associate Software Engineer @ Tubi",
            "Freelance Software Engineer @ Harvard Street Group",
            "Web Developer @ Arché Journal",
            "Software Engineer Fellow @ BU Spark! Innovation Program"
          ]
        });
      } else {
        updateSection({
          title: "Projects: Technical Showcase",
          items: [
            "docuquery",
            "chatsqrd",
            "NBA Player Stats Predictor",
            "foundry"
          ]
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateSection]);

  return { currentSection, isContactVisible, isTransitioning };
};
