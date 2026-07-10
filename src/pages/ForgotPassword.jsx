import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
    toast('Reset link sent! Check your inbox.', 'success');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-900">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="card p-8 md:p-10">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl mx-auto mb-4">
                  <FiMail className="w-7 h-7" />
                </div>
                <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Forgot Password?</h1>
                <p className="text-gray-500 mt-2">No worries — enter your email and we'll send you a reset link.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com" className="input-field pl-11" required />
                  </div>
                </div>
                <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-gray-500 mb-6">We sent a password reset link to <strong className="text-gray-800 dark:text-gray-200">{email}</strong></p>
              <p className="text-sm text-gray-400">Didn't receive it?{' '}
                <button onClick={() => setSent(false)} className="text-primary-600 dark:text-primary-400 hover:underline">Resend</button>
              </p>
            </motion.div>
          )}

          <Link to="/login" className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
