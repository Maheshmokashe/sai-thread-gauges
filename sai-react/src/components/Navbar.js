import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">SAI</span>
          <span>
            <span className="brand-name">SAI Thread Gauges</span><br />
            <span className="brand-sub">&amp; Tools · Pune</span>
          </span>
        </Link>

        <span className="nav-location">Pune, India <i /> Since 2005</span>

        <button className="nav-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <div className="nav-right">
            <ThemeToggle />
            <Link to="/contact" className="btn btn-solid nav-cta" onClick={() => setOpen(false)}>
              Request a quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
