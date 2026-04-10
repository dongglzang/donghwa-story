import React, { useState, useEffect } from 'react';

const InteractiveOverlay = () => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const newRipple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: '100px',
            height: '100px'
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveOverlay;
