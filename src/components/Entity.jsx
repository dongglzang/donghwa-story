import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import DinoModelCanvas from './DinoModelCanvas';

const Entity = ({ story, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const parallaxX = useTransform(springX, [0, window.innerWidth], [-15, 15]);
  const parallaxY = useTransform(springY, [0, window.innerHeight], [-10, 10]);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const walkPath = {
    animate: {
      x: [0, 500, 500, 0, 0],
      scaleX: [1, 1, -1, -1, 1],
    },
    transition: {
      duration: 18,
      repeat: Infinity,
      times: [0, 0.45, 0.5, 0.95, 1],
      ease: 'linear',
    },
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...story.initialPos,
        zIndex: 10,
        x: parallaxX,
        y: parallaxY,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={walkPath.animate}
        transition={walkPath.transition}
        style={{ width: '360px', pointerEvents: 'auto', cursor: 'pointer' }}
        onClick={() => onClick(story)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: '-42px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            padding: '4px 16px',
            borderRadius: '12px',
            fontSize: '0.78rem',
            fontWeight: '400',
            color: '#ffd700',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(255,215,0,0.3)',
            letterSpacing: '1px',
            zIndex: 20,
          }}
        >
          {story.name}
        </motion.div>

        <DinoModelCanvas />
      </motion.div>
    </motion.div>
  );
};

export default Entity;
