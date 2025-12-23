import FlappyGame from "../components/FlappyGame";
import { useAuth } from "../store/authStore";

export default function SignIn() {
  const { digits } = useAuth();

  return (
    <div style={{ padding: 40 }}>
      <h1>Enter Phone Number 🎮</h1>

      <div style={{ fontSize: 24, marginBottom: 20 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} style={{ marginRight: 8 }}>
            {digits[i] ?? "_"}
          </span>
        ))}
      </div>

      {digits.length < 10 ? (
        <FlappyGame />
      ) : (
        <h2>✅ Phone number captured!</h2>
      )}
    </div>
  );
}
