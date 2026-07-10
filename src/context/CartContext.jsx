import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('luxeshop_cart');
    if (saved) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
      } catch {
        localStorage.removeItem('luxeshop_cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('luxeshop_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const isInCart = (id) => state.items.some(i => i.id === id);

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      cartCount,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
