// Product service – uses local mock data; swap for real API calls in production
import {
  products,
  getProductById,
  getRelatedProducts,
  searchProducts,
  getFeaturedProducts,
  getBestSellers,
  getNewArrivals,
  getProductsByCategory,
} from '../data/products';
import { sortProducts, filterByPrice } from '../utils/helpers';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const productService = {
  async getAll({ category, sort, minPrice = 0, maxPrice = Infinity, search } = {}) {
    await delay();
    let result = [...products];
    if (search) result = searchProducts(search);
    if (category && category !== 'all') result = result.filter(p => p.category === category);
    result = filterByPrice(result, minPrice, maxPrice);
    if (sort) result = sortProducts(result, sort);
    return result;
  },

  async getById(id) {
    await delay(200);
    const product = getProductById(id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  async getRelated(product) {
    await delay(200);
    return getRelatedProducts(product);
  },

  async getFeatured() {
    await delay(200);
    return getFeaturedProducts();
  },

  async getBestSellers() {
    await delay(200);
    return getBestSellers();
  },

  async getNewArrivals() {
    await delay(200);
    return getNewArrivals();
  },

  async getByCategory(category) {
    await delay(200);
    return getProductsByCategory(category);
  },

  async search(query) {
    await delay(150);
    return searchProducts(query);
  },
};
