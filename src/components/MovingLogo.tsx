import { motion } from "framer-motion";

export default function MovingLogo() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      style={{ fontSize: "22px", fontWeight: 800 }}
    >
      <span style={{ color: "red" }}>swi</span>
      <span style={{ color: "orange" }}>mato</span>
    </motion.div>
  );
}
