'use client';

import Image from 'next/image';
import ModelInfo from './ModelInfo';

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* Lego Model Image - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <div className="relative w-full aspect-square max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
          <Image
            src="/lego-model-front.png"
            alt="Lego Model - Jiehoon Lee"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Model Info - positioned at bottom left */}
      <div className="absolute bottom-8 left-4 sm:left-8 md:left-12">
        <ModelInfo />
      </div>
    </section>
  );
}
