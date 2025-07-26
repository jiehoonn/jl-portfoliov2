import React from 'react';
import Logo from './Logo';
import HamburgerMenu from './HamburgerMenu';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center w-full pt-2 pb-5 pl-8 pr-4 bg-background">
      {/* Mobile: logo left, hamburger right */}
      <div className="flex justify-between items-center w-full lg:hidden">
        <Logo />
        <HamburgerMenu />
      </div>
      
      {/* Desktop: logo centered, hamburger right */}
      <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-full lg:relative">
        <Logo />
        <div className="absolute right-0">
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
