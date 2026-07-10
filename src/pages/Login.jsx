import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';

const Login = () => {
  const [form, setForm] = useState({ email: 'demo@luxeshop.com', password: 'demo1234' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast('Welcome back! 👋', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-900">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">L</div>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="text-gray-500 mt-1">Sign in to your LuxeShop account</p>
          </div>

          {/* Demo hint */}
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-3 mb-6 text-sm text-primary-700 dark:text-primary-300">
            <strong>Demo account:</strong> demo@luxeshop.com / demo1234
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" className="input-field pl-11" required />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={handleChange} placeholder="••••••••" className="input-field pl-11 pr-11" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
