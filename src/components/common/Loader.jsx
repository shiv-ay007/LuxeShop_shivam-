import { motion } from 'framer-motion';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin ${className}`}
      style={{ borderWidth: '3px' }} />
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-dark-950">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 rounded-full animate-spin"
          style={{ borderTopColor: '#d946ef' }} />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">✨</div>
      </div>
      <p className="font-display text-xl text-gray-700 dark:text-gray-300">Loading LuxeShop…</p>
    </motion.div>
  </div>
);

export const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

const Loader = PageLoader;
export default Loader;
