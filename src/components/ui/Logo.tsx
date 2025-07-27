'use client';

import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayText = windowWidth <= 401 ? 'jiehoon.' : 'jiehoon lee.';

  return (
    <h1 
      className="text-left sm:text-center font-bold pt-4 leading-tight"
      style={{
        color: '#EFF2F9',
        textShadow: '-5px -5px 10px rgba(174, 174, 192, 0.40), 5px 5px 10px #FFF',
        fontFamily: '"Avenir Next"',
        fontSize: '55px',
        fontWeight: 700,
        letterSpacing: '-1px',
      }}
      aria-label="Jiehoon Lee - Portfolio"
    >
      {displayText}
    </h1>
  );
};

export default Logo;
