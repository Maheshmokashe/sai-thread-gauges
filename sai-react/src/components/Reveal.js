import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Subtle scroll-reveal used across the site. Respects reduced-motion.
export default function Reveal({ children, delay = 0, y = 16, className, style }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
