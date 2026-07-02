import React from 'react';
import { COMPANY } from '../data/company';

export default function WhatsAppButton() {
  const href = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    'Hello SAI Thread Gauges, I would like an enquiry about a gauge.'
  )}`;
  return (
    <a className="wa" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.27-.1-.47-.15-.66.15-.2.3-.76.94-.93 1.13-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.06L2 22l5.05-1.32A10 10 0 1012 2z"/>
      </svg>
      <span className="label">WhatsApp</span>
    </a>
  );
}
