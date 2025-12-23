import { useCart } from "../store/cartStore";

export default function Cart() {
  const items = useCart((s) => s.items);

  return (
    <div style={{ padding: 40 }}>
      <h1>🛒</h1>
      {items.map((i) => (
        <div key={i.id} style={{ borderRadius: "50%" }}>
          <img src={i.img} width={120} />
        </div>
      ))}
    </div>
  );
}
