import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, MACHINES, INSTRUMENTS, CUSTOMERS } from '../data/company';
import { FACILITY } from '../assets';
import Reveal from '../components/Reveal';
import usePageMeta from '../usePageMeta';

const PROCESS = [
  ['01', 'Cut', 'Tool-steel bar stock is sawn to length on our bandsaw.'],
  ['02', 'Thread', 'Threads are cut and formed on the Matrix threading machine.'],
  ['03', 'Grind', 'Ground true on Jones & Shipman and surface grinders.'],
  ['04', 'Lap', 'Hand-lapped to the working tolerance and finish.'],
  ['05', 'Inspect', 'Verified on the Octagon LMM 400 at 22 ± 2 °C.'],
  ['06', 'Certify', 'GO / NOGO checked and the ID etched on the face.'],
];

const CAPS = [
  ['1–200 mm', 'Size range'],
  ['22 ± 2 °C', 'Standard room'],
  ['2005', 'Established'],
  ['GO / NOGO', 'Every gauge'],
  ['IS·ISO·BS·ASME', 'Standards'],
];

export default function AboutPage() {
  usePageMeta(
    'About — SAI Thread Gauges & Tools, Pune',
    'A family-run precision gauge workshop in Pune since 2005, manufacturing thread and plain gauges for automobile and engineering industries.'
  );
  return (
    <main>
      <div className="page-head">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">About the workshop</span>
            <h1>Precision, made by hand and machine.</h1>
          </Reveal>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="about-intro">
              <div>
                <p className="about-lede">
                  SAI Thread Gauges &amp; Tools was founded in {COMPANY.founded} by {COMPANY.founder} and
                  is run today by proprietor {COMPANY.proprietor}. From a workshop in Somnath Nagar,
                  Pune, a small team builds thread and plain gauges for automobile and engineering
                  manufacturers across India.
                </p>
                <div className="about-body" style={{ columns: 'auto' }}>
                  <p>
                    Our scope is straightforward: manufacture and supply of thread gauges — plug and
                    ring — along with non-standard plug and ring gauges built to a customer's drawing.
                    We cover metric, BSP, BSPT, NPT/NPTL and special profiles.
                  </p>
                  <p>
                    Raw material is cut, threaded, ground and lapped in-house, then each gauge is
                    verified on our Octagon LMM 400 in a standard room held at 22 ± 2 °C. A gauge only
                    leaves the bench once its GO/NOGO faces check true.
                  </p>
                </div>
              </div>
              <blockquote className="about-quote">
                “Customers are loyal to quality, not to a company. Right quality at the right price.”
                <cite>— SAI quality policy</cite>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="dimrule">how a gauge is made</div>
            <div className="section-head"><h2 className="h-section">From bar stock to certificate.</h2></div>
          </Reveal>
          <div className="process">
            {PROCESS.map(([n, t, d], i) => (
              <Reveal key={n} delay={Math.min(i * 0.05, 0.3)}>
                <div className="pstep">
                  <span className="n">{n}</span>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="capband">
        <div className="wrap">
          <div className="capband-grid">
            {CAPS.map(([v, l], i) => (
              <Reveal key={l} delay={Math.min(i * 0.05, 0.25)}>
                <div className="capstat"><div className="v">{v}</div><div className="l">{l}</div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="dimrule">the workshop</div>
            <div className="section-head"><h2 className="h-section">On the floor in Pune.</h2></div>
          </Reveal>
          <div className="gallery">
            <figure className="wide tall">
              <img src={FACILITY.lmm400} alt="Octagon LMM 400 length measuring machine" />
              <figcaption>Octagon LMM 400 · standard room</figcaption>
            </figure>
            <figure><img src={FACILITY.grinder} alt="Thread grinding machine" /><figcaption>Grinding</figcaption></figure>
            <figure><img src={FACILITY.threading} alt="Threading machine" /><figcaption>Threading</figcaption></figure>
            <figure className="wide"><img src={FACILITY.lathe} alt="ACME lathe and grinder" /><figcaption>Lathe &amp; grinder</figcaption></figure>
            <figure><img src={FACILITY.signboard} alt="SAI Thread Gauges workshop signboard" /><figcaption>Somnath Nagar, Pune</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="dimrule">how we measure</div>
            <div className="section-head">
              <h2 className="h-section">Read to the micron.</h2>
              <p className="lead">Every thread form is checked against its calculated profile — pitch, flank angle and effective diameter — on calibrated instruments.</p>
            </div>
            <div className="threadform">
              <svg viewBox="0 0 720 150" role="img" aria-label="60-degree thread profile diagram">
                <path className="tf-line" d="M20,120 L80,40 L140,120 L200,40 L260,120 L320,40 L380,120 L440,40 L500,120 L560,40 L620,120 L680,40" />
                <line className="tf-dim" x1="80" y1="24" x2="200" y2="24" />
                <line className="tf-dim" x1="80" y1="18" x2="80" y2="30" />
                <line className="tf-dim" x1="200" y1="18" x2="200" y2="30" />
                <text className="tf-txt mark" x="120" y="16">PITCH · P</text>
                <text className="tf-txt" x="300" y="145">60° flank angle</text>
                <line className="tf-dim" x1="640" y1="40" x2="700" y2="40" />
                <line className="tf-dim" x1="640" y1="120" x2="700" y2="120" />
                <text className="tf-txt mark" x="612" y="86" transform="rotate(-90 612 86)">MAJOR ⌀</text>
              </svg>
            </div>
            <ul className="list-plain">
              {INSTRUMENTS.map(i => <li key={i}><span>{i}</span></li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="dimrule">production equipment</div>
            <div className="section-head"><h2 className="h-section">Machines on site.</h2></div>
            <ul className="list-plain">
              {MACHINES.map(m => (
                <li key={m.name}><span>{m.name}</span><span className="meta">{m.origin} · {m.range}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="dimrule">trusted by</div>
            <div className="section-head"><h2 className="h-section">Some of our customers.</h2></div>
            <div className="customers">
              {CUSTOMERS.map(c => <span key={c}>{c}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <Reveal>
            <h2>Work with the workshop directly.</h2>
            <p>No middlemen — talk to the people who make your gauge.</p>
          </Reveal>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-solid">Get in touch →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}