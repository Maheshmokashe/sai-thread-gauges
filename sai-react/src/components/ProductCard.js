import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { productImage } from '../assets';

export default function ProductCard({ product, index = 0 }) {
  const img = productImage(product);
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link to={`/products/${product.slug}`} className="pcard">
        <div className="pcard-img">
          <span className="pcard-cat">{product.category_name}</span>
          <img src={img} alt={product.name} loading="lazy" />
        </div>
        <div className="pcard-body">
          <h3 className="pcard-name">{product.name}</h3>
          <div className="pcard-specs">
            {product.thread_size && <span><b>{product.thread_size}</b></span>}
            {product.thread_class && <span>class {product.thread_class}</span>}
            {product.standard_ref && <span>{product.standard_ref}</span>}
          </div>
          <div className="pcard-foot">
            <div className="pcard-chips">
              {product.go_id && <span className="chip chip-go">GO</span>}
              {(product.nogo_id || product.go_id) && <span className="chip chip-nogo">NOGO</span>}
            </div>
            <span className="pcard-view">View spec →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
