import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function Chaotic({ children }: Props) {
  return (
    <motion.div
      animate={{
        x: [0, 15, -15, 10, -10, 0],
        y: [0, -10, 15, -8, 8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
