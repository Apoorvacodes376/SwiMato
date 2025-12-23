import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { FoodDetailPage } from './pages/FoodDetailPage';
import { CartPage } from './pages/CartPage';

import React from "react";
import Slider from "./components/Slider";

const App: React.FC = () => {
  return (
    <div>
      <h1>Interactive Slider</h1>
      <Slider />
      <a href="https://example.com">This link will be blocked</a>
    </div>
  );
};

const AppContent = () => {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'food':
        return <FoodDetailPage />;
      case 'cart':
        return <CartPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {renderPage()}
    </div>
  );
};

function App() {
  return (
    <NavigationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NavigationProvider>
  );
}



export default App;
