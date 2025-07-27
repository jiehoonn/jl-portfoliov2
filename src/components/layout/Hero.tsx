'use client';

import Image from 'next/image';
import { useState } from 'react';
import StudentInfo from './StudentInfo';
import SkillsInfo from './SkillsInfo';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen flex items-center px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <div 
              className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Front image */}
              <Image
                src="/lego-model-front.png"
                alt="Lego Model Front"
                width={600}
                height={600}
                className={`w-full h-auto object-contain transition-opacity duration-500 ease-in-out ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                }`}
                priority
              />
              {/* Back image */}
              <Image
                src="/lego-model-back.png"
                alt="Lego Model Back"
                width={600}
                height={600}
                className={`w-full h-auto object-contain transition-opacity duration-500 ease-in-out absolute inset-0 translate-y-2 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="order-2 lg:order-2">
            <div className="flex flex-col gap-6 lg:gap-8">
              <StudentInfo />
              <SkillsInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
