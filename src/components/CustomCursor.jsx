import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: mousePosition.x - 15,
        y: mousePosition.y - 15,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%)',
        boxShadow: '0 0 20px rgba(255,215,0,0.5)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default CustomCursor;
