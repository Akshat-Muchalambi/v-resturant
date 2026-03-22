import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function Toast() {
  const { state } = useApp();
  if (!state.toast) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: '#1e1b13', border: '1px solid var(--gold)', color: 'var(--white)',
      padding: '12px 24px', borderRadius: '50px', fontSize: 14, fontWeight: 500,
      whiteSpace: 'nowrap', zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      fontFamily: 'var(--font-b)',
    }}>
      {state.toast}
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: '#1a1710', borderTop: '1px solid var(--border)', padding: '48px 0 0', marginTop: 64 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-h)', fontSize: 24, color: 'var(--gold)', marginBottom: 12 }}>🍃 Vaishnavi</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>Pure vegetarian dining crafted with love and tradition. Every dish tells a story of authentic Indian flavours.</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--white)', marginBottom: 14 }}>Navigate</p>
            {[['/', 'Home'], ['/menu', 'Menu'], ['/booking', 'Book Table'], ['/orders', 'Orders']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginBottom: 8, transition: 'color var(--trans)' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{label}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--white)', marginBottom: 14 }}>Menu</p>
            {['Starters', 'Main Course', 'South Indian', 'Desserts', 'Drinks'].map(c => (
              <p key={c} style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{c}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--white)', marginBottom: 14 }}>Contact</p>
            {['📍 MG Road, Bangalore', '📞 +91 98765 43210', '✉️ hello@vaishnavi.in', '🕐 11 AM – 11 PM'].map(c => (
              <p key={c} style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{c}</p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', padding: '18px 0', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(245,238,216,0.3)' }}>
          <span>© 2024 Vaishnavi Restaurant. All rights reserved.</span>
          <span>🌿 100% Pure Vegetarian</span>
        </div>
      </div>
    </footer>
  );
}
