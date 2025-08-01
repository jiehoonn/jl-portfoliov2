/**
 * Custom hook for managing window dimensions
 * Provides responsive window width and height with proper cleanup
 */
import { useState, useEffect } from 'react';
import { WindowDimensions } from '@/types/portfolio';

export const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Function to update window dimensions
    const handleResize = (): void => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
