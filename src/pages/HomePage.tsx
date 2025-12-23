import { useEffect, useState } from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { supabase, Restaurant, FoodItem } from '../lib/supabase';
import { useNavigation } from '../context/NavigationContext';

export const HomePage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { navigateTo } = useNavigation();

  const categories = ['All', 'Pizza', 'Burger', 'Indian', 'Chinese', 'Desserts', 'Beverages'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [restaurantsRes, foodItemsRes] = await Promise.all([
        supabase.from('restaurants').select('*').order('rating', { ascending: false }),
        supabase.from('food_items').select('*').order('rating', { ascending: false }),
      ]);

      if (restaurantsRes.data) setRestaurants(restaurantsRes.data);
      if (foodItemsRes.data) setFoodItems(foodItemsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoodItems =
    activeCategory === 'All'
      ? foodItems
      : foodItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div
        className="relative h-96 bg-gradient-to-br from-maroon-900 via-red-900 to-black"
        style={{ background: 'linear-gradient(135deg, #4a0404 0%, #8b0000 50%, #000000 100%)' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
            Order food <span className="text-orange-500">online</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 text-center">
            Discover the best food & drinks in your city
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-zinc-900 rounded-xl shadow-2xl p-6 mb-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
                  activeCategory === category
                    ? 'bg-red-900 text-white'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Top Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map(restaurant => (
              <div
                key={restaurant.id}
                className="bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-red-900 transition cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-black bg-opacity-75 px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{restaurant.cuisine_type}</p>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>30-35 min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>2.5 km</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Popular Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFoodItems.map(item => (
              <div
                key={item.id}
                onClick={() => navigateTo('food', { id: item.id })}
                className="bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-red-900 transition cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  {item.is_vegetarian && (
                    <div className="absolute top-3 left-3 bg-green-600 px-2 py-1 rounded text-white text-xs font-semibold">
                      VEG
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black bg-opacity-75 px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-semibold">{item.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">₹{item.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('food', { id: item.id });
                      }}
                      className="bg-red-900 hover:bg-red-800 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
