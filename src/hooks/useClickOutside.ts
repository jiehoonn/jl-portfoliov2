/**
 * Custom hook for managing click outside behavior
 * Handles closing modals, dropdowns, and other overlay components
 */
import { useEffect, RefObject } from 'react';

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement | null>;
  callback: () => void;
  enabled?: boolean;
}

export const useClickOutside = ({ ref, callback, enabled = true }: UseClickOutsideProps): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref, callback, enabled]);
};
