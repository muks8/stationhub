import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../utils/mockData';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 mb-8 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <div className="inline-block bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                {product.category}
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  ₹{product.price}
                </span>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all text-lg font-semibold"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3">Product Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Premium quality materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Durable and long-lasting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Perfect for students and professionals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Fast delivery available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
