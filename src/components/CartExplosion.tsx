import { motion } from "framer-motion";

const emojis = ["🍔", "🍕", "🍟", "🍛", "🌮", "🥪", "🍩", "🍗"];

export default function CartExplosion() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#140000",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* CART CORE */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 20 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 40,
        }}
      >
        🛒
      </motion.div>

      {/* EMOJI EXPLOSION */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: (Math.random() - 0.5) * window.innerWidth,
            y: (Math.random() - 0.5) * window.innerHeight,
            opacity: 0,
            rotate: Math.random() * 720,
          }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 32,
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.div>
      ))}
    </div>
  );
}
