import React from 'react';

const Logo: React.FC = () => {
  return (
    <h1 
      className="text-center font-bold pt-4"
      style={{
        color: '#EFF2F9',
        textShadow: '-5px -5px 10px rgba(174, 174, 192, 0.40), 5px 5px 10px #FFF',
        fontFamily: '"Avenir Next"',
        fontSize: '45px',
        fontWeight: 700,
        letterSpacing: '-1px',
      }}
      aria-label="Jiehoon Lee - Portfolio"
    >
      jiehoon lee.
    </h1>
  );
};

export default Logo;
