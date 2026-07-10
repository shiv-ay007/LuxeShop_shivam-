import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext(null);

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];
    case 'REMOVE':
      return state.filter(id => id !== action.payload);
    case 'CLEAR':
      return [];
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [items, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem('luxeshop_wishlist');
    if (saved) {
      try { dispatch({ type: 'LOAD', payload: JSON.parse(saved) }); }
      catch { localStorage.removeItem('luxeshop_wishlist'); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('luxeshop_wishlist', JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (id) => dispatch({ type: 'TOGGLE', payload: id });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id });
  const clearWishlist = () => dispatch({ type: 'CLEAR' });
  const isWishlisted = (id) => items.includes(id);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, removeFromWishlist, clearWishlist, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
