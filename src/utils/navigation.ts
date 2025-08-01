/**
 * Navigation utilities
 * Helper functions for smooth scrolling and navigation management
 */

/**
 * Performs smooth scroll to a target element with Lenis integration
 * Falls back to native scrollIntoView if Lenis is not available
 */
export const smoothScrollTo = (targetId: string, offset: number = -100): void => {
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Element with ID "${targetId}" not found`);
    return;
  }

  // Check if Lenis is available globally
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as { lenis?: any }).lenis;
  
  if (lenis) {
    lenis.scrollTo(targetElement, {
      offset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    // Fallback to native smooth scrolling
    const elementPosition = targetElement.offsetTop;
    window.scrollTo({
      top: elementPosition + offset,
      behavior: 'smooth',
    });
  }
};

/**
 * Handles navigation item clicks with smooth scrolling
 */
export const handleNavigationClick = (
  event: React.MouseEvent<HTMLAnchorElement>, 
  href: string, 
  onComplete?: () => void
): void => {
  event.preventDefault();
  
  const targetId = href.replace('#', '');
  smoothScrollTo(targetId);
  
  // Execute callback after a short delay to allow scroll to start
  if (onComplete) {
    setTimeout(onComplete, 100);
  }
};

/**
 * Gets the current active section based on scroll position
 */
export const getActiveSectionId = (): string => {
  const sections = ['hero', 'experience', 'projects', 'contact'];
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i]);
    if (element && scrollY >= element.offsetTop - windowHeight / 2) {
      return sections[i];
    }
  }
  
  return 'hero';
};
