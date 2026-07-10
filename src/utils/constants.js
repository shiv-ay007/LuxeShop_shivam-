// App-wide constants

export const APP_NAME = 'LuxeShop';
export const APP_TAGLINE = 'Premium Shopping Experience';

export const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
];

export const PRICE_RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 – $100', min: 50, max: 100 },
  { label: '$100 – $200', min: 100, max: 200 },
  { label: '$200 – $500', min: 200, max: 500 },
  { label: 'Over $500', min: 500, max: Infinity },
];

export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
  { id: 'crypto', label: 'Cryptocurrency', icon: '₿' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

export const ORDER_STATUSES = {
  pending: { label: 'Pending', color: 'text-amber-600 bg-amber-100' },
  processing: { label: 'Processing', color: 'text-blue-600 bg-blue-100' },
  shipped: { label: 'Shipped', color: 'text-purple-600 bg-purple-100' },
  delivered: { label: 'Delivered', color: 'text-green-600 bg-green-100' },
  cancelled: { label: 'Cancelled', color: 'text-red-600 bg-red-100' },
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://instagram.com', icon: 'FaInstagram' },
  { label: 'Twitter', url: 'https://twitter.com', icon: 'FaTwitter' },
  { label: 'Facebook', url: 'https://facebook.com', icon: 'FaFacebook' },
  { label: 'Pinterest', url: 'https://pinterest.com', icon: 'FaPinterest' },
];

export const SHIPPING_COST = 9.99;
export const FREE_SHIPPING_THRESHOLD = 100;
export const TAX_RATE = 0.08;

export const ITEMS_PER_PAGE = 12;
