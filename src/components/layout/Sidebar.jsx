import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../common/Button';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FiShoppingCart className="w-5 h-5 text-primary-500" />
                <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Cart ({cartCount})
                </h2>
              </div>
              <button onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="text-6xl">🛒</div>
                  <p className="font-display text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
                  <Button variant="primary" onClick={onClose}>Continue Shopping</Button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-3"
                  >
                    <Link to={`/product/${item.id}`} onClick={onClose}>
                      <img src={item.image} alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`} onClick={onClose}>
                        <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1 hover:text-primary-600">{item.name}</p>
                      </Link>
                      <p className="text-primary-600 dark:text-primary-400 font-bold text-sm mt-0.5">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-xl px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-primary-600 transition-colors">
                            <FiMinus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-primary-600 transition-colors">
                            <FiPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <Link to="/cart" onClick={onClose}>
                  <Button variant="secondary" fullWidth>View Cart</Button>
                </Link>
                <Link to="/checkout" onClick={onClose}>
                  <Button variant="primary" fullWidth>Checkout</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
