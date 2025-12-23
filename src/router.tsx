import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Food from "./pages/Food";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import Location from "./pages/Location";

export default function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food/:id" element={<Food />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </>
  );
}
