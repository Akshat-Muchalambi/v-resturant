import React, { useState, useMemo, useCallback } from 'react';
import { categories, menuItems } from '../data/menu.js';
import { useApp } from '../context/AppContext.jsx';
import './Menu.css';

export default function Menu() {
  const [cat, setCat]       = useState('All');
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState({});  // checkbox state
  const [qty, setQty]       = useState({});    // qty per item stepper
  const { addToCart, state } = useApp();

  // Filtered list based on category + search
  const filtered = useMemo(() => {
    let list = menuItems;
    if (cat !== 'All') list = list.filter(i => i.category === cat);
    if (search.trim()) list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [cat, search]);

  const getQty = (id) => qty[id] || 1;

  const changeQty = useCallback((id, delta) => {
    setQty(q => ({ ...q, [id]: Math.max(1, (q[id] || 1) + delta) }));
  }, []);

  const toggleCheck = useCallback((id) => {
    setChecked(c => ({ ...c, [id]: !c[id] }));
  }, []);

  // Add all checked items to cart at once
  const addAllChecked = () => {
    const ids = Object.keys(checked).filter(k => checked[k]);
    ids.forEach(id => {
      const item = menuItems.find(m => m.id === parseInt(id));
      for (let i = 0; i < getQty(parseInt(id)); i++) addToCart(item);
    });
    setChecked({});
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const inCartIds = new Set(state.cart.map(c => c.id));

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <span className="sec-tag">Our Menu</span>
          <h1 className="sec-title fade">All Dishes</h1>
          <p className="page-header-sub">{menuItems.length} dishes · 100% Pure Vegetarian</p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 20px 64px' }}>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <input
            placeholder="🔍  Search dishes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="cat-tabs">
            {categories.map(c => (
              <button key={c} className={`cat-tab ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>

        {/* BULK ACTION BAR */}
        {checkedCount > 0 && (
          <div className="bulk-bar fade">
            <span>✅ {checkedCount} item{checkedCount > 1 ? 's' : ''} selected</span>
            <button className="btn-gold" onClick={addAllChecked}>Add All to Cart 🛒</button>
          </div>
        )}

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="no-result">
            <p>😕 No dishes found for "{search}"</p>
            <button className="btn-outline" onClick={() => setSearch('')}>Clear Search</button>
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map(item => {
              const isChecked = !!checked[item.id];
              const itemQty   = getQty(item.id);
              const inCart    = inCartIds.has(item.id);
              return (
                <div key={item.id} className={`menu-card ${isChecked ? 'selected' : ''}`}>

                  {/* CHECKBOX */}
                  <label className="mc-check">
                    <input type="checkbox" checked={isChecked} onChange={() => toggleCheck(item.id)} />
                    <span className="cb">{isChecked ? '✓' : ''}</span>
                  </label>

                  <div className="mc-img">
                    <img src={item.img} alt={item.name} loading="lazy" />
                    {item.bestseller && <span className="mc-best">⭐ Best</span>}
                    <span className="mc-vegdot">🟢</span>
                  </div>

                  <div className="mc-body">
                    <div className="mc-row">
                      <span className="mc-cat">{item.category}</span>
                      <span className="mc-rating">★ {item.rating}</span>
                    </div>
                    <h3 className="mc-name">{item.name}</h3>
                    <p className="mc-desc">{item.desc}</p>
                    <p className="mc-spicy">{item.spicy > 0 ? '🌶️'.repeat(item.spicy) : '😊 Mild'}</p>

                    <div className="mc-footer">
                      <span className="mc-price">₹{item.price}</span>
                      <div className="mc-controls">
                        {/* QTY STEPPER */}
                        <div className="stepper">
                          <button onClick={() => changeQty(item.id, -1)}>−</button>
                          <span>{itemQty}</span>
                          <button onClick={() => changeQty(item.id, 1)}>+</button>
                        </div>
                        {/* ADD BUTTON */}
                        <button
                          className={`btn-gold add-btn ${inCart ? 'added' : ''}`}
                          onClick={() => {
                            for (let i = 0; i < itemQty; i++) addToCart(item);
                            setQty(q => ({ ...q, [item.id]: 1 }));
                          }}
                        >
                          {inCart ? '✓' : '+ Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
