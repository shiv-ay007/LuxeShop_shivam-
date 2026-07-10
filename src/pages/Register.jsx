import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const passwordStrength = (p) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-yellow-400', 'bg-green-500'][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast('Passwords do not match.', 'error');
      return;
    }
    if (form.password.length < 6) {
      toast('Password must be at least 6 characters.', 'error');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast('Account created! Welcome to LuxeShop 🎉', 'success');
      navigate('/');
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
        <div className="card p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">✨</div>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="text-gray-500 mt-1">Join thousands of happy shoppers</p>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {['Free shipping on orders $100+', 'Exclusive member deals', 'Easy order tracking', '30-day returns'].map(p => (
              <div key={p} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                <FiCheck className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                {p}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Alex Johnson" className="input-field pl-11" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" className="input-field pl-11" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={handleChange} placeholder="At least 6 characters" className="input-field pl-11 pr-11" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-gray-200 dark:bg-gray-700'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength >= 3 ? 'text-green-500' : strength >= 2 ? 'text-amber-500' : 'text-red-500'}`}>
                    {strengthLabel} password
                  </p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
                  placeholder="Repeat your password" className="input-field pl-11" required />
                {form.confirm && (
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center ${form.password === form.confirm ? 'text-green-500' : 'text-red-500'}`}>
                    <FiCheck className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400">
              By creating an account you agree to our{' '}
              <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link> and{' '}
              <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>.
            </p>

            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
