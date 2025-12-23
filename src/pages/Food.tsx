import { useParams, useNavigate } from "react-router-dom";
import { foods } from "../assets/foodImages";
import { useCart } from "../store/cartStore";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Food() {
  const { id } = useParams();
  const food = foods.find((f) => f.id === id)!;
  const add = useCart((s) => s.add);
  const nav = useNavigate();
  const [qty, setQty] = useState(1);

  return (
    <div style={{ padding: 40 }}>
      <motion.img src={food.img} width={260} />
      <input
        type="range"
        min={1}
        max={10}
        value={qty}
        onChange={(e) => setQty(+e.target.value)}
      />

      <button
        onClick={() => {
          add({ ...food, qty });
          nav("/");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
