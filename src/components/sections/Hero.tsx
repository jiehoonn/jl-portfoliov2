'use client';

import { Suspense } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import LegoModel3D from '../models/LegoModel3D';
import ErrorBoundary from '../common/ErrorBoundary';

function LoadingFallback() {
  return (
    <div className="w-full aspect-square max-w-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}

function ModelSelector() {
  const { isMobile, isLowMemory } = useDeviceDetection();
  
  // Always try to load the real model first, but with mobile optimizations
  console.log('Device info:', { isMobile, isLowMemory });
  return <LegoModel3D isMobile={isMobile} isLowMemory={isLowMemory} />;
}

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* 3D Lego Model - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <ErrorBoundary fallback={
          <div className="w-full aspect-square max-w-[400px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-200">
            <div className="text-center p-8">
              <div className="text-6xl mb-4 animate-bounce">🧱</div>
              <p className="text-blue-600 font-medium mb-2">LEGO Model</p>
              <p className="text-gray-500 text-sm">3D model temporarily unavailable</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        }>
          <Suspense fallback={<LoadingFallback />}>
            <ModelSelector />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
