// Mock product data for the e-commerce store
export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '💻', color: 'from-blue-500 to-cyan-400', count: 48 },
  { id: 'fashion', name: 'Fashion', icon: '👗', color: 'from-pink-500 to-rose-400', count: 124 },
  { id: 'home', name: 'Home & Living', icon: '🏠', color: 'from-amber-500 to-orange-400', count: 67 },
  { id: 'beauty', name: 'Beauty', icon: '✨', color: 'from-purple-500 to-pink-400', count: 89 },
  { id: 'sports', name: 'Sports', icon: '⚡', color: 'from-green-500 to-teal-400', count: 53 },
  { id: 'books', name: 'Books', icon: '📚', color: 'from-indigo-500 to-violet-400', count: 201 },
];

const productImages = {
  electronics: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  ],
  home: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
    'https://images.unsplash.com/photo-1583241800698-e8ab01830a22?w=600&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    'https://images.unsplash.com/photo-1546519638405-a9d1ced09a96?w=600&q=80',
  ],
  books: [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80',
    'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&q=80',
  ],
};

const generateRating = () => ({
  average: (3.5 + Math.random() * 1.5).toFixed(1) * 1,
  count: Math.floor(50 + Math.random() * 500),
});

export const products = [
  // Electronics
  { id: 1, name: 'Premium Smart Watch Pro', price: 299.99, originalPrice: 399.99, category: 'electronics', image: productImages.electronics[0], images: [productImages.electronics[0], productImages.electronics[1], productImages.electronics[2]], rating: generateRating(), badge: 'Best Seller', isNew: false, description: 'Experience the future on your wrist. Track fitness, receive notifications, and enjoy a stunning AMOLED display. Water-resistant with 7-day battery life.', features: ['AMOLED Display', 'Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-Day Battery'], stock: 24, tags: ['smartwatch', 'wearable', 'fitness'] },
  { id: 2, name: 'Noise Cancelling Headphones', price: 189.99, originalPrice: 249.99, category: 'electronics', image: productImages.electronics[2], images: [productImages.electronics[2], productImages.electronics[0]], rating: generateRating(), badge: 'Hot', isNew: false, description: 'Immerse yourself in crystal-clear audio with industry-leading noise cancellation. 30-hour battery for all-day listening.', features: ['Active Noise Cancellation', '30hr Battery', 'Premium Drivers', 'Foldable Design', 'Multi-device Connect'], stock: 18, tags: ['audio', 'headphones', 'music'] },
  { id: 3, name: 'Wireless Charging Pad', price: 39.99, originalPrice: 59.99, category: 'electronics', image: productImages.electronics[3], images: [productImages.electronics[3]], rating: generateRating(), badge: null, isNew: true, description: 'Ultra-fast 15W wireless charging for all Qi-compatible devices. Slim and elegant design.', features: ['15W Fast Charging', 'Qi Compatible', 'LED Indicator', 'Anti-slip Surface'], stock: 56, tags: ['charging', 'wireless', 'accessories'] },
  { id: 4, name: 'Pro Gaming Mouse', price: 79.99, originalPrice: 99.99, category: 'electronics', image: productImages.electronics[4], images: [productImages.electronics[4]], rating: generateRating(), badge: null, isNew: true, description: 'Dominate every game with precision. 25,600 DPI optical sensor, 8 programmable buttons, and RGB lighting.', features: ['25,600 DPI Sensor', 'RGB Lighting', '8 Programmable Buttons', 'Ergonomic Design'], stock: 32, tags: ['gaming', 'mouse', 'pc'] },
  { id: 5, name: 'Portable Bluetooth Speaker', price: 59.99, originalPrice: 89.99, category: 'electronics', image: productImages.electronics[5], images: [productImages.electronics[5]], rating: generateRating(), badge: 'Sale', isNew: false, description: '360° immersive sound with deep bass. IPX7 waterproof rating, perfect for outdoor adventures.', features: ['360° Sound', 'IPX7 Waterproof', '12hr Battery', 'Built-in Mic'], stock: 41, tags: ['speaker', 'bluetooth', 'outdoor'] },

  // Fashion
  { id: 6, name: 'Classic White Sneakers', price: 89.99, originalPrice: 120.00, category: 'fashion', image: productImages.fashion[0], images: [productImages.fashion[0], productImages.fashion[2]], rating: generateRating(), badge: 'Best Seller', isNew: false, description: 'Clean, versatile white leather sneakers that elevate every outfit. Hand-stitched with premium Italian leather.', features: ['Premium Leather', 'Memory Foam Insole', 'Rubber Outsole', 'Hand-Stitched'], stock: 63, tags: ['shoes', 'sneakers', 'fashion'] },
  { id: 7, name: 'Premium Running Shoes', price: 129.99, originalPrice: 169.99, category: 'fashion', image: productImages.fashion[1], images: [productImages.fashion[1], productImages.fashion[0]], rating: generateRating(), badge: null, isNew: true, description: 'Maximum performance with adaptive cushioning technology. Breathable mesh upper keeps you cool on long runs.', features: ['Adaptive Cushioning', 'Breathable Mesh', 'Carbon Fiber Plate', 'Lightweight'], stock: 28, tags: ['running', 'shoes', 'sport'] },
  { id: 8, name: 'Luxury Leather Handbag', price: 249.99, originalPrice: 320.00, category: 'fashion', image: productImages.fashion[3], images: [productImages.fashion[3], productImages.fashion[4]], rating: generateRating(), badge: 'Premium', isNew: false, description: 'Crafted from full-grain Italian leather. Structured silhouette with gold-tone hardware and detachable strap.', features: ['Full-Grain Leather', 'Gold Hardware', 'Detachable Strap', 'Multiple Pockets'], stock: 12, tags: ['bag', 'handbag', 'luxury'] },
  { id: 9, name: 'Minimal Summer Dress', price: 69.99, originalPrice: 95.00, category: 'fashion', image: productImages.fashion[4], images: [productImages.fashion[4], productImages.fashion[5]], rating: generateRating(), badge: 'New', isNew: true, description: 'Effortlessly chic linen-blend summer dress. Relaxed silhouette with delicate ruching detail.', features: ['Linen Blend', 'Breathable Fabric', 'Adjustable Straps', 'Pockets'], stock: 37, tags: ['dress', 'summer', 'women'] },
  { id: 10, name: 'Classic Denim Jacket', price: 109.99, originalPrice: 149.99, category: 'fashion', image: productImages.fashion[5], images: [productImages.fashion[5]], rating: generateRating(), badge: null, isNew: false, description: 'Timeless denim jacket crafted from heavyweight cotton. Perfect for layering year-round.', features: ['Heavyweight Denim', 'Button Fastening', 'Chest Pockets', 'Unisex Fit'], stock: 45, tags: ['jacket', 'denim', 'unisex'] },

  // Home & Living
  { id: 11, name: 'Sculptural Floor Lamp', price: 179.99, originalPrice: 229.99, category: 'home', image: productImages.home[0], images: [productImages.home[0], productImages.home[1]], rating: generateRating(), badge: 'Hot', isNew: false, description: 'Statement lighting that transforms any space. Matte black steel with a linen shade for warm, diffused light.', features: ['Matte Black Steel', 'Linen Shade', 'Adjustable Height', 'E27 Bulb Compatible'], stock: 15, tags: ['lamp', 'lighting', 'decor'] },
  { id: 12, name: 'Minimalist Coffee Table', price: 349.99, originalPrice: 449.99, category: 'home', image: productImages.home[1], images: [productImages.home[1], productImages.home[2]], rating: generateRating(), badge: 'Best Seller', isNew: false, description: 'Scandinavian-inspired solid oak coffee table with storage shelf. Perfect balance of form and function.', features: ['Solid Oak', 'Lower Storage Shelf', 'Easy Assembly', 'Protective Coating'], stock: 8, tags: ['furniture', 'table', 'living room'] },
  { id: 13, name: 'Ceramic Vase Set', price: 49.99, originalPrice: 69.99, category: 'home', image: productImages.home[2], images: [productImages.home[2]], rating: generateRating(), badge: 'New', isNew: true, description: 'Set of 3 hand-thrown ceramic vases in complementary earth tones. Each piece is unique.', features: ['Hand-Thrown Ceramic', 'Set of 3', 'Food Safe Glaze', 'Various Sizes'], stock: 29, tags: ['vase', 'ceramic', 'decor'] },
  { id: 14, name: 'Smart Air Purifier', price: 199.99, originalPrice: 269.99, category: 'home', image: productImages.home[3], images: [productImages.home[3]], rating: generateRating(), badge: null, isNew: false, description: 'HEPA filtration removes 99.97% of airborne particles. Smart connectivity with real-time air quality monitoring.', features: ['True HEPA Filter', 'App Control', 'Auto Mode', 'Quiet Operation', 'Air Quality Display'], stock: 22, tags: ['air purifier', 'smart home', 'health'] },

  // Beauty
  { id: 15, name: 'Hydrating Face Serum', price: 58.99, originalPrice: 79.99, category: 'beauty', image: productImages.beauty[0], images: [productImages.beauty[0], productImages.beauty[1]], rating: generateRating(), badge: 'Best Seller', isNew: false, description: 'Clinically proven to boost hydration by 72% in 4 weeks. Hyaluronic acid complex with vitamin C brightening.', features: ['Hyaluronic Acid', 'Vitamin C', 'Fragrance-Free', 'Dermatologist Tested', 'Vegan'], stock: 67, tags: ['serum', 'skincare', 'face'] },
  { id: 16, name: 'Rose Perfume Elixir', price: 95.00, originalPrice: 125.00, category: 'beauty', image: productImages.beauty[1], images: [productImages.beauty[1], productImages.beauty[2]], rating: generateRating(), badge: 'Premium', isNew: false, description: 'A timeless floral fragrance with notes of Bulgarian rose, jasmine, and warm musk. Long-lasting 24hr wear.', features: ['EDP 50ml', 'Bulgarian Rose', '24hr Longevity', 'Refillable Bottle'], stock: 31, tags: ['perfume', 'fragrance', 'rose'] },
  { id: 17, name: 'Natural Glow Kit', price: 44.99, originalPrice: 59.99, category: 'beauty', image: productImages.beauty[2], images: [productImages.beauty[2]], rating: generateRating(), badge: 'New', isNew: true, description: 'Complete glow routine in one kit. Includes highlighter, bronzer, and blush in versatile shades for all skin tones.', features: ['3-in-1 Kit', 'All Skin Tones', 'Buildable Coverage', 'Cruelty-Free'], stock: 48, tags: ['makeup', 'glow', 'highlight'] },
  { id: 18, name: 'Precision Eye Palette', price: 34.99, originalPrice: 49.99, category: 'beauty', image: productImages.beauty[3], images: [productImages.beauty[3]], rating: generateRating(), badge: null, isNew: false, description: '12 expertly curated neutral and smoky shades. Blendable formula, from everyday natural to dramatic evening looks.', features: ['12 Shades', 'Matte & Shimmer', 'Long-Wear', 'Cruelty-Free', 'Refillable'], stock: 55, tags: ['eyeshadow', 'palette', 'makeup'] },

  // Sports
  { id: 19, name: 'Pro Yoga Mat', price: 65.99, originalPrice: 89.99, category: 'sports', image: productImages.sports[0], images: [productImages.sports[0], productImages.sports[1]], rating: generateRating(), badge: 'Best Seller', isNew: false, description: 'Extra-thick 6mm eco-friendly natural rubber mat with non-slip texture. Ideal for yoga, pilates, and stretching.', features: ['6mm Thick', 'Natural Rubber', 'Non-Slip', 'Eco-Friendly', 'Carry Strap'], stock: 72, tags: ['yoga', 'mat', 'fitness'] },
  { id: 20, name: 'Adjustable Dumbbell Set', price: 149.99, originalPrice: 199.99, category: 'sports', image: productImages.sports[1], images: [productImages.sports[1]], rating: generateRating(), badge: 'Hot', isNew: false, description: 'Replace 15 sets of weights with one. Adjust from 5 to 52.5 lbs with a quick turn of the dial.', features: ['5-52.5 lbs Range', 'Quick Adjust Dial', 'Space Saving', 'Premium Steel'], stock: 19, tags: ['dumbbell', 'weights', 'gym'] },
  { id: 21, name: 'Smart Jump Rope', price: 29.99, originalPrice: 44.99, category: 'sports', image: productImages.sports[2], images: [productImages.sports[2]], rating: generateRating(), badge: 'New', isNew: true, description: 'Track your workout with built-in counter. Adjustable cable and ergonomic foam handles for comfortable training.', features: ['Jump Counter', 'Adjustable Cable', 'Foam Handles', 'App Connect'], stock: 84, tags: ['jump rope', 'cardio', 'fitness'] },

  // Books
  { id: 22, name: 'The Art of Mindfulness', price: 19.99, originalPrice: 24.99, category: 'books', image: productImages.books[0], images: [productImages.books[0], productImages.books[1]], rating: generateRating(), badge: 'Best Seller', isNew: false, description: 'A practical guide to cultivating peace and presence in daily life. 280 pages of transformative wisdom.', features: ['280 Pages', 'Hardcover', 'Illustrated', 'Practical Exercises'], stock: 120, tags: ['mindfulness', 'wellness', 'self-help'] },
  { id: 23, name: 'Design Thinking Mastery', price: 32.99, originalPrice: 44.99, category: 'books', image: productImages.books[1], images: [productImages.books[1]], rating: generateRating(), badge: null, isNew: true, description: 'Deep dive into design thinking methodology with real-world case studies from leading companies.', features: ['320 Pages', 'Case Studies', 'Hardcover', 'Full Color'], stock: 78, tags: ['design', 'business', 'creativity'] },
  { id: 24, name: 'Future of Technology', price: 27.99, originalPrice: 35.99, category: 'books', image: productImages.books[2], images: [productImages.books[2]], rating: generateRating(), badge: 'New', isNew: true, description: 'Explore AI, quantum computing, and biotechnology. An accessible guide to the technologies shaping tomorrow.', features: ['350 Pages', 'Paperback', 'Illustrated', 'Research-Based'], stock: 93, tags: ['technology', 'AI', 'future'] },
];

export const testimonials = [
  { id: 1, name: 'Sarah Chen', role: 'Fashion Blogger', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', rating: 5, text: 'LuxeShop has completely transformed my shopping experience. The quality of every item I have ordered has exceeded my expectations. Truly premium!', location: 'New York, USA' },
  { id: 2, name: 'Marcus Rivera', role: 'Tech Enthusiast', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', rating: 5, text: 'The electronics section is outstanding. My smartwatch arrived perfectly packaged and works flawlessly. Fast shipping too!', location: 'London, UK' },
  { id: 3, name: 'Priya Sharma', role: 'Interior Designer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', rating: 5, text: 'I love the home decor collection. Unique pieces you cannot find elsewhere. The ceramic vase set is an absolute masterpiece.', location: 'Mumbai, India' },
  { id: 4, name: 'David Kim', role: 'Fitness Coach', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', rating: 4, text: 'The sports equipment is professional grade. My clients love the yoga mats. Will definitely keep ordering from LuxeShop.', location: 'Seoul, Korea' },
];

export const getFeaturedProducts = () => products.filter((_, i) => i % 5 === 0 || i % 7 === 0).slice(0, 8);
export const getBestSellers = () => products.filter(p => p.badge === 'Best Seller');
export const getNewArrivals = () => products.filter(p => p.isNew).slice(0, 6);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getProductById = (id) => products.find(p => p.id === parseInt(id));
export const getRelatedProducts = (product) => products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
export const searchProducts = (query) => products.filter(p =>
  p.name.toLowerCase().includes(query.toLowerCase()) ||
  p.category.toLowerCase().includes(query.toLowerCase()) ||
  p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
);
