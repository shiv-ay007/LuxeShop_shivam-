import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { categories } from '../../data/products';
import { PRICE_RANGES, SORT_OPTIONS } from '../../utils/constants';

const ProductFilter = ({ filters, onChange, onReset }) => {
  const hasActive = filters.category !== 'all' || filters.sort !== 'default' || filters.priceRange !== null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
        {hasActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:underline"
          >
            <FiX className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Sort By</h4>
        <div className="space-y-1">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange('sort', opt.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                filters.sort === opt.value
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => onChange('category', 'all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
              filters.category === 'all'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onChange('category', cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-all ${
                filters.category === cat.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="ml-auto text-xs opacity-60">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Price Range</h4>
        <div className="space-y-1">
          <button
            onClick={() => onChange('priceRange', null)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
              filters.priceRange === null
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            All Prices
          </button>
          {PRICE_RANGES.map((range, i) => (
            <button
              key={i}
              onClick={() => onChange('priceRange', range)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                filters.priceRange?.label === range.label
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default ProductFilter;
