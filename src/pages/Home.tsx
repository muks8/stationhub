import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../utils/mockData';

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to StationHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Your Premium Destination for Quality Stationery
            </p>
            <div className="flex justify-center items-center space-x-2 mb-8">
              <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
              <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
              <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
              <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
              <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
              <span className="ml-2 text-lg">Rated 5/5 by our customers</span>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-white text-cyan-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-200 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
          >
            <span>View All Products</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600">On orders above ₹999</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Products</h3>
              <p className="text-gray-600">100% authentic stationery</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">💯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600">7-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
