import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChaosSearch from "../components/ChaosSearch";

const Page = styled.div`
  padding: 60px 40px;
`;

const Grid = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
`;

const Card = styled(motion.div)`
  background: #1b0000;
  border-radius: 50%;
  height: 220px;
  width: 220px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const foods = [
  { name: "Burger 🍔", route: "/burger" },
  { name: "Pizza 🍕", route: "/pizza" },
  { name: "Biryani 🍛", route: "/biryani" },
  { name: "Fries 🍟", route: "/fries" },
];

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = foods.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Page>
      <h1>
        Order from <span style={{ color: "red" }}>swi</span>
        <span style={{ color: "orange" }}>mato</span>
      </h1>

      <Grid>
        {filtered.map((f) => (
          <Card
            key={f.name}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(f.route)}
          >
            {f.name}
          </Card>
        ))}
      </Grid>

      {/* 🔥 SEARCH BAR NEAR FOOTER */}
      <ChaosSearch onSearch={setQuery} />

      <footer style={{ marginTop: 80, opacity: 0.6 }}>
        All copyrights reserved 2025 ©
      </footer>
    </Page>
  );
}
