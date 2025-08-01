/**
 * HamburgerMenu Component
 * 
 * A responsive hamburger menu component that provides navigation for the portfolio.
 * Features:
 * - Responsive design with different layouts for mobile and desktop
 * - Smooth animations and transitions
 * - Accessibility support with proper ARIA labels
 * - Integration with Lenis smooth scrolling
 * - Click outside to close functionality
 * 
 * @component
 */

"use client"

import React, { useState, useRef } from 'react';
import { NAVIGATION_ITEMS } from '@/constants/portfolio';
import { NavigationItem } from '@/types/portfolio';
import { useClickOutside } from '@/hooks/useClickOutside';
import { handleNavigationClick } from '@/utils/navigation';

interface MenuItemsProps {
  isOpen: boolean;
  onItemClick: () => void;
  direction: 'vertical' | 'horizontal';
}

/**
 * MenuItems sub-component
 * Renders navigation items with different layouts based on direction
 */
const MenuItems: React.FC<MenuItemsProps> = ({ isOpen, onItemClick, direction }) => {
  const isVertical = direction === 'vertical';
  const translateClass = isVertical 
    ? (isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
    : (isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0');
  
  const containerClass = isVertical 
    ? 'flex flex-col items-end gap-3'
    : 'flex flex-row whitespace-nowrap items-center gap-6 pr-5';

  /**
   * Handles menu item click with smooth scrolling
   */
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavigationClick(e, href, onItemClick);
  };

  return (
    <div className={containerClass} role="menu">
      {NAVIGATION_ITEMS.map((item: NavigationItem, index: number) => (
        <a
          key={item.href}
          href={item.href}
          role="menuitem"
          className={`px-2 py-1 text-sm text-gray-800 rounded-lg transition-all duration-500 transform cursor-pointer hover:bg-gray-100 ${translateClass}`}
          style={{
            transitionDelay: isOpen ? `${150 + index * 150}ms` : '0ms',
            fontFamily: 'Montserrat'
          }}
          onClick={(e) => handleItemClick(e, item.href)}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

/**
 * Main HamburgerMenu component
 * Manages menu state and renders hamburger icon with menu items
 */
const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Toggles menu open/closed state
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Closes the menu
   */
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle click outside and escape key to close menu
  useClickOutside({
    ref: menuRef,
    callback: closeMenu,
    enabled: isOpen
  });

  return (
    <div className="relative" ref={menuRef}>
      <button 
        ref={buttonRef}
        className="cursor-pointer relative group"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="hamburger-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {/* Small screens (626px and below) - icon only */}
        <div className="sm:hidden">
          <div className="relative flex flex-col overflow-hidden items-center justify-center w-[50px] h-[50px] transform transition-all duration-200">
            <div className={`transform transition-all duration-150 overflow-hidden ${isOpen ? 'translate-y-3' : '-translate-y-8'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isOpen ? 'animate-bounce' : ''}`} fill="none" viewBox="0 0 24 24" stroke="var(--hamburger-color)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="flex flex-col justify-between w-[20px] h-[12px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-3">
              <div 
                className={`h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? 'translate-y-6' : ''}`}
                style={{ backgroundColor: 'var(--hamburger-color)' }}
              ></div>
              <div 
                className={`h-[2px] w-7 rounded transform transition-all duration-300 delay-75 ${isOpen ? 'translate-y-6' : ''}`}
                style={{ backgroundColor: 'var(--hamburger-color)' }}
              ></div>
              <div 
                className={`h-[2px] w-7 transform transition-all duration-300 origin-left delay-100 ${isOpen ? 'translate-y-6' : ''}`}
                style={{ backgroundColor: 'var(--hamburger-color)' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Larger screens - original hamburger design */}
        <div className="hidden sm:block">
          <div className={`flex flex-col pt-1 justify-between w-[20px] h-[20px] transform transition-all duration-200 origin-center overflow-hidden ${isOpen ? 'rotate-90' : ''}`}>
            <div 
              className={`h-[2px] w-6 transform transition-all duration-400 delay-75 ${isOpen ? 'w-0 opacity-0' : ''}`}
              style={{ backgroundColor: 'var(--hamburger-color)' }}
            ></div>
            <div 
              className={`h-[2px] w-6 rounded transform transition-all duration-400 delay-75 ${isOpen ? 'w-0 opacity-0' : ''}`}
              style={{ backgroundColor: 'var(--hamburger-color)' }}
            ></div>
            <div 
              className={`h-[2px] w-6 transform transition-all duration-400 delay-75 ${isOpen ? 'w-0 opacity-0' : ''}`}
              style={{ backgroundColor: 'var(--hamburger-color)' }}
            ></div>
            <div className={`w-0 h-0 overflow-hidden transform transition-all duration-400 delay-150 ${isOpen ? 'w-12 h-12 -mt-2' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="var(--hamburger-color)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      
      {/* Small screens - vertical menu below icon */}
      <div 
        className={`sm:hidden absolute top-16 right-0 z-50 transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        <MenuItems 
          isOpen={isOpen} 
          onItemClick={closeMenu} 
          direction="vertical" 
        />
      </div>

      {/* Larger screens - horizontal menu to the left */}
      <div 
        className={`hidden sm:block absolute top-1/2 z-50 transition-all duration-500 ease-out overflow-hidden ${
          isOpen ? 'right-8 opacity-100 w-auto' : 'right-0 opacity-0 w-0'
        }`}
        style={{ transform: 'translateY(-50%) translateY(8px)' }}
        role="navigation"
        aria-label="Desktop navigation menu"
      >
        <MenuItems 
          isOpen={isOpen} 
          onItemClick={closeMenu} 
          direction="horizontal" 
        />
      </div>
    </div>
  );
};

export default HamburgerMenu;
