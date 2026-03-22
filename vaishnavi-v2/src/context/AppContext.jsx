import React, { createContext, useContext, useReducer, useCallback } from 'react';

const initialState = {
  user: null,
  cart: [],
  orders: [],
  toast: null,
};

function reducer(state, action) {
  switch (action.type) {

    case 'LOGIN':
    case 'SIGNUP':
      return { ...state, user: action.user };
    case 'LOGOUT':
      return { ...state, user: null, cart: [] };

    case 'ADD_CART': {
      const found = state.cart.find(i => i.id === action.item.id);
      if (found) {
        return { ...state, cart: state.cart.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, cart: [...state.cart, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.id) };
    case 'INC':
      return { ...state, cart: state.cart.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) };
    case 'DEC':
      return { ...state, cart: state.cart.map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [{ id: 'ORD' + Date.now(), items: [...state.cart], total: action.total, date: new Date().toLocaleString(), status: 'Confirmed', type: action.orderType }, ...state.orders],
        cart: [],
      };

    case 'SHOW_TOAST': return { ...state, toast: action.msg };
    case 'HIDE_TOAST':  return { ...state, toast: null };

    default: return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showToast = useCallback((msg) => {
    dispatch({ type: 'SHOW_TOAST', msg });
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000);
  }, []);

  const login  = useCallback((user) => { dispatch({ type: 'LOGIN', user });  showToast(`Welcome back, ${user.name}! 🙏`); }, [showToast]);
  const signup = useCallback((user) => { dispatch({ type: 'SIGNUP', user }); showToast(`Welcome to Vaishnavi, ${user.name}! 🎉`); }, [showToast]);
  const logout = useCallback(() => { dispatch({ type: 'LOGOUT' }); showToast('Logged out successfully'); }, [showToast]);

  const addToCart     = useCallback((item) => { dispatch({ type: 'ADD_CART', item }); showToast(`${item.name} added to cart!`); }, [showToast]);
  const removeFromCart= useCallback((id)   => dispatch({ type: 'REMOVE_CART', id }), []);
  const increment     = useCallback((id)   => dispatch({ type: 'INC', id }), []);
  const decrement     = useCallback((id)   => dispatch({ type: 'DEC', id }), []);
  const clearCart     = useCallback(()     => dispatch({ type: 'CLEAR_CART' }), []);
  const placeOrder    = useCallback((total, orderType) => { dispatch({ type: 'PLACE_ORDER', total, orderType }); showToast('Order placed successfully! 🎊'); }, [showToast]);

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{ state, login, signup, logout, addToCart, removeFromCart, increment, decrement, clearCart, placeOrder, cartCount, cartTotal }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
