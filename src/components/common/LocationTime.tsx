'use client';

import { useState, useEffect } from 'react';

export default function LocationTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format day of week and time
  const formatDateTime = (date: Date) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    return `${dayOfWeek} ${time}`;
  };

  return (
    <div className="text-right leading-tight">
      <div className="text-[10px] font-semibold text-gray-900" style={{ fontFamily: '"Roboto", serif' }}>
        BOSTON, MA · USA
      </div>
      <div className="text-[10px] font-semibold text-gray-900" style={{ fontFamily: '"Roboto", serif' }}>
        {formatDateTime(currentTime)}
      </div>
    </div>
  );
} 