import React, { useState, useEffect } from 'react';

function Loader() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 6); // Cycle through 0-5 dots
    }, 500); // Change dots every 500ms

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center">
        <div className="w-10 h-10 border-4 border-orange-300 border-t-orange-500 border-b-orange-500 rounded-full animate-spin mr-4"></div>
        <span className='text-3xl font-bold tracking-wide'>Loading</span>
        <span className="ml-2">
          {Array(dots)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="animate-pulse tracking-widest text-2xl text-black font-bold">
                .
              </span>
            ))}
        </span>
      </div>
    </div>
  );
}

export default Loader;