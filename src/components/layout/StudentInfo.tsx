'use client';

import React from 'react';

export default function StudentInfo() {
  return (
    <div className="flex flex-col items-start gap-2.5 p-6 rounded-[58px] bg-[#EFF2F9] neumorphism flex-shrink-0 self-stretch">
      <div className="flex flex-col justify-center items-start gap-7 w-full max-w-[557px]">
        {/* Main title */}
        <h1 
          className="self-stretch text-[#6E7F8D] text-[32px] font-normal leading-normal tracking-[-1.6px]"
          style={{ fontFamily: 'Montserrat' }}
        >
          CS @ Boston University
        </h1>
        
        {/* Bottom text container */}
        <div className="self-stretch">
          <p 
            className="text-[#6E7F8D] text-[24px] font-normal leading-normal tracking-[-1.2px] mb-1"
            style={{ fontFamily: 'Montserrat' }}
          >
            Aspiring Software Engineer
          </p>
          <p 
            className="text-[#6E7F8D] text-[16px] font-normal leading-normal tracking-[-0.8px]"
            style={{ fontFamily: 'Montserrat' }}
          >
            Graduation Date: January &apos;26
          </p>
        </div>
      </div>
    </div>
  );
} 