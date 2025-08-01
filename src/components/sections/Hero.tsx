'use client';

import LegoModel3D from '../models/LegoModel3D';

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* 3D Lego Model - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <LegoModel3D />
      </div>
    </section>
  );
}
