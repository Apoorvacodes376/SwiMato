export default function CartOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "20px",
        background: "#1a0000",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        width: "260px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
      }}
    >
      <h4>Cart</h4>
      <p>No items yet 🍽️</p>
    </div>
  );
}
