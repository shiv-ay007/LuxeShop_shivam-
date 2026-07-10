import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1">
                <AppRoutes />
              </div>
              <Footer />
            </div>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
