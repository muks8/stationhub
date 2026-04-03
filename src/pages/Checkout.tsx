import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { CheckoutFormData } from '../types';

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'cod',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (method: 'cod' | 'upi' | 'card') => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('lastOrder', JSON.stringify({
        ...formData,
        items: cart,
        total: getTotalPrice(),
        orderDate: new Date().toISOString(),
      }));
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-blue-100 text-lg">Complete your order</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-500 focus:outline-none resize-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('cod')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                  formData.paymentMethod === 'cod'
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Wallet className="h-6 w-6 text-cyan-600" />
                <span className="font-semibold text-gray-800">Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => handlePaymentMethodChange('upi')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                  formData.paymentMethod === 'upi'
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Smartphone className="h-6 w-6 text-cyan-600" />
                <span className="font-semibold text-gray-800">UPI Payment</span>
              </button>

              <button
                type="button"
                onClick={() => handlePaymentMethodChange('card')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                  formData.paymentMethod === 'card'
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <CreditCard className="h-6 w-6 text-cyan-600" />
                <span className="font-semibold text-gray-800">Credit/Debit Card</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-2xl font-bold">
                <span className="text-gray-800">Total Amount</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  ₹{getTotalPrice()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
