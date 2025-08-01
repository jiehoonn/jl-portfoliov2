/**
 * SkillsInfo Component
 * 
 * Displays a grid of technology skills with icons and proper accessibility.
 * Features:
 * - Responsive grid layout with auto-fit columns
 * - Neumorphic design matching the portfolio theme
 * - Optimized images with proper alt text
 * - Type-safe skill data from constants
 * 
 * @component
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { SKILLS } from '@/constants/portfolio';
import { Skill } from '@/types/portfolio';

export default function SkillsInfo() {
  return (
    <div className="grid gap-2 lg:gap-3 self-stretch grid-cols-[repeat(auto-fit,minmax(50px,1fr))]">
      {SKILLS.map((skill: Skill) => (
        <div
          key={skill.name}
          className="flex items-center justify-center aspect-square p-1.5 rounded-[15px] bg-[#EFF2F9] neumorphism"
          role="img"
          aria-label={`${skill.name} technology skill`}
        >
          <Image
            src={skill.icon}
            alt={`${skill.name} programming technology icon`}
            width={40}
            height={40}
            className="w-full h-full object-contain flex-shrink-0"
            priority={false}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
} 