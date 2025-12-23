import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image_url: string;
  rating: number;
  cuisine_type: string;
  created_at: string;
}

export interface FoodItem {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  is_vegetarian: boolean;
  rating: number;
  created_at: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}
