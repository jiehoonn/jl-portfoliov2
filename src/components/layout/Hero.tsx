'use client';

import ModelInfo from './ModelInfo';
import LegoModel3D from '../common/LegoModel3D';

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* 3D Lego Model - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <LegoModel3D />
      </div>

      {/* Model Info - positioned at bottom left */}
      <div className="absolute bottom-8 left-4 sm:left-8 md:left-12">
        <ModelInfo />
      </div>
    </section>
  );
}
