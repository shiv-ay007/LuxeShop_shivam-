import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';

const contactInfo = [
  { icon: <FiMapPin />, label: 'Address', value: '123 Luxury Ave, New York, NY 10001', color: 'text-primary-500' },
  { icon: <FiPhone />, label: 'Phone', value: '+1 (555) 123-4567', color: 'text-accent-500' },
  { icon: <FiMail />, label: 'Email', value: 'hello@luxeshop.com', color: 'text-blue-500' },
  { icon: <FiClock />, label: 'Hours', value: 'Mon–Fri: 9am–6pm EST', color: 'text-green-500' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    toast('Message sent! We\'ll be in touch within 24 hours. 📬', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom max-w-6xl">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16">
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="section-heading mb-4">We'd Love to Hear From You</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have a question, feedback, or just want to say hi? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="card p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Contact Information</h3>
              {contactInfo.map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${item.color} shrink-0 mt-0.5`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }} className="card p-6">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
                  <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* FAQ quick links */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }} className="card p-6">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4">Common Topics</h3>
              <div className="space-y-2">
                {['Order Tracking', 'Returns & Refunds', 'Shipping Policy', 'Product Questions', 'Account Help'].map(t => (
                  <button key={t}
                    onClick={() => setForm(prev => ({ ...prev, subject: t }))}
                    className="w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="card p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Alex Johnson" className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className="input-field" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange}
                    placeholder="How can we help?" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    rows={5} placeholder="Tell us more…"
                    className="input-field resize-none" required />
                </div>
                <Button type="submit" variant="primary" size="lg" loading={loading}
                  icon={<FiSend className="w-4 h-4" />}>
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Map placeholder */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="card overflow-hidden">
              <div className="relative h-60 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-dark-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-3">🗺️</div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">123 Luxury Ave, New York</p>
                  <p className="text-sm text-gray-500 mt-1">NY 10001, United States</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    Open in Google Maps →
                  </a>
                </div>
                {/* Decorative dots */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle, #d946ef 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
