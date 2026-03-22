import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Navbar         from './components/Navbar.jsx';
import { Toast, Footer } from './components/UI.jsx';
import Home           from './pages/Home.jsx';
import Menu           from './pages/Menu.jsx';
import { Cart }       from './pages/CartPage.jsx';
import Orders         from './pages/Orders.jsx';
import Booking        from './pages/Booking.jsx';
import { SignIn, SignUp } from './pages/Auth.jsx';

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: 64 }}>🍽️</div>
      <h1 style={{ fontFamily: 'var(--font-h)', fontSize: 64, color: 'var(--gold)' }}>404</h1>
      <p style={{ color: 'var(--muted)', fontSize: 16 }}>This page is not on our menu!</p>
      <a href="/" className="btn-gold" style={{ display: 'inline-flex' }}>Back to Home →</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <Toast />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/menu"    element={<Menu />} />
          <Route path="/cart"    element={<Cart />} />
          <Route path="/orders"  element={<Orders />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/signin"  element={<SignIn />} />
          <Route path="/signup"  element={<SignUp />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}
