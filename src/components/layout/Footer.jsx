import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaTwitter, FaFacebook, FaPinterest, FaYoutube
} from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useState } from 'react';
import { APP_NAME } from '../../utils/constants';
import { useToast } from '../common/Toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast('Thanks for subscribing! 🎉', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-gray-950 dark:bg-dark-950 text-gray-400 mt-20">
      {/* Newsletter strip */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="container-custom py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-1">Stay in the loop</h3>
            <p className="text-primary-300 text-sm">Get exclusive deals and new arrivals straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-primary-950/60 border border-primary-700 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl text-sm hover:bg-primary-50 transition-colors shrink-0"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">L</div>
              <span className="font-display text-xl font-bold text-white">{APP_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Curated premium products delivered to your door. Quality, style, and satisfaction guaranteed.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaTwitter, FaFacebook, FaPinterest, FaYoutube].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.15, color: '#d946ef' }}
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-gray-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {['New Arrivals', 'Best Sellers', 'Electronics', 'Fashion', 'Home & Living', 'Beauty'].map(l => (
                <li key={l}>
                  <Link to="/shop" className="hover:text-primary-400 transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[['About Us', '/about'], ['Contact', '/contact'], ['Careers', '/'], ['Press', '/'], ['Privacy Policy', '/'], ['Terms of Service', '/']].map(([l, h]) => (
                <li key={l}>
                  <Link to={h} className="hover:text-primary-400 transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary-500" />
                <span>Shivam Yadav</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 shrink-0 text-primary-500" />
                <span>7266079663</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4 shrink-0 text-primary-500" />
                <span>Shivam.yadav.cse01@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2025 {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>🔒 Secure Checkout</span>
            <span>🚚 Free Shipping Over $100</span>
            <span>↩️ Easy Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
