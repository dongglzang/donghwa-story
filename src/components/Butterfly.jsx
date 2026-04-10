import React from 'react';
import { motion } from 'framer-motion';

const Butterfly = () => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        zIndex: 8,
        width: '100px',
        pointerEvents: 'none',
      }}
      initial={{ x: -100, y: 100, opacity: 0 }}
      animate={{
        x: [window.innerWidth + 100, -100],
        y: [
          100, 50, 150, 20, 200, 
        ],
        opacity: [0, 1, 1, 1, 0]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <motion.img
        src="/assets/butterfly.png"
        alt="Butterfly"
        style={{
          width: '100%',
          filter: 'url(#chromaKey) contrast(1.2) drop-shadow(0 0 10px rgba(255,215,0,0.3))',
        }}
        animate={{
          scaleY: [1, 0.3, 1], // Flapping wings effect
          rotateZ: [10, -10, 10] // Slight wobble
        }}
        transition={{
          scaleY: { duration: 0.3, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </motion.div>
  );
};

export default Butterfly;
