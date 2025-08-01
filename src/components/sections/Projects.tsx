'use client';

import BabyMiloModel3D from '../models/BabyMiloModel3D';

export default function Projects() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8 bg-[#EFF2F9]">
      {/* 3D Baby Milo Model - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <BabyMiloModel3D />
      </div>
    </section>
  );
}
