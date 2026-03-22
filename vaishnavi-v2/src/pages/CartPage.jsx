// ─── CART PAGE ───────────────────────────────────────────────────────────────
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function Cart() {
  const { state, increment, decrement, removeFromCart, clearCart, cartTotal } = useApp();
  const { cart, user } = state;
  const navigate = useNavigate();
  const gst   = Math.round(cartTotal * 0.05);
  const total = cartTotal + gst + 40;

  if (cart.length === 0) return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 36, marginBottom: 10 }}>Cart is Empty</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Add some dishes from our menu!</p>
        <Link to="/menu" className="btn-gold">Browse Menu →</Link>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <span className="sec-tag">Your Order</span>
          <h1 className="sec-title">Your Cart</h1>
          <p className="page-header-sub">{cart.length} item{cart.length > 1 ? 's' : ''} · ₹{cartTotal}</p>
        </div>
      </div>
      <div className="container" style={{ padding: '32px 20px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>

          {/* ITEMS */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 22 }}>Order Items</h3>
              <button onClick={clearCart} style={{ background: 'none', color: 'var(--muted)', fontSize: 13, padding: '5px 12px', border: '1px solid var(--border)', borderRadius: 6, transition: 'all var(--trans)' }}>🗑️ Clear All</button>
            </div>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 14, padding: '16px 22px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <img src={item.img} alt={item.name} style={{ width: 72, height: 62, objectFit: 'cover', borderRadius: 7, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{item.category}</p>
                  <p style={{ fontFamily: 'var(--font-h)', fontSize: 17, marginBottom: 8 }}>{item.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--dark)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
                      <button onClick={() => decrement(item.id)} style={{ width: 30, height: 28, background: 'none', color: 'var(--gold)', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer' }}>−</button>
                      <span style={{ width: 28, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{item.qty}</span>
                      <button onClick={() => increment(item.id)} style={{ width: 30, height: 28, background: 'none', color: 'var(--gold)', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer' }}>+</button>
                    </div>
                    <span style={{ fontFamily: 'var(--font-h)', fontSize: 20, color: 'var(--gold)' }}>₹{item.price * item.qty}</span>
                    <button onClick={() => removeFromCart(item.id)} style={{ width: 26, height: 26, background: 'none', border: '1px solid var(--border)', borderRadius: '50%', color: 'var(--muted)', fontSize: 12, cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 22 }}>
            <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 24, marginBottom: 18 }}>Order Summary</h3>
            {[['Subtotal', `₹${cartTotal}`], ['GST (5%)', `₹${gst}`], ['Delivery', '₹40']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 14, color: 'rgba(245,238,216,0.7)' }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-h)' }}>
              <span>Total</span><span style={{ color: 'var(--gold)' }}>₹{total}</span>
            </div>
            <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 14, marginTop: 6 }}
              onClick={() => user ? navigate('/orders') : navigate('/signin')}>
              {user ? 'Proceed to Order →' : 'Sign In to Order →'}
            </button>
            {!user && <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 8 }}>Please sign in to place your order</p>}
            <Link to="/menu" className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: 12 }}>← Add More Items</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
