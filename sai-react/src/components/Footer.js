import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/company';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand">
              <span className="brand-mark">SAI</span>
              <span>
                <span className="brand-name" style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16 }}>
                  SAI Thread Gauges &amp; Tools
                </span><br />
                <span className="brand-sub">{COMPANY.nameMarathi}</span>
              </span>
            </div>
            <p className="desc">
              Manufacturer of GO/NOGO thread plug, ring, taper and snap gauges — and
              non-standard gauges to your drawing. Made and calibrated in Pune since {COMPANY.founded}.
            </p>
          </div>

          <div>
            <h5>Navigate</h5>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5>Reach us</h5>
            <ul>
              <li><a href={`tel:${COMPANY.phonePrimary}`}>+91 {COMPANY.phonePrimary}</a></li>
              <li><a href={`tel:${COMPANY.phoneSecondary}`}>+91 {COMPANY.phoneSecondary}</a></li>
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li style={{ color: '#7d848b', marginTop: 6 }}>{COMPANY.address.line1},<br />{COMPANY.address.line2},<br />{COMPANY.address.line3}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {COMPANY.name}</span>
          <span>GST {COMPANY.gst}</span>
        </div>
      </div>
    </footer>
  );
}
