import { useEffect } from 'react';

// Small SEO helper: set the document title + meta description per page.
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
      m.setAttribute('content', description);
    }
  }, [title, description]);
}
