/**
 * Contact Component
 * 
 * Displays contact information and social media links.
 * Features:
 * - Centered neumorphic design
 * - Social media icons with hover effects
 * - Proper accessibility with ARIA labels
 * - Responsive grid layout
 * - External link handling
 * 
 * @component
 */

'use client';

import React from 'react';
import { CONTACT_INFO } from '@/constants/portfolio';
import { ContactLink } from '@/types/portfolio';

export default function Contact() {
  // Contact links with icons
  const contactLinks: ContactLink[] = [
    {
      name: 'LinkedIn',
      url: CONTACT_INFO.linkedin,
      icon: (
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="text-[#6E7F8D]"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: CONTACT_INFO.github,
      icon: (
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="text-[#6E7F8D]"
          aria-hidden="true"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'Gmail',
      url: `mailto:${CONTACT_INFO.email}`,
      icon: (
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="text-[#6E7F8D]"
          aria-hidden="true"
        >
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        </svg>
      ),
    },
  ];

  return (
    <section 
      className="px-6 py-16 pb-32 lg:px-20 lg:py-24 lg:pb-40 min-h-screen flex items-center"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <h2 
          id="contact-title"
          className="text-[#6E7F8D] text-[48px] lg:text-[64px] font-normal leading-normal tracking-[-2.4px] lg:tracking-[-3.2px] text-center mb-12 lg:mb-16 text-neumorphism"
          style={{ fontFamily: 'Montserrat' }}
        >
          Let&apos;s Connect
        </h2>
        
        {/* Centered Container with Neumorphic Styling */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-8 p-8 lg:p-12 rounded-[58px] bg-[#EFF2F9] neumorphism max-w-2xl w-full">
            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 w-full max-w-lg">
              {contactLinks.map((contact: ContactLink) => (
                <a
                  key={contact.name}
                  href={contact.url}
                  target={contact.name === 'Gmail' ? '_self' : '_blank'}
                  rel={contact.name === 'Gmail' ? undefined : 'noopener noreferrer'}
                  className="flex items-center justify-center aspect-square p-6 rounded-[25px] bg-[#EFF2F9] neumorphism transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6E7F8D] focus:ring-opacity-50"
                  aria-label={`Contact via ${contact.name}`}
                >
                  {contact.icon}
                </a>
              ))}
            </div>
            
            {/* Contact Message */}
            <p 
              className="text-[#6E7F8D] text-[18px] lg:text-[20px] font-normal leading-normal tracking-[-0.9px] lg:tracking-[-1px] text-center max-w-md"
              style={{ fontFamily: 'Montserrat' }}
            >
              Feel free to reach out for opportunities, collaborations, or just to say hello!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
