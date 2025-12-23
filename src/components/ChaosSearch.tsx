import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function ChaosSearch({ onSearch }: Props) {
  const x = useMotionValue(0);
  const rotate = useMotionValue(0);
  const [value, setValue] = useState("");

  const teleport = () => {
    const max = 200;
    x.set((Math.random() - 0.5) * max);
    rotate.set((Math.random() - 0.5) * 30);
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        position: "relative",
        marginTop: 120,
        display: "inline-block",
      }}
      animate={{
        x: [0, 40, -40, 20, -20, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      }}
      onMouseEnter={teleport}
    >
      <motion.input
        value={value}
        placeholder="search food (if you can)"
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
        onFocus={teleport}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 0.2 }}
        style={{
          padding: "14px 20px",
          width: 260,
          borderRadius: 30,
          border: "3px solid red",
          background: "#1a0000",
          color: "white",
          fontSize: 16,
          outline: "none",
        }}
      />
    </motion.div>
  );
}
