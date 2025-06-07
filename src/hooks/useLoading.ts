import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  duration?: number;
  autoStart?: boolean;
}

export const useLoading = ({
  duration = 2500,
  autoStart = true
}: UseLoadingOptions = {}) => {
  const [isLoading, setIsLoading] = useState(autoStart);

  useEffect(() => {
    if (!autoStart) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, autoStart]);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading
  };
}; 