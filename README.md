# LuxeShop — Premium E-Commerce Platform

A fully-featured, production-ready e-commerce web app built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **React Router DOM**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Demo Account

| Field    | Value                  |
|----------|------------------------|
| Email    | `demo@luxeshop.com`    |
| Password | `demo1234`             |

---

## 📦 Tech Stack

| Tool              | Purpose                         |
|-------------------|---------------------------------|
| React 18 + Vite   | UI framework + lightning builds |
| Tailwind CSS 3    | Utility-first styling           |
| Framer Motion     | Animations & transitions        |
| React Router DOM  | Client-side routing             |
| React Icons       | Icon library                    |
| Axios             | HTTP client (ready for APIs)    |
| Context API       | Global state management         |
| localStorage      | Cart & wishlist persistence     |

---

## 📁 Project Structure

```
src/
├── assets/              Static assets
├── components/
│   ├── common/          Button, Loader, SearchBar, Modal, StarRating, Toast
│   ├── layout/          Navbar, Footer, Sidebar (CartSidebar)
│   └── product/         ProductCard, ProductGrid, ProductFilter
├── context/             CartContext, WishlistContext, AuthContext
├── data/                products.js (mock product data)
├── hooks/               useDarkMode, useLocalStorage
├── pages/               Home, Shop, ProductPage, Cart, Checkout,
│                        Login, Register, ForgotPassword, Dashboard,
│                        Contact, About, NotFound
├── routes/              AppRoutes.jsx (lazy-loaded)
├── services/            api.js, productService.js
├── utils/               constants.js, helpers.js, formatCurrency.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✨ Features

### Pages
- **Home** — Hero, categories, featured products, banner CTA, best sellers, new arrivals, testimonials
- **Shop** — Product grid, category/sort/price filters, search, pagination
- **Product Detail** — Image gallery, ratings, quantity selector, add to cart / buy now, related products
- **Cart** — Full cart management, promo code input, order summary
- **Checkout** — 3-step flow: shipping → payment → review + place order
- **Auth** — Login, Register (with password strength), Forgot Password
- **Dashboard** — Profile editor, order history, saved addresses, wishlist
- **Contact** — Contact form, company info, map
- **About** — Story, mission/vision, stats, values, timeline, team
- **404** — Animated custom error page

### Global Features
- 🌙 **Dark Mode** — System preference + toggle, persisted to localStorage
- 🔔 **Toast Notifications** — Success, error, and info toasts
- 🔍 **Real-time Search** — Debounced with inline results dropdown
- 🛒 **Persistent Cart** — Survives page refresh via localStorage
- ❤️ **Wishlist** — Toggle from any product card or product page
- 📱 **Fully Responsive** — Mobile, tablet, laptop, desktop
- ⚡ **Code Splitting** — All pages lazy-loaded for fast initial load
- 🎨 **Framer Motion** — Page fades, card animations, modal springs, scroll reveals

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js` → `theme.extend.colors` to change the primary/accent palette.

### Products
Edit `src/data/products.js` to add, remove, or modify product data.

### API Integration
Replace `src/services/productService.js` functions with real API calls. The `src/services/api.js` Axios instance is pre-configured with auth headers.

---

## 📝 Notes

- All data is **local/mock** — no backend required to run
- Authentication uses **localStorage** (not secure for production — replace with JWT/OAuth)
- Payments are **simulated** — integrate Stripe/PayPal in a real deployment
- Images use **Unsplash** CDN links — replace with your own in production

---

## 📄 License

MIT — free to use and modify.
"# LuxeShop_shivam-" 
