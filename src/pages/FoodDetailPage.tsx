import { useEffect, useState, useRef } from 'react';
import { Star, ArrowLeft, Leaf } from 'lucide-react';
import { supabase, FoodItem } from '../lib/supabase';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

export const FoodDetailPage = () => {
  const { params, navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const foodImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id) {
      loadFoodItem(params.id);
    }
  }, [params.id]);

  const loadFoodItem = async (id: string) => {
    try {
      const { data } = await supabase
        .from('food_items')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (data) {
        setFoodItem(data);
      }
    } catch (error) {
      console.error('Error loading food item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!foodItem) return;

    setAnimating(true);

    const foodImg = foodImageRef.current;
    const cartIcon = document.getElementById('cart-icon');

    if (foodImg && cartIcon) {
      const foodRect = foodImg.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const clone = foodImg.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = `${foodRect.top}px`;
      clone.style.left = `${foodRect.left}px`;
      clone.style.width = `${foodRect.width}px`;
      clone.style.height = `${foodRect.height}px`;
      clone.style.zIndex = '9999';
      clone.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      clone.style.pointerEvents = 'none';
      document.body.appendChild(clone);

      setTimeout(() => {
        clone.style.top = `${cartRect.top}px`;
        clone.style.left = `${cartRect.left}px`;
        clone.style.width = '40px';
        clone.style.height = '40px';
        clone.style.opacity = '0';
        clone.style.transform = 'scale(0.1)';
      }, 50);

      setTimeout(() => {
        document.body.removeChild(clone);
        addToCart({ ...foodItem, quantity });
        setAnimating(false);
        setTimeout(() => {
          navigateTo('home');
        }, 300);
      }, 850);
    } else {
      addToCart({ ...foodItem, quantity });
      setAnimating(false);
      setTimeout(() => {
        navigateTo('home');
      }, 300);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!foodItem) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Food item not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div ref={foodImageRef} className="relative rounded-2xl overflow-hidden">
            <img
              src={foodItem.image_url}
              alt={foodItem.name}
              className="w-full h-full object-cover"
            />
            {foodItem.is_vegetarian && (
              <div className="absolute top-6 left-6 bg-green-600 px-4 py-2 rounded-lg text-white font-semibold flex items-center space-x-2">
                <Leaf className="h-5 w-5" />
                <span>VEGETARIAN</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-zinc-900 rounded-2xl p-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-yellow-500 bg-opacity-20 px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-bold">{foodItem.rating}</span>
                </div>
                <span className="text-gray-400">{foodItem.category}</span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-3">{foodItem.name}</h1>
              <p className="text-gray-400 text-lg mb-6">{foodItem.description}</p>

              <div className="mb-8">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  ₹{foodItem.price * quantity}
                </div>
                <div className="text-sm text-gray-400">Price per plate: ₹{foodItem.price}</div>
              </div>

              <div className="mb-8">
                <label className="text-white text-lg font-semibold mb-3 block">
                  Number of Plates: {quantity}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-3 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #8b0000 0%, #8b0000 ${
                      ((quantity - 1) / 9) * 100
                    }%, #3f3f46 ${((quantity - 1) / 9) * 100}%, #3f3f46 100%)`,
                  }}
                />
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  <span>1 plate</span>
                  <span>10 plates</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={animating}
                className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white py-4 rounded-xl text-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {animating ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
