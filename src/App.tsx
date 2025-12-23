import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';

import React from "react";
import Slider from "./components/Slider";

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div>
            <h2>Home Page</h2>
            {/* Home content */}
          </div>
        );
      case 'food':
        return (
          <div>
            <h2>Food Ordering Page</h2>
            {/* Your food ordering UI here */}
            
            {/* Embed the slider directly here */}
            <div className="mt-6">
              <h3>Customize Your Order</h3>
              <Slider />
            </div>
          </div>
        );
      case 'cart':
        return (
          <div>
            <h2>Cart Page</h2>
            {/* Cart content */}
          </div>
        );
      default:
        return (
          <div>
            <h2>Home Page</h2>
          </div>
        );
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
