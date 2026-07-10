// Utility helper functions

/**
 * Truncate a string to a given length
 */
export const truncate = (str, length = 60) =>
  str.length > length ? str.slice(0, length) + '…' : str;

/**
 * Calculate discount percentage
 */
export const discountPercent = (original, current) =>
  Math.round(((original - current) / original) * 100);

/**
 * Generate star array for rating display
 */
export const getStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};

/**
 * Debounce function for search
 */
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Generate a unique order ID
 */
export const generateOrderId = () =>
  'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();

/**
 * Sort products based on sort key
 */
export const sortProducts = (products, sortKey) => {
  const list = [...products];
  switch (sortKey) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating.average - a.rating.average);
    case 'newest':
      return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'popular':
      return list.sort((a, b) => b.rating.count - a.rating.count);
    default:
      return list;
  }
};

/**
 * Filter products by price range
 */
export const filterByPrice = (products, min, max) =>
  products.filter(p => p.price >= min && p.price <= max);

/**
 * Get badge color class
 */
export const getBadgeColor = (badge) => {
  const map = {
    'Best Seller': 'bg-amber-500 text-white',
    'Hot': 'bg-red-500 text-white',
    'New': 'bg-green-500 text-white',
    'Sale': 'bg-blue-500 text-white',
    'Premium': 'bg-purple-600 text-white',
  };
  return map[badge] || 'bg-gray-500 text-white';
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/**
 * Clamp a number between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
