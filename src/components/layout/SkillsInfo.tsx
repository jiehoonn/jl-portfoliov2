'use client';

import React from 'react';
import Image from 'next/image';

// TypeScript interface for type safety
interface Skill {
  name: string;
  icon: string;
}

export default function SkillsInfo() {
  const skills: Skill[] = [
    { name: 'React', icon: '/skill-icons/react-icon.png' },
    { name: 'TypeScript', icon: '/skill-icons/typescript-icon.png' },
    { name: 'JavaScript', icon: '/skill-icons/javascript-icon.png' },
    { name: 'Python', icon: '/skill-icons/python-icon.png' },
    { name: 'Node.js', icon: '/skill-icons/node-icon.png' },
    { name: 'Java', icon: '/skill-icons/java-icon.png' },
    { name: 'Express', icon: '/skill-icons/express-icon.png' },
    { name: 'Flask', icon: '/skill-icons/flask-icon.png' },
    { name: 'MongoDB', icon: '/skill-icons/mongoDB-icon.png' },
    { name: 'SQL', icon: '/skill-icons/sql-icon.png' },
    { name: 'Firebase', icon: '/skill-icons/firebase-icon.png' },
    { name: 'AWS', icon: '/skill-icons/aws-icon.png' },
    { name: 'Docker', icon: '/skill-icons/docker-icon.png' },
    { name: 'Git', icon: '/skill-icons/git-icon.png' },
    { name: 'Figma', icon: '/skill-icons/figma-icon.png' },
    { name: 'Jira', icon: '/skill-icons/jira-icon.png' },
    { name: 'Agile', icon: '/skill-icons/agile-icon.png' },
    { name: 'Vercel', icon: '/skill-icons/vercel-icon.png' },
    { name: 'Pandas', icon: '/skill-icons/pandas-icon.png' },
    { name: 'NumPy', icon: '/skill-icons/numpy-icon.png' },
    { name: 'Matplotlib', icon: '/skill-icons/matplotlib-icon.png' },
    { name: 'BeautifulSoup', icon: '/skill-icons/beautifulsoup-icon.png' },
  ];

  return (
    <div className="grid gap-2 lg:gap-3 self-stretch grid-cols-[repeat(auto-fit,minmax(50px,1fr))]">
      {skills.map((skill: Skill) => (
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
          />
        </div>
      ))}
    </div>
  );
} 