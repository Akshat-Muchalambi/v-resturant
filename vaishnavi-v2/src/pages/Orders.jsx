import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const STEPS = ['Confirmed', 'Preparing', 'Ready', 'Delivered'];

export default function Orders() {
  const { state, placeOrder, cartTotal } = useApp();
  const { user, cart, orders } = state;
  const navigate = useNavigate();
  const [address, setAddress]   = useState('');
  const [orderType, setOrderType] = useState('delivery');
  const [loading, setLoading]   = useState(false);

  const gst   = Math.round(cartTotal * 0.05);
  const total = cartTotal + gst + (orderType === 'delivery' ? 40 : 0);

  if (!user) return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
        <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 36, marginBottom: 10 }}>Please Sign In</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Sign in to view and place orders.</p>
        <Link to="/signin" className="btn-gold">Sign In →</Link>
      </div>
    </div>
  );

  const handlePlace = () => {
    if (!cart.length) { navigate('/menu'); return; }
    if (orderType === 'delivery' && !address.trim()) return;
    setLoading(true);
    setTimeout(() => { placeOrder(total, orderType); setAddress(''); setLoading(false); }, 1400);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <span className="sec-tag">Food Orders</span>
          <h1 className="sec-title">My Orders</h1>
          <p className="page-header-sub">Hello, {user.name} 🙏 · {orders.length} past order{orders.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 20px 64px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* PLACE ORDER */}
        {cart.length > 0 && (
          <div style={{ background: 'var(--card)', border: '1px solid rgba(212,168,67,0.3)', borderRadius: 'var(--radius)', padding: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 26, marginBottom: 6 }}>🛒 Complete Your Order</h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 18 }}>{cart.reduce((s,i)=>s+i.qty,0)} items · ₹{cartTotal} subtotal</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {[['delivery','🚚 Delivery'], ['dinein','🪑 Dine In'], ['takeaway','🥡 Takeaway']].map(([v, label]) => (
                <button key={v} onClick={() => setOrderType(v)}
                  style={{ padding: '9px 18px', background: orderType === v ? 'var(--gold)' : 'var(--dark)', border: `1px solid ${orderType === v ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 7, color: orderType === v ? '#0f0d0a' : 'var(--muted)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-b)', transition: 'all var(--trans)' }}>
                  {label}
                </button>
              ))}
            </div>

            {orderType === 'delivery' && (
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>Delivery Address *</label>
                <textarea rows={3} placeholder="Enter full delivery address..." value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            )}

            {/* Cart items preview */}
            <div style={{ background: 'var(--dark)', borderRadius: 8, padding: 14, marginBottom: 16, maxHeight: 200, overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <img src={item.img} alt={item.name} style={{ width: 38, height: 34, objectFit: 'cover', borderRadius: 5, flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{item.name}</span>
                  <span style={{ color: 'var(--muted)' }}>x{item.qty}</span>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-h)', fontSize: 15 }}>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ background: 'var(--dark)', borderRadius: 8, padding: 14, marginBottom: 16 }}>
              {[['Subtotal', `₹${cartTotal}`], ['GST 5%', `₹${gst}`], orderType === 'delivery' && ['Delivery', '₹40']].filter(Boolean).map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: 'rgba(245,238,216,0.65)', borderBottom: '1px solid var(--border)' }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontFamily: 'var(--font-h)', fontSize: 20, fontWeight: 700 }}>
                <span>Total</span><span style={{ color: 'var(--gold)' }}>₹{total}</span>
              </div>
            </div>

            <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: 15, fontSize: 14 }}
              onClick={handlePlace} disabled={loading || (orderType === 'delivery' && !address.trim())}>
              {loading ? '⏳ Placing...' : '✅ Place Order →'}
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {cart.length === 0 && orders.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>📋</div>
            <h3 style={{ fontSize: 22, marginBottom: 8 }}>No Orders Yet</h3>
            <p style={{ marginBottom: 24 }}>Your order history will appear here</p>
            <Link to="/menu" className="btn-gold">Start Ordering →</Link>
          </div>
        )}

        {/* ORDER HISTORY */}
        {orders.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 28, marginBottom: 18 }}>Order History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {orders.map(order => (
                <div key={order.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                    <div>
                      <p style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 700, letterSpacing: 1 }}>{order.id}</p>
                      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{order.date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'var(--font-h)', fontSize: 22 }}>₹{order.total}</p>
                      <span style={{ fontSize: 12, background: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.3)', color: 'var(--green)', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>✅ {order.status}</span>
                    </div>
                  </div>

                  {/* STATUS TRACKER */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    {STEPS.map((step, i) => {
                      const done = i === 0;
                      return (
                        <React.Fragment key={step}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? 'var(--gold)' : 'var(--dark)', border: `2px solid ${done ? 'var(--gold)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: done ? '#0f0d0a' : 'var(--muted)' }}>
                              {done ? '✓' : i + 1}
                            </div>
                            <span style={{ fontSize: 10, color: done ? 'var(--gold)' : 'var(--muted)', textAlign: 'center' }}>{step}</span>
                          </div>
                          {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: done ? 'var(--gold)' : 'var(--border)' }} />}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {order.items.slice(0, 3).map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--dark)', padding: '6px 10px', borderRadius: 7, fontSize: 12 }}>
                        <img src={item.img} alt={item.name} style={{ width: 30, height: 26, objectFit: 'cover', borderRadius: 4 }} />
                        <span>{item.name}</span>
                        <span style={{ color: 'var(--muted)' }}>x{item.qty}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && <span style={{ fontSize: 12, color: 'var(--muted)', padding: '6px 10px' }}>+{order.items.length - 3} more</span>}
                  </div>

                  <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                    <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => navigate('/menu')}>🔁 Reorder</button>
                    <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 12 }}>⭐ Rate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
