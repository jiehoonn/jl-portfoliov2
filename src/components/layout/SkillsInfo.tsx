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
    <div className="flex flex-col items-start gap-2.5 p-6 lg:p-8 rounded-[50px] bg-[#EFF2F9] neumorphism flex-shrink-0 self-stretch">
      <div className="flex flex-col items-start w-full">
        {/* Skills Title */}
        <h2 
          className="self-stretch mb-1 -mt-5"
          style={{ 
            color: '#EFF2F9',
            textShadow: '-5px -5px 10px rgba(174, 174, 192, 0.40), 5px 5px 10px #FFF',
            fontFamily: 'Avenir Next',
            fontSize: '80px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            letterSpacing: '-4.8px'
          }}
        >
          Skills
        </h2>
        
        {/* Skills Grid */}
        <div className="grid gap-3 lg:gap-4 self-stretch grid-cols-[repeat(auto-fit,minmax(75px,1fr))]">
          {skills.map((skill: Skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-center aspect-square p-2 rounded-[20px] bg-[#EFF2F9] neumorphism"
              role="img"
              aria-label={`${skill.name} technology skill`}
            >
              <Image
                src={skill.icon}
                alt={`${skill.name} programming technology icon`}
                width={61}
                height={61}
                className="w-full h-full object-contain flex-shrink-0"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 