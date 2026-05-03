'use client';

import React from 'react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { BREAKPOINTS } from '@/constants/portfolio';

const Logo: React.FC = () => {
  const { width } = useWindowDimensions();

  // Determine display text based on screen width
  const displayText = width <= BREAKPOINTS.MOBILE ? 'jiehoon.' : 'jiehoon lee.';

  return (
    <h1
      className="text-left sm:text-center font-bold pt-4 leading-tight"
      style={{
        color: '#EFF2F9',
        textShadow: '-5px -5px 10px rgba(174, 174, 192, 0.40), 5px 5px 10px #FFF',
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
