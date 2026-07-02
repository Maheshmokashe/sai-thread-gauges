import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postEnquiry } from '../api';
import { COMPANY } from '../data/company';
import Reveal from '../components/Reveal';
import usePageMeta from '../usePageMeta';

const GAUGE_TYPES = [
  'Thread Plug Gauge', 'Thread Ring Gauge', 'Taper Gauge (BSPT / NPT)',
  'Snap Gauge', 'Non-standard / Custom', 'Other',
];

const HOURS = [
  ['Mon – Wed, Fri – Sun', '10:00 AM – 8:00 PM'],
  ['Thursday', 'Closed', true],
];

const EMPTY = {
  name: '', company: '', email: '', phone: '',
  gauge_type: '', thread_size: '', standard: '', quantity: '', message: '',
};

export default function ContactPage() {
  usePageMeta(
    'Contact — SAI Thread Gauges & Tools, Pune',
    'Send your gauge requirement to SAI Thread Gauges & Tools. Call +91 98222 78169 or submit an enquiry — reply within 24 hours.'
  );
  const [params] = useSearchParams();
  const product = params.get('product');
  const [form, setForm] = useState({ ...EMPTY, message: product ? `I'd like a quote for: ${product}` : '' });
  const [status, setStatus] = useState('idle');

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const payload = { ...form, quantity: form.quantity ? Number(form.quantity) : null };
      await postEnquiry(payload);
      setStatus('ok');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const waHref = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hello SAI, I have a gauge enquiry.')}`;
  const mapSrc = 'https://www.google.com/maps?q=Ashtavinayak+Society+Somnath+Nagar+Wadgaon+Sheri+Pune+411014&output=embed';

  return (
    <main>
      <div className="page-head">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Get in touch</span>
            <h1>Send us your requirement.</h1>
            <p>Share a size, a standard or a drawing. We reply within 24 hours on working days.</p>
          </Reveal>
        </div>
      </div>

      <div className="wrap contact-layout">
        <Reveal>
          <div className="info-card">
            <span className="ico" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 013.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L7.1 9.8a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>
            </span>
            <div>
              <h4>Call or WhatsApp</h4>
              <p><a href={`tel:${COMPANY.phonePrimary}`}>+91 {COMPANY.phonePrimary}</a> ({COMPANY.contacts[0].name})</p>
              <p><a href={`tel:${COMPANY.phoneSecondary}`}>+91 {COMPANY.phoneSecondary}</a> ({COMPANY.contacts[1].name})</p>
              <p style={{ marginTop: 6 }}><a href={waHref} target="_blank" rel="noopener noreferrer">Open WhatsApp chat →</a></p>
            </div>
          </div>

          <div className="info-card">
            <span className="ico" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h16v16H4z"/><path d="M4 6l8 6 8-6"/></svg>
            </span>
            <div>
              <h4>Email</h4>
              <p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
            </div>
          </div>

          <div className="info-card">
            <span className="ico" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <div>
              <h4>Visit the workshop</h4>
              <p>{COMPANY.address.line1},<br />{COMPANY.address.line2},<br />{COMPANY.address.line3}</p>
              <p style={{ marginTop: 6 }}><a href={COMPANY.address.maps} target="_blank" rel="noopener noreferrer">Open in Maps →</a></p>
            </div>
          </div>

          <div className="contact-map">
            <iframe src={mapSrc} title="SAI Thread Gauges location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className="hours">
            <h4>Working hours</h4>
            {HOURS.map(([d, t, closed]) => (
              <div className="r" key={d}><span className="d">{d}</span><span className={`t ${closed ? 'closed' : ''}`}>{t}</span></div>
            ))}
          </div>

          <div className="info-card">
            <span className="ico mono" aria-hidden="true" style={{ fontSize: 12 }}>GST</span>
            <div><h4>GST</h4><p className="mono" style={{ fontSize: 13 }}>{COMPANY.gst}</p></div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="form" onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name *</label>
                <input id="name" name="name" value={form.name} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" value={form.company} onChange={change} />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="phone">Phone *</label>
                <input id="phone" name="phone" value={form.phone} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={change} required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="gauge_type">Gauge type</label>
                <select id="gauge_type" name="gauge_type" value={form.gauge_type} onChange={change}>
                  <option value="">Select…</option>
                  {GAUGE_TYPES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="thread_size">Thread / size</label>
                <input id="thread_size" name="thread_size" value={form.thread_size} onChange={change} placeholder="e.g. M14×1.5" />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="standard">Standard</label>
                <input id="standard" name="standard" value={form.standard} onChange={change} placeholder="e.g. IS / ISO / BS" />
              </div>
              <div className="field">
                <label htmlFor="quantity">Quantity</label>
                <input id="quantity" name="quantity" type="number" min="1" value={form.quantity} onChange={change} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Requirement</label>
              <textarea id="message" name="message" value={form.message} onChange={change} placeholder="Describe the gauge, tolerance band, or attach details when we reply." />
            </div>

            <button className="btn btn-solid" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry →'}
            </button>

            {status === 'ok' && (
              <div className="form-note ok">Enquiry received. We'll reply within 24 hours. For anything urgent, call +91 {COMPANY.phonePrimary}.</div>
            )}
            {status === 'error' && (
              <div className="form-note err">
                That didn't send — the server may be waking up. Please try again, or reach us directly:
                call +91 {COMPANY.phonePrimary} or <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>message on WhatsApp</a>.
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </main>
  );
}