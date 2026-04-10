import React from 'react';
import { motion } from 'framer-motion';

const Fireflies = () => {
  const numFlies = 25; // Number of fireflies
  const flies = Array.from({ length: numFlies });

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {flies.map((_, i) => {
        const top = Math.random() * 100 + '%';
        const left = Math.random() * 100 + '%';
        const duration = Math.random() * 5 + 5; // 5 to 10 seconds
        const delay = Math.random() * 5;
        const size = Math.random() * 4 + 2; // 2px to 6px

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0, 0.5, 0],
              scale: [0, 1, 0.5, 1, 0],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [0, Math.random() * -100 - 50, Math.random() * -100 - 50]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: top,
              left: left,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: '#FFD700',
              borderRadius: '50%',
              boxShadow: `0 0 ${size * 2}px #FFD700, 0 0 ${size * 4}px rgba(255,215,0,0.5)`,
              filter: 'blur(1px)'
            }}
          />
        );
      })}
    </div>
  );
};

export default Fireflies;
