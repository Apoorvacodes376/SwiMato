import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Teleport({ children }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hovering = useRef(false);

  const teleport = () => {
    if (hovering.current) return; // ⛔ stop moving while hovering

    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 80;

    x.set(Math.random() * maxX - maxX / 2);
    y.set(Math.random() * maxY - maxY / 2);
  };

  useEffect(() => {
    const interval = setInterval(teleport, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{
        x,
        y,
        position: "relative",
        display: "inline-block",
        pointerEvents: "auto", // ✅ ensure clicks register
      }}
      onMouseEnter={() => {
        hovering.current = true;
        x.stop();
        y.stop();
      }}
      onMouseLeave={() => {
        hovering.current = false;
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 12,
      }}
    >
      {children}
    </motion.div>
  );
}
