import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import SearchBar from '../components/common/SearchBar';
import { productService } from '../services/productService';
import { ITEMS_PER_PAGE } from '../utils/constants';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);

  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'default';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: initialCategory,
    sort: initialSort,
    priceRange: null,
    search: initialSearch,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await productService.getAll({
        category: filters.category === 'all' ? null : filters.category,
        sort: filters.sort,
        minPrice: filters.priceRange?.min ?? 0,
        maxPrice: filters.priceRange?.max ?? Infinity,
        search: filters.search,
      });
      setProducts(result);
      setPage(1);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'category') setSearchParams(value !== 'all' ? { category: value } : {});
  };

  const handleReset = () => {
    setFilters({ category: 'all', sort: 'default', priceRange: null, search: '' });
    setSearchParams({});
  };

  const displayed = products.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = displayed.length < products.length;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <h1 className="section-heading mb-1">Shop All Products</h1>
          <p className="text-gray-500">
            {loading ? 'Loading…' : `${products.length} products found`}
          </p>
        </motion.div>

        {/* Search + Filter Bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1">
            <SearchBar
              placeholder="Search products…"
              onClose={() => {}}
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary-400 transition-colors shrink-0 md:hidden"
          >
            <FiFilter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-24">
              <ProductFilter filters={filters} onChange={handleFilterChange} onReset={handleReset} />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={displayed} loading={loading} />

            {/* Load More */}
            {!loading && hasMore && (
              <div className="flex justify-center mt-10">
                <button onClick={() => setPage(p => p + 1)}
                  className="btn-secondary">
                  Load More ({products.length - displayed.length} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setShowFilter(false)}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            onClick={e => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-72 glass overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
              <button onClick={() => setShowFilter(false)}><FiX /></button>
            </div>
            <ProductFilter filters={filters} onChange={(k, v) => { handleFilterChange(k, v); setShowFilter(false); }} onReset={() => { handleReset(); setShowFilter(false); }} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Shop;
