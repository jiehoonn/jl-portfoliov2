'use client';

import { useState, useEffect } from 'react';
import { Logo, LocationTime, NavLinks } from '@/components';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu when switching to desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <div 
            className="relative w-12 h-12 cursor-pointer group"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <input 
              type="checkbox" 
              checked={isOpen}
              onChange={toggleMenu}
              className="block w-full h-full absolute opacity-0 cursor-pointer z-10"
            />
            <div className="absolute top-0 right-0 left-0 bottom-0 m-auto w-[22px] h-3">
              <span 
                className={`absolute block w-full h-0.5 bg-gray-800 rounded-sm transition-all duration-200 ease-out ${
                  isOpen 
                    ? 'top-[5px] rotate-45' 
                    : 'top-0 group-hover:w-[26px]'
                }`}
                style={{ 
                  transitionTimingFunction: 'cubic-bezier(0.1, 0.82, 0.76, 0.965)' 
                }}
              />
              <span 
                className={`absolute block w-full h-0.5 bg-gray-800 rounded-sm transition-all duration-200 ease-out ${
                  isOpen 
                    ? 'bottom-[5px] -rotate-45' 
                    : 'bottom-0 group-hover:w-3'
                }`}
                style={{ 
                  transitionTimingFunction: 'cubic-bezier(0.1, 0.82, 0.76, 0.965)' 
                }}
              />
            </div>
          </div>
        </div>
      )}



      {/* Navbar Container */}
      <nav
        className={`fixed left-0 top-0 h-full bg-white border-r border-black z-40 transition-transform duration-300 ease-in-out ${
          isMobile
            ? `w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'w-96 translate-x-0'
        } flex flex-col`}
      >
        {/* Header with Logo and Location/Time */}
        <div className="p-6">
          {isMobile ? (
            // Mobile layout: Logo on top right, LocationTime below it
            <div className="flex justify-end">
              <div className="flex flex-col items-end space-y-2">
                <Logo />
                <LocationTime />
              </div>
            </div>
          ) : (
            // Desktop layout: Logo on left, LocationTime on right
            <div className="flex justify-between items-start">
              <Logo />
              <LocationTime />
            </div>
          )}
        </div>
        
                {/* Spacer to push nav links to bottom */}
        <div className="flex-1"></div>
        
        {/* Navigation Links */}
        <NavLinks />
      </nav>

      {/* Desktop Content Spacer */}
      {!isMobile && <div className="w-96 flex-shrink-0" />}
    </>
  );
} 