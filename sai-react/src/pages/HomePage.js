import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { getProducts, getCategories } from '../api';
import { HERO_IMAGE, CATEGORY_IMAGES } from '../assets';
import { STATS, COMPANY } from '../data/company';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { ProductGridSkeleton } from '../components/Skeleton';
import usePageMeta from '../usePageMeta';

const WHY = [
  ['01', 'Made in-house', 'From bar stock to certificate — cutting, threading, grinding and lapping all happen on our own floor in Pune.'],
  ['02', 'Octagon LMM 400', 'Every gauge is verified on a length measuring machine in a standard room held at 22 ± 2 °C.'],
  ['03', 'GO / NOGO certified', 'Each gauge ships as a checked GO/NOGO instrument with its identification number etched on the face.'],
  ['04', 'Wide thread coverage', 'Metric, BSP, BSPT, NPT/NPTL, Trapezoidal and ACME — standard sizes and specials.'],
  ['05', 'Non-standard to drawing', 'Send a drawing; we build the gauge to your size and tolerance band.'],
  ['06', 'Direct from the maker', 'You deal with the workshop that makes the gauge — no middlemen on price or lead time.'],
];

const PROC = [['01', 'Cut'], ['02', 'Thread'], ['03', 'Grind'], ['04', 'Lap'], ['05', 'Inspect'], ['06', 'Certify']];
const SPEC_ROWS = [['Thread', 'M2.5 × 0.45 – 6g'], ['GO', 'R2509/12'], ['NOGO', 'R2509/13'], ['Mark', 'SAI']];

export default function HomePage() {
  usePageMeta(
    'SAI Thread Gauges & Tools — Thread Plug & Ring Gauge Manufacturer, Pune',
    'GO/NOGO thread plug, ring, taper and snap gauges plus non-standard gauges, made and calibrated in Pune since 2005.'
  );
  const [featured, setFeatured] = useState(null);
  const [cats, setCats] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    getProducts({ featured: 1 }).then(setFeatured).catch(() => setFeatured([]));
    getCategories().then(setCats).catch(() => setCats([]));
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <motion.span className="eyebrow"
              initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              Precision gauge manufacturer · est. {COMPANY.founded}
            </motion.span>
            <motion.h1 className="hero-title"
              initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
              Thread gauges<br />held to the <em>micron</em>.
            </motion.h1>
            <motion.p className="hero-desc"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              SAI Thread Gauges &amp; Tools makes GO/NOGO thread plug, ring, taper and snap
              gauges for automobile and engineering shops — ground, lapped and calibrated
              in Pune. Standard sizes and one-off specials from a single workshop.
            </motion.p>
            <motion.div className="hero-actions"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Link to="/products" className="btn btn-solid">Browse products →</Link>
              <Link to="/contact" className="btn btn-ghost">Request a quote</Link>
            </motion.div>
          </div>

          <motion.div className="hero-visual"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="hero-photo">
              <img src={HERO_IMAGE} alt="M2.5 × 0.45 GO and NOGO thread ring gauges made by SAI" />
            </div>
            <motion.div className="hero-spec" initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } } }}>
              <motion.div className="hdr" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>Gauge on the bench</motion.div>
              {SPEC_ROWS.map(([k, v]) => (
                <motion.div className="row" key={k}
                  variants={{ hidden: reduce ? {} : { opacity: 0, x: 8 }, show: { opacity: 1, x: 0 } }}>
                  <span>{k}</span><span>{v}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="hero-bottom">
            <div className="hero-callouts">
              {[['± 0.001 mm', 'Working tolerance'], ['22 ± 2 °C', 'Standard room'], ['IS · ISO · BS · ASME', 'Standards']].map(([v, l], i) => (
                <motion.div className="callout" key={l}
                  initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}>
                  <div className="v">{v}</div><div className="l">{l}</div>
                </motion.div>
              ))}
            </div>
            <motion.div className="hero-proof"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.62 }}>
              <span className="proof-dot" />
              <span>Manufactured and inspected in Pune</span>
              <span className="proof-sep" />
              <span>Direct workshop support</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="stripband">
        <div className="wrap">
          <span className="lead">Gauges to</span>
          <span className="std">IS</span><span className="dot">·</span>
          <span className="std">ISO</span><span className="dot">·</span>
          <span className="std">BS</span><span className="dot">·</span>
          <span className="std">ASME</span><span className="dot">·</span>
          <span className="std">DIN</span>
          <span className="lead">&amp; non-standard to drawing</span>
        </div>
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          {STATS.map((s, i) => (
            <motion.div className="stat" key={s.label}
              initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <div className="v">{s.value}</div><div className="l">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal><div className="dimrule">what we make</div>
            <div className="section-head">
              <h2 className="h-section">A gauge for every check.</h2>
              <p className="lead">Five families cover almost every incoming-inspection need on the shop floor.</p>
            </div>
          </Reveal>
          {cats === null ? <ProductGridSkeleton count={3} /> : (
            <div className="grid-cards">
              {cats.map((c, i) => (
                <motion.div key={c.slug}
                  initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}>
                  <Link to={`/products?cat=${c.slug}`} className="pcard category-card">
                    <div className="category-image">
                      <img src={CATEGORY_IMAGES[c.slug] || HERO_IMAGE} alt="" />
                    </div>
                    <div className="pcard-body">
                      <div className="category-meta">
                        <span className="category-index">{String(i + 1).padStart(2, '0')}</span>
                        <span className="eyebrow">{String(c.product_count).padStart(2, '0')} items</span>
                      </div>
                      <h3 className="pcard-name">{c.name}</h3>
                      <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, flex: 1 }}>{c.blurb}</p>
                      <div className="pcard-foot"><span /><span className="pcard-view">Browse →</span></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><div className="dimrule">how a gauge is made</div>
            <div className="section-head"><h2 className="h-section">Bar stock to certificate.</h2></div>
          </Reveal>
          <div className="homeproc">
            {PROC.map(([n, t], i) => (
              <motion.div className="hproc" key={n}
                initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.28) }}>
                <div className="n">{n}</div><div className="t">{t}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><div className="dimrule">on the bench</div>
            <div className="section-head"><h2 className="h-section">Featured gauges.</h2></div>
          </Reveal>
          {featured === null ? <ProductGridSkeleton count={3} /> : (
            <div className="grid-cards">
              {featured.slice(0, 3).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><div className="dimrule">why sai</div>
            <div className="section-head"><h2 className="h-section">Built like a reference standard.</h2></div>
          </Reveal>
          <div className="feature-grid">
            {WHY.map(([n, t, b], i) => (
              <motion.div className="feature" key={n}
                initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}>
                <span className="n">{n}</span><h4>{t}</h4><p>{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <Reveal>
            <h2>Have a drawing? We'll gauge it.</h2>
            <p>Send your size and tolerance — quote back within 24 hours.</p>
          </Reveal>
          <div className="cta-actions">
            <a href={`tel:${COMPANY.phonePrimary}`} className="btn btn-solid">Call +91 {COMPANY.phonePrimary}</a>
            <Link to="/contact" className="btn btn-ghost">Send an enquiry</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
