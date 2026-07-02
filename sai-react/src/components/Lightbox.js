import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ src, alt, open, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="lb-overlay" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <button className="lb-close" aria-label="Close" onClick={onClose}>✕</button>
          <motion.img className="lb-img" src={src} alt={alt}
            initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }}
            transition={{ duration: 0.22 }} onClick={e => e.stopPropagation()} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
