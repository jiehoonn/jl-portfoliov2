'use client';

import LabubuModel3D from '../common/LabubuModel3D';

export default function Experience() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-8 bg-[#EFF2F9]">
      {/* 3D Labubu Model - centered */}
      <div className="flex items-center justify-center w-full max-w-2xl">
        <LabubuModel3D />
      </div>
    </section>
  );
}
