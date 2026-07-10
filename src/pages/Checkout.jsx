import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiLock } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { PAYMENT_METHODS, SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../utils/constants';
import { generateOrderId } from '../utils/helpers';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shipping, setShipping] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  if (items.length === 0 && step !== 2) {
    navigate('/cart');
    return null;
  }

  const handleShippingChange = (e) => {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    const orderId = generateOrderId();
    clearCart();
    toast(`Order ${orderId} placed successfully! 🎉`, 'success', 5000);
    navigate('/dashboard?tab=orders');
  };

  const OrderSummary = () => (
    <div className="card p-6 sticky top-24">
      <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
            </div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className={shippingCost === 0 ? 'text-green-500' : ''}>{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax</span><span>{formatCurrency(tax)}</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between font-bold text-base text-gray-900 dark:text-white">
          <span>Total</span><span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-dark-900">
      <div className="container-custom max-w-5xl">
        <h1 className="section-heading mb-8 text-center">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                i === step ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30' :
                i < step ? 'text-green-600' : 'text-gray-400'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {i < step ? <FiCheck className="w-3.5 h-3.5" /> : i + 1}
                </div>
                {s}
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card p-6">
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', label: 'First Name', placeholder: 'John' },
                    { name: 'lastName', label: 'Last Name', placeholder: 'Doe' },
                    { name: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email', full: true },
                    { name: 'phone', label: 'Phone', placeholder: '+1 555 0000', type: 'tel' },
                    { name: 'address', label: 'Address', placeholder: '123 Main St', full: true },
                    { name: 'city', label: 'City', placeholder: 'New York' },
                    { name: 'state', label: 'State', placeholder: 'NY' },
                    { name: 'zip', label: 'ZIP Code', placeholder: '10001' },
                  ].map(field => (
                    <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type || 'text'}
                        value={shipping[field.name]}
                        onChange={handleShippingChange}
                        placeholder={field.placeholder}
                        className="input-field"
                      />
                    </div>
                  ))}
                </div>
                <Button variant="primary" size="lg" fullWidth className="mt-6" onClick={() => setStep(1)}>
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6">
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(method => (
                    <label key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'
                      }`}
                    >
                      <input type="radio" name="payment" value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only" />
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{method.label}</span>
                      {paymentMethod === method.id && (
                        <FiCheck className="w-5 h-5 text-primary-500 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                      <input placeholder="1234 5678 9012 3456" className="input-field" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry</label>
                        <input placeholder="MM / YY" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                        <input placeholder="•••" className="input-field" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button variant="secondary" onClick={() => setStep(0)} fullWidth>Back</Button>
                  <Button variant="primary" onClick={() => setStep(2)} fullWidth>Review Order</Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6 space-y-5">
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Review Your Order</h2>
                <div className="bg-gray-50 dark:bg-dark-800 rounded-2xl p-4 text-sm space-y-1">
                  <p className="font-medium text-gray-900 dark:text-white">Ship to:</p>
                  <p className="text-gray-500">{shipping.firstName} {shipping.lastName}</p>
                  <p className="text-gray-500">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                  <p className="text-gray-500">{shipping.email}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-800 rounded-2xl p-4 text-sm">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Payment:</p>
                  <p className="text-gray-500">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 dark:bg-dark-800 rounded-xl p-3">
                  <FiLock className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  Your payment information is encrypted and secure.
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(1)} fullWidth>Back</Button>
                  <Button variant="accent" size="lg" fullWidth loading={submitting} onClick={handlePlaceOrder}>
                    Place Order — {formatCurrency(total)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div><OrderSummary /></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
