'use client';

import { useState, useEffect } from 'react';
import { Logo, LocationTime } from '@/components';

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
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-6 relative">
            <span
              className={`absolute left-0 w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                isOpen ? 'rotate-45 top-3' : 'top-1'
              }`}
            />
            <span
              className={`absolute left-0 w-6 h-0.5 bg-gray-600 top-3 transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                isOpen ? '-rotate-45 top-3' : 'top-5'
              }`}
            />
          </div>
        </button>
      )}



      {/* Navbar Container */}
      <nav
        className={`fixed left-0 top-0 h-full bg-white border-r border-black z-40 transition-transform duration-300 ease-in-out ${
          isMobile
            ? `w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'w-96 translate-x-0'
        }`}
      >
        {/* Header with Logo and Location/Time */}
        <div className="p-6 flex justify-between items-start">
          <Logo />
          <LocationTime />
        </div>
        {/* Empty navbar container - add your content here */}
      </nav>

      {/* Desktop Content Spacer */}
      {!isMobile && <div className="w-96 flex-shrink-0" />}
    </>
  );
} 