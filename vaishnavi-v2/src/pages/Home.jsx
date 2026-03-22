import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from '../data/menu.js';
import { useApp } from '../context/AppContext.jsx';
import './Home.css';

const SLIDES = [
  { title: 'Divine Flavours,\nAuthentic Tradition', sub: 'Experience the true taste of India', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1400&q=80' },
  { title: 'Every Dish,\nA Masterpiece', sub: 'Crafted by our master chefs since 1998', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1400&q=80' },
  { title: 'Pure Vegetarian,\nPure Bliss', sub: 'Sattvic cooking — light on body, rich in taste', img: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=1400&q=80' },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const { addToCart } = useApp();
  const bestsellers = menuItems.filter(m => m.bestseller);

  const next = useCallback(() => setSlide(s => (s + 1) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        {SLIDES.map((s, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.img})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content container fade">
          <span className="hero-tag">🌿 Pure Vegetarian Restaurant</span>
          <h1 className="hero-title" key={slide}>
            {SLIDES[slide].title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
          </h1>
          <p className="hero-sub">{SLIDES[slide].sub}</p>
          <div className="hero-btns">
            <Link to="/menu" className="btn-gold">View Menu →</Link>
            <Link to="/booking" className="btn-outline">Book a Table</Link>
          </div>
          <div className="hero-dots">
            {SLIDES.map((_, i) => (
              <button key={i} className={`dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-row">
            {[['25+', 'Years of Excellence'], ['80+', 'Menu Items'], ['10K+', 'Happy Families'], ['4.8★', 'Average Rating']].map(([n, l]) => (
              <div key={l} className="stat">
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="about-sec container">
        <div className="about-grid">
          <div className="about-img-wrap">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80" alt="Restaurant" />
            <div className="about-badge">Est. 1998</div>
          </div>
          <div className="about-text fade">
            <span className="sec-tag">Our Story</span>
            <h2 className="sec-title">Where Every Meal is<br /><em>A Sacred Offering</em></h2>
            <p>Founded in 1998, Vaishnavi Restaurant was born from a simple belief — that food prepared with devotion nourishes not just the body, but the soul. Our recipes have been passed down through generations.</p>
            <div className="about-features">
              {['🍃 100% Pure Vegetarian', '🧑‍🍳 No Onion, No Garlic', '🌾 Fresh Organic Produce', '🏆 Award Winning Kitchen'].map(f => (
                <div key={f} className="af-item">{f}</div>
              ))}
            </div>
            <Link to="/booking" className="btn-gold">Reserve a Table →</Link>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section-block" style={{ background: 'var(--dark)', padding: '60px 0' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="sec-tag">Most Loved</span>
              <h2 className="sec-title">Our Bestsellers</h2>
            </div>
            <Link to="/menu" className="btn-outline">Full Menu →</Link>
          </div>
          <div className="grid-3">
            {bestsellers.map(item => (
              <div key={item.id} className="dish-card">
                <div className="dc-img">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  <span className="dc-badge">⭐ Best</span>
                  <span className="dc-veg">🟢</span>
                </div>
                <div className="dc-body">
                  <div className="dc-top">
                    <span className="dc-cat">{item.category}</span>
                    <span className="dc-rating">★ {item.rating}</span>
                  </div>
                  <h3 className="dc-name">{item.name}</h3>
                  <p className="dc-desc">{item.desc}</p>
                  <div className="dc-footer">
                    <span className="dc-price">₹{item.price}</span>
                    <button className="btn-gold" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => addToCart(item)}>
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container" style={{ padding: '60px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="sec-tag">Why Choose Us</span>
          <h2 className="sec-title">The Vaishnavi Experience</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 18 }}>
          {[
            { icon: '🌿', title: 'Farm Fresh', desc: 'All vegetables sourced daily from organic farms for maximum freshness.' },
            { icon: '👨‍🍳', title: 'Master Chefs', desc: 'Our chefs bring 20+ years of culinary expertise to every dish.' },
            { icon: '🕯️', title: 'Warm Ambiance', desc: 'A dining atmosphere inspired by traditional Indian aesthetics.' },
            { icon: '🙏', title: 'Sattvic Food', desc: 'No onion, no garlic — pure and light for body and mind.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="why-card">
              <div className="why-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section container">
        <div className="cta-box">
          <h2 className="sec-title" style={{ textAlign: 'center' }}>Ready to Dine with Us?</h2>
          <p>Reserve your table today or explore our full menu online.</p>
          <div className="cta-btns">
            <Link to="/booking" className="btn-gold">Book a Table →</Link>
            <Link to="/menu" className="btn-outline">Explore Menu</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
