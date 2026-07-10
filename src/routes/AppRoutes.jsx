import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLoader } from '../components/common/Loader';

// Lazy-loaded pages for code-splitting
const Home        = lazy(() => import('../pages/Home'));
const Shop        = lazy(() => import('../pages/Shop'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const Cart        = lazy(() => import('../pages/Cart'));
const Checkout    = lazy(() => import('../pages/Checkout'));
const Login       = lazy(() => import('../pages/Login'));
const Register    = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Dashboard   = lazy(() => import('../pages/Dashboard'));
const Contact     = lazy(() => import('../pages/Contact'));
const About       = lazy(() => import('../pages/About'));
const NotFound    = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/"                element={<Home />} />
      <Route path="/shop"            element={<Shop />} />
      <Route path="/product/:id"     element={<ProductPage />} />
      <Route path="/cart"            element={<Cart />} />
      <Route path="/checkout"        element={<Checkout />} />
      <Route path="/login"           element={<Login />} />
      <Route path="/register"        element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard"       element={<Dashboard />} />
      <Route path="/contact"         element={<Contact />} />
      <Route path="/about"           element={<About />} />
      <Route path="*"                element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
