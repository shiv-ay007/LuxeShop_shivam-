import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { searchProducts } from '../../data/products';
import { debounce } from '../../utils/helpers';

const SearchBar = ({ onClose, placeholder = 'Search products…' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { inputRef.current?.focus(); }, []);

  const doSearch = debounce((q) => {
    if (q.trim().length < 2) { setResults([]); setOpen(false); return; }
    const found = searchProducts(q).slice(0, 6);
    setResults(found);
    setOpen(true);
  }, 300);

  const handleChange = (e) => {
    setQuery(e.target.value);
    doSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    onClose?.();
  };

  const clear = () => { setQuery(''); setResults([]); setOpen(false); inputRef.current?.focus(); };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="input-field pl-12 pr-12"
        />
        {query && (
          <button type="button" onClick={clear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <FiX className="w-5 h-5" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full mt-2 left-0 right-0 glass rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {results.map(p => (
              <button key={p.id} onClick={() => handleSelect(p)}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors text-left">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{p.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{p.category} · ${p.price}</p>
                </div>
              </button>
            ))}
            <button onClick={handleSubmit}
              className="flex items-center gap-2 w-full px-4 py-3 text-primary-600 dark:text-primary-400 font-medium text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 border-t border-gray-100 dark:border-gray-700">
              <FiSearch className="w-4 h-4" />
              See all results for "{query}"
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
