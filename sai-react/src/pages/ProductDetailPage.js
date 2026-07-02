import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, getProducts } from '../api';
import { productImage } from '../assets';
import { COMPANY } from '../data/company';
import Reveal from '../components/Reveal';
import Lightbox from '../components/Lightbox';
import usePageMeta from '../usePageMeta';

const STANDARD_LABEL = {
  IS: 'IS (Indian Standard)', ISO: 'ISO', BS: 'BS (British Standard)',
  ASME: 'ASME (American)', DIN: 'DIN (German)', CUSTOM: 'Non-standard',
};

function ThreadDiagram({ label }) {
  return (
    <div className="detail-thread">
      <div className="cap">Thread profile · 60° form</div>
      <svg viewBox="0 0 520 130" role="img" aria-label="Thread profile diagram">
        <path className="tf-line" d="M20,100 L70,34 L120,100 L170,34 L220,100 L270,34 L320,100 L370,34 L420,100 L470,34" />
        <line className="tf-dim" x1="70" y1="20" x2="170" y2="20" />
        <line className="tf-dim" x1="70" y1="14" x2="70" y2="26" />
        <line className="tf-dim" x1="170" y1="14" x2="170" y2="26" />
        <text className="tf-txt mark" x="98" y="12">PITCH</text>
        <text className="tf-txt" x="210" y="122">{label}</text>
      </svg>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [err, setErr] = useState(false);
  const [all, setAll] = useState([]);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setP(null); setErr(false); setZoom(false);
    getProduct(slug).then(setP).catch(() => setErr(true));
  }, [slug]);

  useEffect(() => { getProducts().then(setAll).catch(() => setAll([])); }, []);

  usePageMeta(p ? `${p.name} — SAI Thread Gauges` : 'Gauge — SAI Thread Gauges', p && p.summary);

  if (err) return (
    <main className="wrap detail">
      <div className="empty">That gauge could not be found. <Link to="/products" className="pcard-view">Back to products →</Link></div>
    </main>
  );
  if (!p) return <main className="wrap detail"><div className="empty">Loading…</div></main>;

  const rows = [
    ['Category', p.category_name], ['Thread / size', p.thread_size], ['Class', p.thread_class],
    ['Standard', STANDARD_LABEL[p.standard] || p.standard], ['Standard ref.', p.standard_ref],
    ['GO no.', p.go_id], ['NOGO no.', p.nogo_id], ['Material', p.material],
    ['Hardness', p.hardness], ['Finish', p.finish], ['Calibration', p.calibration],
  ].filter(([, v]) => v);

  const img = productImage(p);
  const waText = encodeURIComponent(`Hello SAI, I'd like a quote for: ${p.name} (${p.thread_size || 'custom'}).`);

  const idx = all.findIndex(x => x.slug === p.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  const showThread = p.standard !== 'CUSTOM';

  return (
    <main>
      <div className="wrap detail">
        <Link to="/products" className="back-link">← All products</Link>
        <div className="detail-grid" style={{ marginTop: 18 }}>
          <Reveal>
            <div className="detail-img" onClick={() => setZoom(true)} role="button" tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setZoom(true)}>
              <img src={img} alt={p.name} />
              <span className="zoom-hint">Click to zoom</span>
            </div>
            {showThread && <ThreadDiagram label={p.thread_size ? `${p.thread_size} · ${p.thread_class || ''}`.trim() : '60° flank angle'} />}
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">{p.category_name}</span>
            <h1>{p.name}</h1>
            <p className="detail-lead">{p.description || p.summary}</p>

            <div className="pcard-chips" style={{ marginTop: 18 }}>
              {p.go_id && <span className="chip chip-go">GO {p.go_id}</span>}
              {p.nogo_id && <span className="chip chip-nogo">NOGO {p.nogo_id}</span>}
            </div>

            <div className="cert">
              <div className="cert-head">
                <span className="t">Specification</span>
                <span className="stamp">✓ GO / NOGO checked</span>
              </div>
              <div className="spec-table">
                {rows.map(([k, v]) => (
                  <div className="r" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
                ))}
              </div>
            </div>

            <div className="gonogo-note">
              <div className="gnc go">
                <span className="lbl">GO side</span>
                <p>Must thread on fully — confirms the part is within the maximum-material limit.</p>
              </div>
              <div className="gnc nogo">
                <span className="lbl">NOGO side</span>
                <p>Must not thread on past a turn or two — confirms the part isn't oversized.</p>
              </div>
            </div>

            <div className="detail-actions">
              <Link to={`/contact?product=${encodeURIComponent(p.name)}`} className="btn btn-solid">Request a quote →</Link>
              <a href={`https://wa.me/${COMPANY.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {(prev || next) && (
          <div className="detail-nav">
            {prev ? <Link to={`/products/${prev.slug}`}><span className="lbl">← Previous</span>{prev.name}</Link> : <span />}
            {next ? <Link to={`/products/${next.slug}`} style={{ textAlign: 'right' }}><span className="lbl">Next →</span>{next.name}</Link> : <span />}
          </div>
        )}
      </div>

      <Lightbox src={img} alt={p.name} open={zoom} onClose={() => setZoom(false)} />
    </main>
  );
}