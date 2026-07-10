import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getStars } from '../../utils/helpers';

const StarRating = ({ rating, count, size = 'sm', showCount = true }) => {
  const { full, half, empty } = getStars(rating);
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={`f${i}`} className={`${sizes[size]} text-amber-400`} />
        ))}
        {half === 1 && <FaStarHalfAlt className={`${sizes[size]} text-amber-400`} />}
        {Array.from({ length: empty }).map((_, i) => (
          <FaRegStar key={`e${i}`} className={`${sizes[size]} text-gray-300 dark:text-gray-600`} />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {rating.toFixed(1)} ({count?.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default StarRating;
