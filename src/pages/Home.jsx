import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiStar, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import StarRating from '../components/common/StarRating';
import Button from '../components/common/Button';
import { productService } from '../services/productService';
import { categories, testimonials } from '../data/products';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productService.getFeatured().then(setFeatured);
    productService.getBestSellers().then(setBestSellers);
    productService.getNewArrivals().then(setNewArrivals);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-primary-950 to-gray-950">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="container-custom relative z-10 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 mb-6">
              <FiStar className="w-4 h-4 text-primary-400" />
              <span className="text-primary-300 text-sm font-medium">Premium Shopping Experience</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
              Discover
              <span className="block gradient-text">Premium</span>
              Products
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              Handpicked luxury items delivered straight to you. From cutting-edge electronics to timeless fashion — curated for those who appreciate quality.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/shop')}
                iconRight={<FiArrowRight />}>
                Shop Now
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/about')}>
                Our Story
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 mt-10">
              {[['10K+', 'Happy Customers'], ['500+', 'Premium Products'], ['99%', 'Satisfaction Rate']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-bold text-white">{n}</p>
                  <p className="text-gray-500 text-xs">{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80 xl:w-96 xl:h-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/30 to-accent-500/20 backdrop-blur-sm border border-white/10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                  alt="Premium product"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              {/* Floating badges */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs text-gray-500">New Arrival</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">Smart Watch Pro</p>
                <p className="text-primary-500 font-bold">$299.99</p>
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">4.9/5</p>
                  <p className="text-xs text-gray-500">2.4k reviews</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 dark:bg-dark-900 border-y border-gray-100 dark:border-gray-800">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiTruck />, title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: <FiRefreshCw />, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: <FiShield />, title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { icon: <FiShoppingBag />, title: '24/7 Support', desc: 'Always here to help' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-custom py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2">Explore</p>
          <h2 className="section-heading">Shop by Category</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Link to={`/shop?category=${cat.id}`}
                className="flex flex-col items-center gap-3 p-5 card card-hover text-center group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.count} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 dark:bg-dark-900 py-20">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2">Handpicked</p>
              <h2 className="section-heading">Featured Products</h2>
            </motion.div>
            <Link to="/shop" className="text-primary-600 dark:text-primary-400 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-accent-500 p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Summer Sale is Here! 🌞
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-lg mx-auto">
              Up to 40% off on selected items. Limited time offer — don't miss out.
            </p>
            <Button variant="ghost" size="lg"
              className="!bg-white !text-primary-700 hover:!bg-primary-50 shadow-xl"
              onClick={() => navigate('/shop')}
              iconRight={<FiArrowRight />}>
              Shop the Sale
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Best Sellers */}
      <section className="bg-gray-50 dark:bg-dark-900 py-20">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-accent-500 font-semibold text-sm uppercase tracking-widest mb-2">Top Picks</p>
              <h2 className="section-heading">Best Sellers</h2>
            </motion.div>
            <Link to="/shop?sort=popular" className="text-primary-600 dark:text-primary-400 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              See All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-custom py-20">
        <div className="flex items-end justify-between mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2">Just In</p>
            <h2 className="section-heading">New Arrivals</h2>
          </motion.div>
          <Link to="/shop?sort=newest" className="text-primary-600 dark:text-primary-400 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View All <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-primary-950 to-gray-950 py-20">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="section-heading text-white">What Our Customers Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <StarRating rating={t.rating} showCount={false} size="md" />
                <p className="text-gray-300 text-sm leading-relaxed mt-3 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} · {t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
