'use client';

import React from 'react';

export default function ModelInfo() {
  return (
    <div className="flex flex-col gap-1 items-start text-left">
      {/* Title */}
      <h2 
        className="text-[#6E7F8D] text-xs sm:text-sm md:text-base leading-tight tracking-tight text-left"
        style={{ fontFamily: 'Montserrat' }}
      >
        Model: <span className="font-semibold"> Jiehoon Lee</span>
      </h2>
      
      {/* Info items in a row */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-start">
        <span 
          className="text-[#6E7F8D] text-[10px] sm:text-xs md:text-sm font-normal leading-tight tracking-tight text-left"
          style={{ fontFamily: 'Montserrat' }}
        >
          Origin: <span className="font-semibold">Miami, FL</span>
        </span>
        <span 
          className="text-[#6E7F8D] text-[10px] sm:text-xs md:text-sm font-normal leading-tight tracking-tight text-left"
          style={{ fontFamily: 'Montserrat' }}
        >
          Status: <span className="font-semibold">Aspiring Software Engineer</span>
        </span>
        <span 
          className="text-[#6E7F8D] text-[10px] sm:text-xs md:text-sm font-normal leading-tight tracking-tight text-left"
          style={{ fontFamily: 'Montserrat' }}
        >
          <span className="font-semibold">Boston University Edition*</span>
        </span>
      </div>
    </div>
  );
}
