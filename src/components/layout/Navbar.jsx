import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiHeart, FiShoppingCart, FiUser, FiSun, FiMoon,
  FiMenu, FiX, FiLogOut, FiSettings, FiPackage, FiChevronDown
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../hooks/useDarkMode';
import SearchBar from '../common/SearchBar';
import { NAV_LINKS, APP_NAME } from '../../utils/constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const { cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setUserDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropOpen(false);
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-xl shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">L</div>
              <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
                {APP_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <button onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Dark Mode */}
              <button onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Wishlist */}
              <Link to="/dashboard?tab=wishlist" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* User */}
              <div className="relative" ref={dropRef}>
                <button onClick={() => setUserDropOpen(!userDropOpen)}
                  className="flex items-center gap-1.5 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {isLoggedIn && user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <FiChevronDown className={`w-3.5 h-3.5 text-gray-500 hidden md:block transition-transform ${userDropOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userDropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl shadow-2xl overflow-hidden"
                    >
                      {isLoggedIn ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <div className="py-1">
                            <Link to="/dashboard" onClick={() => setUserDropOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <FiSettings className="w-4 h-4" /> Dashboard
                            </Link>
                            <Link to="/dashboard?tab=orders" onClick={() => setUserDropOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <FiPackage className="w-4 h-4" /> Orders
                            </Link>
                            <button onClick={handleLogout}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                              <FiLogOut className="w-4 h-4" /> Log out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="py-2">
                          <Link to="/login" onClick={() => setUserDropOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <FiUser className="w-4 h-4" /> Sign In
                          </Link>
                          <Link to="/register" onClick={() => setUserDropOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20">
                            ✨ Create Account
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-gray-100 dark:border-gray-700"
            >
              <div className="container-custom py-4 space-y-1">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.path} to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                        isActive ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 p-4 pt-24 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={e => e.stopPropagation()}
              className="max-w-2xl mx-auto"
            >
              <SearchBar onClose={() => setSearchOpen(false)} placeholder="Search for products, brands, categories…" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
