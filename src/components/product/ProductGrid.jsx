import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { SkeletonGrid } from '../common/Loader';

const ProductGrid = ({ products, loading = false, emptyMessage = 'No products found.' }) => {
  if (loading) return <SkeletonGrid count={8} />;

  if (!products?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="font-display text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
