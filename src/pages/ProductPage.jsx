import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHeart, FiShoppingCart, FiZap, FiCheck, FiTruck,
  FiRefreshCw, FiShield, FiShare2, FiChevronLeft
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/common/Toast';
import { productService } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import StarRating from '../components/common/StarRating';
import Button from '../components/common/Button';
import { SkeletonCard } from '../components/common/Loader';
import { formatCurrency } from '../utils/formatCurrency';
import { discountPercent } from '../utils/helpers';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    setSelectedImage(0);
    productService.getById(id)
      .then(async p => {
        setProduct(p);
        const rel = await productService.getRelated(p);
        setRelated(rel);
      })
      .catch(() => navigate('/404'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom pt-28 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse ${i === 0 ? 'w-1/3' : i === 1 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const discount = discountPercent(product.originalPrice, product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast(`${product.name} added to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary-600">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary-600 capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate max-w-48">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 xl:gap-16">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-primary-500 shadow-lg shadow-primary-500/20' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div>
              <Link to={`/shop?category=${product.category}`}
                className="text-primary-500 font-semibold text-sm uppercase tracking-wider capitalize hover:underline">
                {product.category}
              </Link>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-1 mb-3">
                {product.name}
              </h1>
              <StarRating rating={product.rating.average} count={product.rating.count} size="md" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                  <span className="badge bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-lg">−</button>
                  <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-lg">+</button>
                </div>
                <span className="text-sm text-gray-500">{product.stock} available</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant={isInCart(product.id) ? 'secondary' : 'primary'}
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                icon={<FiShoppingCart className="w-5 h-5" />}
                disabled={product.stock === 0}
              >
                {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button variant="accent" size="lg" fullWidth onClick={handleBuyNow}
                icon={<FiZap className="w-5 h-5" />} disabled={product.stock === 0}>
                Buy Now
              </Button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { toggleWishlist(product.id); toast(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist!', 'info'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  isWishlisted(product.id)
                    ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-500'
                }`}>
                {isWishlisted(product.id) ? <FaHeart className="w-4 h-4" /> : <FiHeart className="w-4 h-4" />}
                Wishlist
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all">
                <FiShare2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Features */}
            {product.features && (
              <div className="bg-gray-50 dark:bg-dark-800 rounded-2xl p-5">
                <p className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Key Features</p>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <FiCheck className="w-4 h-4 text-green-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <FiTruck />, text: 'Free Shipping' },
                { icon: <FiRefreshCw />, text: '30-Day Return' },
                { icon: <FiShield />, text: '2-Year Warranty' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 dark:bg-dark-800 rounded-xl text-center">
                  <span className="text-primary-500">{icon}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-8">
            {['description', 'features', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-medium text-sm capitalize transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl text-lg">
                {product.description}
              </p>
            </motion.div>
          )}
          {activeTab === 'features' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="grid sm:grid-cols-2 gap-4 max-w-2xl">
              {product.features?.map(f => (
                <div key={f} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-dark-800 rounded-xl">
                  <FiCheck className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{f}</span>
                </div>
              ))}
            </motion.div>
          )}
          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="font-display text-6xl font-bold text-gray-900 dark:text-white">{product.rating.average}</div>
              <StarRating rating={product.rating.average} count={product.rating.count} size="lg" />
              <p className="text-gray-500">Based on {product.rating.count.toLocaleString()} verified reviews</p>
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="section-heading mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
