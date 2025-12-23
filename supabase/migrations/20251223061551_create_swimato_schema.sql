/*
  # Create Swimato Food Delivery Schema

  1. New Tables
    - `restaurants`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `rating` (numeric)
      - `cuisine_type` (text)
      - `created_at` (timestamp)
    
    - `food_items`
      - `id` (uuid, primary key)
      - `restaurant_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `price` (numeric)
      - `category` (text)
      - `is_vegetarian` (boolean)
      - `rating` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (since this is a public-facing food delivery site)
*/

CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  rating numeric DEFAULT 4.0,
  cuisine_type text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS food_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  price numeric NOT NULL,
  category text DEFAULT 'Main Course',
  is_vegetarian boolean DEFAULT false,
  rating numeric DEFAULT 4.0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to restaurants"
  ON restaurants FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to food items"
  ON food_items FOR SELECT
  TO anon
  USING (true);