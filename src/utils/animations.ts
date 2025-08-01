/**
 * Animation utilities
 * Helper functions for consistent animations across the application
 */

/**
 * Creates a staggered animation delay for multiple items
 */
export const getStaggerDelay = (index: number, baseDelay: number = 50): string => {
  return `${index * baseDelay}ms`;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Easing functions for smooth animations
 */
export const easingFunctions = {
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
  easeInOutCubic: (t: number): number => 
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutExpo: (t: number): number => 
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
};

/**
 * Creates CSS transform strings for 3D animations
 */
export const createTransform = (
  x: number = 0,
  y: number = 0,
  z: number = 0,
  rotateX: number = 0,
  rotateY: number = 0,
  rotateZ: number = 0,
  scale: number = 1
): string => {
  return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
};
