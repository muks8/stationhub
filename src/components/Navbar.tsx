import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-2xl hover:scale-105 transition-transform">
            <BookOpen className="h-8 w-8" />
            <span>StationHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-yellow-200 transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-yellow-200 transition-colors font-medium">
              Products
            </Link>
            <Link to="/cart" className="text-white hover:text-yellow-200 transition-colors font-medium flex items-center space-x-1 relative">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Welcome {user?.displayName}</span>
            </div>
            <button
              onClick={logout}
              className="bg-white text-cyan-600 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-all flex items-center space-x-2 font-medium shadow-md hover:shadow-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex justify-around pb-3">
          <Link to="/" className="text-white hover:text-yellow-200 transition-colors text-sm font-medium">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-yellow-200 transition-colors text-sm font-medium">
            Products
          </Link>
          <Link to="/cart" className="text-white hover:text-yellow-200 transition-colors text-sm font-medium flex items-center space-x-1 relative">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
