import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import CartExplosion from "./CartExplosion";
import Teleport from "./Teleport";

const Bar = styled.div`
  height: 64px;
  background: ${({ theme }) => theme.bgAlt};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

export default function Navbar() {
  const nav = useNavigate();
  const [boom, setBoom] = useState(false);

  const explodeCart = () => {
    setBoom(true);
    setTimeout(() => {
      setBoom(false);
      nav("/cart");
    }, 1500);
  };

  return (
    <>
      {boom && <CartExplosion />}

      <Bar>
        {/* MOVING LOGO */}
        <motion.div
          animate={{ x: [0, 40, -40, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          style={{ fontWeight: 800 }}
        >
          <span style={{ color: "red" }}>swi</span>
          <span style={{ color: "orange" }}>mato</span>
        </motion.div>

        {/* TELEPORTING NAV */}
        <div style={{ display: "flex", gap: 20 }}>
          <Teleport><Link to="/location">Location</Link></Teleport>
          <Teleport><Link to="/signin">Sign In</Link></Teleport>

          <Teleport>
            <motion.span
              whileHover={{ scale: 1.4 }}
              style={{ cursor: "pointer", fontSize: 22 }}
              onClick={explodeCart}
            >
              🛒
            </motion.span>
          </Teleport>
        </div>
      </Bar>
    </>
  );
}
