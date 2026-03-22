import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { timeSlots } from '../data/menu.js';

const INIT = { name:'', phone:'', email:'', date:'', slot:'', guests:'2', occasion:'', requests:'' };
const today = new Date().toISOString().split('T')[0];

export default function Booking() {
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [step, setStep]       = useState(1);
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = useCallback((k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  }, []);

  const validateStep1 = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Name required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit phone required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.date) e.date = 'Please select a date';
    if (!form.slot) e.slot = 'Please select a time slot';
    return e;
  };

  const goNext = () => {
    if (step === 1) { const e = validateStep1(); if (Object.keys(e).length) { setErrors(e); return; } }
    if (step === 2) { const e = validateStep2(); if (Object.keys(e).length) { setErrors(e); return; } }
    setStep(s => s + 1);
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  if (done) return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', background: 'var(--card)', border: '1px solid rgba(212,168,67,0.3)', borderRadius: 16, padding: '48px 36px', maxWidth: 460 }}>
        <div style={{ fontSize: 60, marginBottom: 14 }}>🎉</div>
        <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 40, color: 'var(--gold)', marginBottom: 20 }}>Table Booked!</h2>
        <div style={{ background: 'var(--dark)', borderRadius: 10, padding: 16, marginBottom: 20, textAlign: 'left' }}>
          {[['👤 Name', form.name], ['📅 Date', form.date], ['🕐 Time', form.slot], ['👥 Guests', form.guests + ' persons'], form.occasion && ['🎊 Occasion', form.occasion]].filter(Boolean).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
              <span style={{ color: 'var(--muted)' }}>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Confirmation sent to {form.email}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-gold" onClick={() => { setDone(false); setForm(INIT); setStep(1); }}>Book Another</button>
          <button className="btn-outline" onClick={() => navigate('/menu')}>View Menu →</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,13,10,0.75)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="sec-tag">Reservations</span>
          <h1 className="sec-title">Book a Table</h1>
          <p className="page-header-sub">Reserve your spot at Vaishnavi</p>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 20px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }}>

          {/* FORM */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 26 }}>
            {/* STEPPER */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
              {['Your Info', 'Date & Time', 'Confirm'].map((label, i) => (
                <React.Fragment key={label}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'var(--gold)' : 'var(--dark)', border: `2px solid ${step >= i + 1 ? 'var(--gold)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: step >= i + 1 ? '#0f0d0a' : 'var(--muted)' }}>
                      {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 11, color: step === i + 1 ? 'var(--white)' : 'var(--muted)', whiteSpace: 'nowrap' }}>{label}</span>
                  </div>
                  {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? 'var(--gold)' : 'var(--border)' }} />}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={submit}>
              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 24, marginBottom: 18 }}>Your Details</h3>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input placeholder="Priya Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input placeholder="9876543210" value={form.phone} onChange={e => set('phone', e.target.value)} />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Number of Guests</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['1','2','3','4','5','6','7','8+'].map(n => (
                        <button type="button" key={n} onClick={() => set('guests', n)}
                          style={{ width: 40, height: 40, borderRadius: 7, background: form.guests === n ? 'var(--gold)' : 'var(--dark)', border: `1px solid ${form.guests === n ? 'var(--gold)' : 'var(--border)'}`, color: form.guests === n ? '#0f0d0a' : 'var(--muted)', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-b)' }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="button" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: 14 }} onClick={goNext}>Continue →</button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 24, marginBottom: 18 }}>Date & Time</h3>
                  <div className="form-group">
                    <label>Select Date *</label>
                    <input type="date" min={today} value={form.date} onChange={e => set('date', e.target.value)} />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label>Select Time Slot *</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 4 }}>
                      {timeSlots.map(slot => (
                        <button type="button" key={slot} onClick={() => set('slot', slot)}
                          style={{ padding: '9px 6px', background: form.slot === slot ? 'var(--gold)' : 'var(--dark)', border: `1px solid ${form.slot === slot ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 7, color: form.slot === slot ? '#0f0d0a' : 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-b)' }}>
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.slot && <span className="form-error">{errors.slot}</span>}
                  </div>
                  <div className="form-group">
                    <label>Occasion (Optional)</label>
                    <select value={form.occasion} onChange={e => set('occasion', e.target.value)}>
                      {['', 'Birthday', 'Anniversary', 'Date Night', 'Family Gathering', 'Business Lunch'].map(o => <option key={o} value={o}>{o || 'Select...'}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Special Requests</label>
                    <textarea rows={3} placeholder="Seating preference, allergies, decorations..." value={form.requests} onChange={e => set('requests', e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="button" className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: 13 }} onClick={() => setStep(1)}>← Back</button>
                    <button type="button" className="btn-gold"    style={{ flex: 1, justifyContent: 'center', padding: 14 }} onClick={goNext}>Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 24, marginBottom: 18 }}>Confirm Booking</h3>
                  <div style={{ background: 'var(--dark)', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
                    {[['👤 Name', form.name], ['📅 Date', form.date], ['🕐 Time', form.slot], ['👥 Guests', form.guests + ' persons'], form.occasion && ['🎊 Occasion', form.occasion], form.requests && ['📝 Requests', form.requests]].filter(Boolean).map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                        <span style={{ color: 'var(--muted)' }}>{k}</span>
                        <strong style={{ textAlign: 'right', maxWidth: '55%' }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="button" className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: 13 }} onClick={() => setStep(2)}>← Edit</button>
                    <button type="submit" className="btn-gold" style={{ flex: 1, justifyContent: 'center', padding: 14 }} disabled={loading}>
                      {loading ? '⏳ Booking...' : '✅ Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* INFO */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" alt="Restaurant" style={{ width: '100%', height: 170, objectFit: 'cover' }} />
            <div style={{ padding: 18 }}>
              <p style={{ fontFamily: 'var(--font-h)', fontSize: 20, color: 'var(--gold)', marginBottom: 12 }}>🍃 Vaishnavi Restaurant</p>
              {['📍 12, Temple Street, Bangalore', '📞 +91 98765 43210', '✉️ hello@vaishnavi.in', '🕐 11 AM – 11 PM Daily'].map(i => (
                <p key={i} style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{i}</p>
              ))}
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '14px 0' }} />
              {['🪑 Indoor & Outdoor seating', '🚗 Free valet parking', '📵 No onion, no garlic', '🎵 Live music weekends', '👶 Kids friendly'].map(i => (
                <p key={i} style={{ fontSize: 13, color: 'rgba(245,238,216,0.7)', marginBottom: 8 }}>{i}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
