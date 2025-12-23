import { ShoppingCart, Search, User, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

export const Navbar = () => {
  const { totalItems } = useCart();
  const { navigateTo } = useNavigation();

  return (
    <nav className="bg-black border-b border-maroon-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <div className="text-3xl font-bold tracking-tight">
              <span className="text-red-600">Swi</span>
              <span className="text-orange-500">mato</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-xl mx-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full bg-zinc-900 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="hidden md:flex items-center space-x-1 text-gray-300 hover:text-white transition">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Location</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition">
              <User className="h-5 w-5" />
              <span className="hidden md:inline text-sm">Sign In</span>
            </button>

            <button
              onClick={() => navigateTo('cart')}
              className="relative flex items-center space-x-1 text-gray-300 hover:text-white transition"
              id="cart-icon"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-zinc-900 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </nav>
  );
};
