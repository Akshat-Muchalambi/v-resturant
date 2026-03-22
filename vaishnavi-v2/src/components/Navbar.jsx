import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, logout, cartCount } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/booking', label: 'Book Table' },
    { to: '/orders', label: 'My Orders' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrap container">

        <Link to="/" className="nav-logo">🍃 Vaishnavi</Link>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {state.user ? (
            <div className="user-chip">
              <div className="user-av">{state.user.name[0].toUpperCase()}</div>
              <div className="user-drop">
                <p className="ud-name">{state.user.name}</p>
                <p className="ud-email">{state.user.email}</p>
                <hr />
                <button onClick={() => navigate('/orders')}>My Orders</button>
                <button onClick={logout} style={{ color: '#e74c3c' }}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/signin" className="btn-gold nav-signin">Sign In</Link>
          )}

          <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'mob-link active' : 'mob-link'} onClick={() => setMenuOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/cart" className="mob-link" onClick={() => setMenuOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
          {!state.user
            ? <Link to="/signin" className="mob-link" onClick={() => setMenuOpen(false)}>Sign In / Sign Up</Link>
            : <button className="mob-link" style={{ background: 'none', textAlign: 'left', color: '#e74c3c', width: '100%' }} onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
          }
        </div>
      )}
    </nav>
  );
}
