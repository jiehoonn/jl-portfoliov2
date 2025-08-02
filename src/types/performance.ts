// Performance API with memory extension
export interface PerformanceWithMemory extends Performance {
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

// Check if performance has memory property
export function hasMemory(performance: Performance): performance is PerformanceWithMemory {
  return 'memory' in performance;
}

// Window with Lenis extension
export interface WindowWithLenis extends Window {
  lenis?: unknown; // Lenis doesn't export proper types
}
