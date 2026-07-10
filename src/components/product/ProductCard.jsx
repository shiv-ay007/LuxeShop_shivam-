import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../common/Toast';
import StarRating from '../common/StarRating';
import { formatCurrency } from '../../utils/formatCurrency';
import { discountPercent, getBadgeColor } from '../../utils/helpers';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const toast = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast(`${product.name} added to cart!`, 'success');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast(
      isWishlisted(product.id) ? 'Removed from wishlist' : `${product.name} added to wishlist!`,
      'info'
    );
  };

  const discount = product.originalPrice ? discountPercent(product.originalPrice, product.price) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="card card-hover">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
            <motion.img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.badge && (
                <span className={`badge text-xs font-semibold ${getBadgeColor(product.badge)}`}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="badge bg-red-500 text-white font-bold">-{discount}%</span>
              )}
            </div>

            {/* Action Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-2xl shadow-lg transition-colors ${
                  isInCart(product.id)
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-800 hover:bg-primary-500 hover:text-white'
                }`}
                title="Add to cart"
              >
                <FiShoppingCart className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-2xl shadow-lg transition-colors ${
                  isWishlisted(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-800 hover:bg-red-500 hover:text-white'
                }`}
                title="Add to wishlist"
              >
                {isWishlisted(product.id) ? <FaHeart className="w-5 h-5" /> : <FiHeart className="w-5 h-5" />}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-2xl bg-white text-gray-800 shadow-lg"
                title="Quick view"
              >
                <FiEye className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-primary-500 font-semibold uppercase tracking-wider mb-1 capitalize">
              {product.category}
            </p>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {product.name}
            </h3>
            <StarRating rating={product.rating.average} count={product.rating.count} />
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
