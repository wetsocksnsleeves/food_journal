import React, { useState, useRef, useEffect } from 'react';

export default function HoldDetector({ onHold, children, className, onClick }) {

  const [isHolding, setIsHolding] = useState(false);
  const holdTimeout = useRef(null);

  const handleStart = () => {
    setIsHolding(true);
    holdTimeout.current = setTimeout(() => {
      onHold();

      setIsHolding(false);
    }, 600);
  };

  const handleEnd = () => {

    setIsHolding(false);
    clearTimeout(holdTimeout.current);
  };

  const handleLeave = () => {
    setIsHolding(false);
    clearTimeout(holdTimeout.current);
  };


  useEffect(() => {
    return () => {

      clearTimeout(holdTimeout.current);
    };
  }, []);

  return (

    <div
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleLeave}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd} // Important for touch events

      onTouchMove={handleLeave} // Important for touch events

      onClick={onClick}
      className={className}
      style={{ userSelect: 'none' }}
    >
      {children}
    </div>

  );

}
