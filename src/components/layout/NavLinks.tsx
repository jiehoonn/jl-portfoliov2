'use client';

export default function NavLinks() {
  return (
    <div className="p-6 pb-18 space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <a 
            href="#work" 
            className="inline-block text-gray-500 hover:text-black transition-colors duration-200 text-3xl font-medium"
            style={{ fontFamily: '"Roboto", sans-serif' }}
          >
            Work
          </a>
          <div className="text-right text-gray-500 hover:text-black transition-colors duration-200 text-[10px] leading-tight" style={{ fontFamily: '"Roboto", sans-serif' }}>
            <div>SEE MY GROWTH</div>
            <div>OVER TIME</div>
          </div>
        </div>
        <div className="h-px bg-gray-300"></div>
        <div className="flex justify-between items-center">
          <a 
            href="#profile" 
            className="inline-block text-gray-500 hover:text-black transition-colors duration-200 text-3xl font-medium"
            style={{ fontFamily: '"Roboto", sans-serif' }}
          >
            Profile
          </a>
          <div className="text-right text-gray-500 hover:text-black transition-colors duration-200 text-[10px] leading-tight" style={{ fontFamily: '"Roboto", sans-serif' }}>
            <div>LEARN ABOUT</div>
            <div>WHO I AM</div>
          </div>
        </div>
        <div className="h-px bg-gray-300"></div>
        <div className="flex justify-between items-center">
          <a 
            href="#contact" 
            className="inline-block text-gray-500 hover:text-black transition-colors duration-200 text-3xl font-medium"
            style={{ fontFamily: '"Roboto", sans-serif' }}
          >
            Contact
          </a>
          <div className="text-right text-gray-500 hover:text-black transition-colors duration-200 text-[10px] leading-tight" style={{ fontFamily: '"Roboto", sans-serif' }}>
            <div>REACH OUT, SAY HI.</div>
            <div>LET'S WORK TOGETHER</div>
          </div>
        </div>
        <div className="h-px bg-gray-300"></div>
      </div>
    </div>
  );
} 