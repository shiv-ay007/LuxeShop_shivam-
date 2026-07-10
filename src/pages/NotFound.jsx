import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import Button from '../components/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-900">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="relative mb-8"
        >
          <div className="font-display text-[10rem] md:text-[14rem] font-bold leading-none select-none">
            <span className="gradient-text">4</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
              className="inline-block text-gray-200 dark:text-gray-800"
            >
              0
            </motion.span>
            <span className="gradient-text">4</span>
          </div>
          {/* Floating emoji */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
          >
            🔍
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. Let's get you back to something great.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/')}
              icon={<FiHome className="w-4 h-4" />}>
              Back to Home
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/shop')}
              icon={<FiShoppingBag className="w-4 h-4" />}>
              Browse Shop
            </Button>
          </div>

          <button onClick={() => navigate(-1)}
            className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mx-auto">
            <FiArrowLeft className="w-4 h-4" />
            Go back to previous page
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
