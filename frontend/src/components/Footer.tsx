import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400">About StationHub</h3>
            <p className="text-gray-300">
              Your one-stop shop for all stationery needs. Quality products at affordable prices.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Email: info@stationhub.com</p>
              <p className="text-gray-300">Phone: +91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 StationHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
