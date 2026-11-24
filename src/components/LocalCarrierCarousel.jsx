import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, PhoneCall } from 'lucide-react';
import { CarrierLogo } from './CarrierLogos';
import './localCarrierCarousel.css';

export function LocalCarrierCarousel({ rows, location, telHref, onCheckAddress, onShowFacts }) {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    const update = () => setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update();
    element.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener('scroll', update); observer.disconnect(); };
  }, [rows]);

  const move = (direction) => {
    const element = track.current;
    const card = element.querySelector('article');
    if (!card) return;
    element.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return <section className="local-carriers" aria-label={`Internet providers in ${location}`}>
    <div className="local-carriers-heading">
      <div>
        <h3>Internet Providers in {location}</h3>
        <p>Explore {rows.length} carriers. Call to check current promotions for your address.</p>
      </div>
      <div className="local-carriers-controls">
        <button type="button" aria-label="Previous carriers" aria-controls="local-carrier-track" disabled={edges.start} onClick={() => move(-1)}><ArrowLeft size={20} /></button>
        <button type="button" aria-label="Next carriers" aria-controls="local-carrier-track" disabled={edges.end} onClick={() => move(1)}><ArrowRight size={20} /></button>
      </div>
    </div>
    <div id="local-carrier-track" className="local-carriers-track" ref={track} tabIndex={0} role="region" aria-label="Carrier cards. Swipe or use the arrow buttons to browse.">
      {rows.map(row => <article className="local-carrier-card" key={row.id}>
        <div className="local-carrier-logo"><CarrierLogo id={row.id} name={row.name} className="h-8 w-auto max-w-[170px]" /></div>
        <h4>{row.name}</h4>
        <dl className="local-carrier-facts">
          <div><dt>Speeds up to</dt><dd>{row.maxSpeed}</dd></div>
          <div><dt>Starting at</dt><dd>${row.startingPrice}<small>/mo</small></dd></div>
          <div><dt>Connection type</dt><dd>{row.type}</dd></div>
          <div><dt>Contract terms</dt><dd>{row.contract}</dd></div>
        </dl>
        <p className="local-carrier-qualification">Offers, pricing, speeds and availability vary by address. Confirm current details by phone.</p>
        <a href={telHref} className="local-carrier-call js-google-phone-link"><PhoneCall size={18} />Call Now to Check Promotions</a>
        <details className="local-carrier-plans">
          <summary>View all {row.allPlans.length} plans &amp; details</summary>
          {row.allPlans.map(plan => <div className="local-carrier-plan" key={plan.id}>
            <h5>{plan.name}</h5>
            <p>{plan.downloadSpeed} down · {plan.uploadSpeed} up</p>
            <p>${plan.price}/mo · {plan.contract}</p>
            {plan.equipmentFee && <p>Equipment: {plan.equipmentFee}</p>}
            {plan.installationSla && <p>Installation: {plan.installationSla}</p>}
            {plan.perks?.length > 0 && <ul>{plan.perks.map((perk, index) => <li key={index}>{perk}</li>)}</ul>}
            <button type="button" onClick={() => onShowFacts(plan, row.rawProvider)}>FCC Broadband Facts</button>
          </div>)}
        </details>
        <button className="local-carrier-address" type="button" onClick={onCheckAddress}>Check my address</button>
      </article>)}
    </div>
  </section>;
}
