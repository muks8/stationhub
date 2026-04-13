import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OrderSuccess() {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Order Placed Successfully!</h1>
              <p className="text-green-100 text-lg">Thank you for shopping with us</p>
            </div>

            <div className="p-8">
              {orderData && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <Package className="h-6 w-6 text-cyan-600" />
                      <span>Order Details</span>
                    </h2>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <span className="font-semibold">Name:</span> {orderData.name}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span> {orderData.phone}
                      </p>
                      <p>
                        <span className="font-semibold">Address:</span> {orderData.address}
                      </p>
                      <p>
                        <span className="font-semibold">Payment Method:</span>{' '}
                        {orderData.paymentMethod === 'cod'
                          ? 'Cash on Delivery'
                          : orderData.paymentMethod === 'upi'
                          ? 'UPI Payment'
                          : 'Credit/Debit Card'}
                      </p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mt-4">
                        Total: ₹{orderData.total}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Items Ordered:</h3>
                    <div className="space-y-2">
                      {orderData.items.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-gray-600 bg-gray-50 p-3 rounded-lg"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <p className="text-yellow-800">
                      <span className="font-semibold">Estimated Delivery:</span> 3-5 business days
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-3">
                <Link
                  to="/"
                  className="block w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-center font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>Back to Home</span>
                </Link>
                <Link
                  to="/products"
                  className="block w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 transition-all text-center font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
