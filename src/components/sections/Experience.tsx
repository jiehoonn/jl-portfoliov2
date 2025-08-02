'use client';

import { Suspense } from 'react';
import LabubuModel3D from '../models/LabubuModel3D';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import ErrorBoundary from '../common/ErrorBoundary';

function LoadingFallback() {
  return (
    <div className="w-full aspect-square max-w-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>
  );
}

export default function Experience() {
  const { isMobile } = useDeviceDetection();
  
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8 bg-[#EFF2F9]">
      {/* 3D Labubu Model - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <ErrorBoundary fallback={
          <div className="w-full aspect-square max-w-[400px] flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 rounded-lg border-2 border-dashed border-pink-200">
            <div className="text-center p-8">
              <div className="text-6xl mb-4 animate-bounce">🐰</div>
              <p className="text-pink-600 font-medium mb-2">Labubu Model</p>
              <p className="text-gray-500 text-sm">3D model temporarily unavailable</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-3 py-1 text-xs bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        }>
          <Suspense fallback={<LoadingFallback />}>
            <LabubuModel3D isMobile={isMobile} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
