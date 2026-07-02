import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../api';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { ProductGridSkeleton } from '../components/Skeleton';
import usePageMeta from '../usePageMeta';

const SORTS = {
  featured: 'Featured first',
  az: 'Name A–Z',
  za: 'Name Z–A',
};

export default function ProductsPage() {
  usePageMeta(
    'Products — SAI Thread Gauges & Tools',
    'Thread plug, ring, taper (BSPT/NPT), snap and non-standard gauges manufactured by SAI Thread Gauges & Tools, Pune.'
  );
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('cat') || 'all';
  const [products, setProducts] = useState(null);
  const [cats, setCats] = useState([]);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');

  useEffect(() => { getCategories().then(setCats).catch(() => {}); }, []);

  useEffect(() => {
    setProducts(null);
    const p = activeCat === 'all' ? {} : { category: activeCat };
    getProducts(p).then(setProducts).catch(() => setProducts([]));
  }, [activeCat]);

  const totalCount = cats.reduce((n, c) => n + (c.product_count || 0), 0);
  const activeCategory = cats.find(c => c.slug === activeCat);

  const shown = useMemo(() => {
    if (!products) return [];
    const term = q.trim().toLowerCase();
    let list = !term ? products : products.filter(p =>
      [p.name, p.thread_size, p.go_id, p.nogo_id, p.standard_ref, p.summary]
        .filter(Boolean).join(' ').toLowerCase().includes(term));
    list = [...list];
    if (sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'za') list.sort((a, b) => b.name.localeCompare(a.name));
    else list.sort((a, b) => (b.is_featured === a.is_featured ? a.name.localeCompare(b.name) : b.is_featured - a.is_featured));
    return list;
  }, [products, q, sort]);

  const setCat = (slug) => setParams(slug === 'all' ? {} : { cat: slug });

  return (
    <main>
      <div className="page-head">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Product catalogue</span>
            <h1>GO / NOGO gauges, ready to inspect.</h1>
            <p>Every gauge is ground, lapped and checked in-house. Tap a family or search by size or gauge number.</p>
            <div className="cat-index">
              <span className="x"><b>{String(totalCount || 0).padStart(2, '0')}</b> gauges</span>
              <span className="x"><b>{String(cats.length || 0).padStart(2, '0')}</b> families</span>
              <span className="x">standards <b>IS · ISO · BS · ASME</b></span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="wrap products-layout">
        <div className="filter-bar">
          <button className={`filter-btn ${activeCat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>
            All<span className="ct">{totalCount || ''}</span>
          </button>
          {cats.map(c => (
            <button key={c.slug} className={`filter-btn ${activeCat === c.slug ? 'active' : ''}`} onClick={() => setCat(c.slug)}>
              {c.name}<span className="ct">{c.product_count}</span>
            </button>
          ))}
          <div className="search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
            </svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search size / no." aria-label="Search products" />
          </div>
        </div>

        <div className="prod-toolbar">
          <div className="prod-meta">
            <div className="result-count">{products === null ? 'Loading…' : `${shown.length} gauge${shown.length === 1 ? '' : 's'}`}{activeCategory ? ` · ${activeCategory.name}` : ''}</div>
            {activeCategory && activeCategory.blurb && <div className="cat-blurb">{activeCategory.blurb}.</div>}
          </div>
          <div className="sort">
            <label htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={e => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        {products === null ? <ProductGridSkeleton count={6} />
          : shown.length === 0 ? (
            <div className="empty">No gauges match that search. Try a different size — or send us the drawing.</div>
          ) : (
            <div className="grid-cards">
              {shown.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
      </div>
    </main>
  );
}