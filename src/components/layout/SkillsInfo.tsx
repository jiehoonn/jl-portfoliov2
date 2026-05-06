'use client';

import React from 'react';
import Image from 'next/image';
import { SKILLS } from '@/constants/portfolio';
import { Skill } from '@/types/portfolio';

interface SkillsInfoProps {
  visibleCount: number;
}

export default function SkillsInfo({ visibleCount }: SkillsInfoProps) {
  return (
    <div className="grid gap-2 lg:gap-3 self-stretch grid-cols-[repeat(auto-fit,minmax(50px,1fr))]">
      {SKILLS.map((skill: Skill, index: number) => (
        <div
          key={skill.name}
          className="flex items-center justify-center aspect-square p-1.5 rounded-[15px] bg-[#EFF2F9] neumorphism transition-opacity duration-500"
          style={{ opacity: index < visibleCount ? 1 : 0 }}
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