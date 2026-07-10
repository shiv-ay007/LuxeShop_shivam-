import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUser, FiPackage, FiMapPin, FiHeart, FiEdit2, FiSave,
  FiLogOut, FiChevronRight, FiPlus, FiTrash2
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { ORDER_STATUSES } from '../utils/constants';
import { formatCurrency } from '../utils/formatCurrency';

const tabs = [
  { id: 'profile', label: 'Profile', icon: <FiUser /> },
  { id: 'orders', label: 'Orders', icon: <FiPackage /> },
  { id: 'addresses', label: 'Addresses', icon: <FiMapPin /> },
  { id: 'wishlist', label: 'Wishlist', icon: <FiHeart /> },
];

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const { user, logout, updateProfile, isLoggedIn } = useAuth();
  const { items: wishlistIds } = useWishlist();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { state: { from: '/dashboard' } });
  }, [isLoggedIn]);

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t) setActiveTab(t);
  }, [searchParams]);

  if (!user) return null;

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-dark-900">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <button onClick={() => { logout(); navigate('/'); toast('Logged out successfully', 'info'); }}
            className="ml-auto flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors">
            <FiLogOut className="w-4 h-4" /> Logout
          </button>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-56 shrink-0">
            <nav className="card p-2 space-y-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                  {tab.icon}
                  {tab.label}
                  <FiChevronRight className={`w-3.5 h-3.5 ml-auto transition-transform ${activeTab === tab.id ? 'text-primary-500' : 'opacity-0'}`} />
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'profile' && <ProfileTab user={user} updateProfile={updateProfile} toast={toast} />}
            {activeTab === 'orders' && <OrdersTab orders={user.orders || []} />}
            {activeTab === 'addresses' && <AddressesTab addresses={user.addresses || []} />}
            {activeTab === 'wishlist' && <WishlistTab products={wishlistProducts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ user, updateProfile, toast }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone || '' });

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    toast('Profile updated!', 'success');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
        <button onClick={() => editing ? handleSave() : setEditing(true)}
          className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline">
          {editing ? <><FiSave className="w-4 h-4" /> Save</> : <><FiEdit2 className="w-4 h-4" /> Edit</>}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover" />
        {editing && (
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Profile Photo</p>
            <p className="text-xs text-gray-400">Avatar is auto-generated from your name</p>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { label: 'Full Name', key: 'name', placeholder: 'Your name' },
          { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
          { label: 'Phone Number', key: 'phone', placeholder: '+1 555 0000' },
        ].map(field => (
          <div key={field.key} className={field.key === 'phone' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
            {editing ? (
              <input type={field.type || 'text'} value={form[field.key]}
                onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={field.placeholder} className="input-field" />
            ) : (
              <p className="px-4 py-3 bg-gray-50 dark:bg-dark-800 rounded-xl text-gray-700 dark:text-gray-300 text-sm">
                {user[field.key] || <span className="text-gray-400 italic">Not provided</span>}
              </p>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="flex gap-3 mt-6">
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      )}
    </motion.div>
  );
};

const OrdersTab = ({ orders }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Order History</h2>
    {orders.length === 0 ? (
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4">📦</div>
        <p className="text-gray-500">No orders yet.</p>
        <Link to="/shop" className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:underline font-medium">
          Start Shopping
        </Link>
      </div>
    ) : orders.map(order => (
      <div key={order.id} className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-mono font-bold text-gray-900 dark:text-white text-sm">{order.id}</p>
          <p className="text-xs text-gray-500 mt-0.5">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-xs text-gray-500">{order.items} item{order.items !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`badge text-xs font-semibold ${ORDER_STATUSES[order.status]?.color || 'bg-gray-100 text-gray-600'}`}>
            {ORDER_STATUSES[order.status]?.label || order.status}
          </span>
          <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.total)}</p>
        </div>
      </div>
    ))}
  </motion.div>
);

const AddressesTab = ({ addresses }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Saved Addresses</h2>
      <button className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline">
        <FiPlus className="w-4 h-4" /> Add Address
      </button>
    </div>
    {addresses.length === 0 ? (
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4">📍</div>
        <p className="text-gray-500">No addresses saved yet.</p>
      </div>
    ) : addresses.map(addr => (
      <div key={addr.id} className="card p-5 flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
            <FiMapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{addr.label}</p>
              {addr.isDefault && <span className="badge bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs">Default</span>}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
            <p className="text-sm text-gray-500">{addr.country}</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"><FiEdit2 className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><FiTrash2 className="w-4 h-4" /></button>
        </div>
      </div>
    ))}
  </motion.div>
);

const WishlistTab = ({ products }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">
      Wishlist ({products.length})
    </h2>
    {products.length === 0 ? (
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4">💝</div>
        <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
        <Link to="/shop" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
          Discover Products
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    )}
  </motion.div>
);

export default Dashboard;
