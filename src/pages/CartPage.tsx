import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

export const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { navigateTo } = useNavigation();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>

          <div className="bg-zinc-900 rounded-2xl p-12 text-center">
            <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some delicious food to get started!</p>
            <button
              onClick={() => navigateTo('home')}
              className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-400 text-sm font-semibold transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-zinc-900 rounded-xl p-4 flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-zinc-800 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-zinc-700 rounded-l-lg transition"
                    >
                      <Minus className="h-4 w-4 text-white" />
                    </button>
                    <span className="text-white font-semibold px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-zinc-700 rounded-r-lg transition"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <span className="text-xl font-bold text-orange-500">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 hover:bg-red-900 rounded-lg transition"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery Fee</span>
              <span>₹40.00</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Taxes</span>
              <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span>₹{(totalPrice + 40 + totalPrice * 0.05).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white py-4 rounded-xl text-lg font-bold transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
