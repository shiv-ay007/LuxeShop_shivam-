import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag, FiTag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import Button from '../components/common/Button';
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../utils/constants';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, cartCount } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6 text-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-8xl">🛒</motion.div>
        <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
        <p className="text-gray-500 max-w-sm">Looks like you haven't added anything yet. Explore our products and find something you love!</p>
        <Button variant="primary" size="lg" onClick={() => navigate('/shop')} iconRight={<FiArrowRight />}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <h1 className="section-heading">Shopping Cart <span className="text-gray-400 text-2xl font-normal">({cartCount})</span></h1>
          <button onClick={clearCart} className="text-sm text-red-500 hover:underline flex items-center gap-1">
            <FiTrash2 className="w-4 h-4" /> Clear all
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card p-4 flex gap-4">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name}
                      className="w-24 h-24 rounded-2xl object-cover shrink-0 hover:opacity-90 transition-opacity" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-primary-500 font-semibold uppercase capitalize">{item.category}</p>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors">{item.name}</h3>
                        </Link>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 p-1 shrink-0 transition-colors">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <FiMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-semibold text-gray-900 dark:text-white text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <FiPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900 dark:text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-400">{formatCurrency(item.price)} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="card p-6 sticky top-24 space-y-5">
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>

              {/* Promo code */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input placeholder="Promo code" className="input-field pl-9 py-2.5 text-sm" />
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors">
                  Apply
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500 font-medium' : 'font-medium text-gray-900 dark:text-white'}>
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/checkout')}
                iconRight={<FiArrowRight />}>
                Proceed to Checkout
              </Button>

              <Link to="/shop" className="flex items-center justify-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline">
                <FiShoppingBag className="w-4 h-4" /> Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
