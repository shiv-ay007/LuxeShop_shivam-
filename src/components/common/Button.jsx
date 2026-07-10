import { motion } from 'framer-motion';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium py-2 px-4 rounded-lg transition-all duration-200',
  danger: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/20',
  icon: 'p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-600 dark:text-gray-300',
};

const sizes = {
  sm: 'text-sm py-2 px-4',
  md: '',
  lg: 'text-lg py-4 px-8',
  xl: 'text-xl py-5 px-10',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  fullWidth = false,
  icon,
  iconRight,
  ...props
}) => {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
    </motion.button>
  );
};

export default Button;
