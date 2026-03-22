import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

// ── SHARED AUTH LAYOUT ──────────────────────────────────────────────────────
function AuthLayout({ img, title, subtitle, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* LEFT IMAGE */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,13,10,0.95), rgba(15,13,10,0.2))' }} />
        <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, zIndex: 2 }}>
          <div style={{ fontFamily: 'var(--font-h)', fontSize: 24, color: 'var(--gold)', marginBottom: 18 }}>🍃 Vaishnavi</div>
          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(32px,3.5vw,48px)', color: 'var(--white)', lineHeight: 1.1, marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: title }} />
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{subtitle}</p>
        </div>
      </div>
      {/* RIGHT FORM */}
      <div style={{ width: 500, flexShrink: 0, background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 44px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'none', fontFamily: 'var(--font-h)', fontSize: 20, color: 'var(--gold)', marginBottom: 20 }} className="auth-mobile-logo">🍃 Vaishnavi</div>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── SIGN IN ─────────────────────────────────────────────────────────────────
export function SignIn() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate  = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (form.password.length < 4) e.password = 'Password too short';
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      login({ name: form.email.split('@')[0], email: form.email });
      navigate('/');
    }, 1000);
  };

  return (
    <AuthLayout img="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80"
      title="Welcome Back to<br/><em style='color:var(--gold)'>Vaishnavi</em>"
      subtitle="Sign in to manage your orders, book tables, and enjoy a personalised experience.">
      <h1 style={{ fontFamily: 'var(--font-h)', fontSize: 38, marginBottom: 6 }}>Sign In</h1>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 26 }}>Don't have an account? <Link to="/signup" style={{ color: 'var(--gold)', fontWeight: 600 }}>Sign Up</Link></p>

      <form onSubmit={submit} noValidate>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="you@email.com" value={form.email}
            onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }} />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={form.password}
            onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '' })); }} />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 20, color: 'var(--muted)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: 'auto', accentColor: 'var(--gold)' }} /> Remember me
          </label>
          <a href="#" style={{ color: 'var(--gold)' }}>Forgot password?</a>
        </div>
        <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: 15, fontSize: 14, marginBottom: 16 }} disabled={loading}>
          {loading ? '⏳ Signing in...' : 'Sign In →'}
        </button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {['🌐 Google', '📘 Facebook'].map(s => (
          <button key={s} style={{ padding: 11, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, color: 'rgba(245,238,216,0.7)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-b)', transition: 'border-color var(--trans)' }}>{s}</button>
        ))}
      </div>
    </AuthLayout>
  );
}

// ── SIGN UP ─────────────────────────────────────────────────────────────────
export function SignUp() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useApp();
  const navigate   = useNavigate();

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit phone required';
    if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      signup({ name: form.name, email: form.email, phone: form.phone });
      navigate('/');
    }, 1000);
  };

  return (
    <AuthLayout img="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&q=80"
      title="Join the<br/><em style='color:var(--gold)'>Vaishnavi Family</em>"
      subtitle="Create an account to enjoy exclusive offers, faster ordering, and personalised dining.">
      <h1 style={{ fontFamily: 'var(--font-h)', fontSize: 36, marginBottom: 6 }}>Create Account</h1>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Already have an account? <Link to="/signin" style={{ color: 'var(--gold)', fontWeight: 600 }}>Sign In</Link></p>

      <form onSubmit={submit} noValidate>
        <div className="form-group">
          <label>Full Name</label>
          <input placeholder="Priya Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input placeholder="9876543210" value={form.phone} onChange={e => set('phone', e.target.value)} />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => set('password', e.target.value)} />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Repeat password" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
            {errors.confirm && <span className="form-error">{errors.confirm}</span>}
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'var(--muted)', marginBottom: 18, cursor: 'pointer', lineHeight: 1.5 }}>
          <input type="checkbox" required style={{ width: 'auto', marginTop: 2, accentColor: 'var(--gold)', flexShrink: 0 }} />
          I agree to the <a href="#" style={{ color: 'var(--gold)' }}>Terms of Service</a>
        </label>
        <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: 15, fontSize: 14 }} disabled={loading}>
          {loading ? '⏳ Creating...' : 'Create Account →'}
        </button>
      </form>
    </AuthLayout>
  );
}
