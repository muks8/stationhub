import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
        <div className="relative overflow-hidden h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {product.category}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              ₹{product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
