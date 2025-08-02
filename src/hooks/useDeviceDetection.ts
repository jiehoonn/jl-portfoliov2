'use client';

import { useState, useEffect } from 'react';
import { hasMemory } from '@/types/performance';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowMemory: boolean;
  userAgent: string;
  platform: string;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowMemory: false,
    userAgent: '',
    platform: '',
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    // Memory detection (Chrome only)
    const memory = hasMemory(performance) ? performance.memory : null;
    const isLowMemory = memory ? memory.jsHeapSizeLimit < 2000000000 : false; // Less than 2GB
    
    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      isLowMemory,
      userAgent,
      platform,
      memory: memory ? {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      } : undefined,
    });

    // Log device info for debugging
    console.log('Device Info:', {
      isMobile,
      isTablet,
      isDesktop,
      isLowMemory,
      userAgent,
      platform,
      memory,
    });
  }, []);

  return deviceInfo;
}
