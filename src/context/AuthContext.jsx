import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS_KEY = 'luxeshop_users';
const CURRENT_USER_KEY = 'luxeshop_current_user';

// Demo user pre-seeded
const seedUser = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'demo@luxeshop.com',
  password: 'demo1234',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
  phone: '+1 555 123 4567',
  addresses: [
    { id: 'a1', label: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'USA', isDefault: true },
  ],
  orders: [
    { id: 'ORD-ABC123', date: '2024-03-01', status: 'delivered', total: 329.97, items: 3 },
    { id: 'ORD-DEF456', date: '2024-02-15', status: 'shipped', total: 189.99, items: 1 },
  ],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize seed user
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    if (!users.find(u => u.email === seedUser.email)) {
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([...users, seedUser]));
    }
    // Restore session
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); }
      catch { localStorage.removeItem(CURRENT_USER_KEY); }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password.');
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    return safeUser;
  };

  const register = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    if (users.find(u => u.email === email)) throw new Error('Email already registered.');
    const newUser = {
      id: 'u' + Date.now(),
      name, email, password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d946ef&color=fff`,
      phone: '',
      addresses: [],
      orders: [],
    };
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
    // Also update in users list
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(
      users.map(u => u.id === updated.id ? { ...u, ...updates } : u)
    ));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
