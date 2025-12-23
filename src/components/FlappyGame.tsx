import { useEffect, useRef, useState } from "react";
import { useAuth } from "../store/authStore";

const W = 320;
const H = 480;

export default function FlappyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addDigit, digits } = useAuth();

  const [birdY, setBirdY] = useState(H / 2);
  const [vel, setVel] = useState(0);
  const [pipeX, setPipeX] = useState(W);
  const [gapY, setGapY] = useState(200);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    if (dead) return;

    const ctx = canvasRef.current!.getContext("2d")!;
    let frame: number;

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // bird
      setVel((v) => v + 0.6);
      setBirdY((y) => y + vel);

      // pipe
      setPipeX((x) => {
        if (x < -50) {
          setScore((s) => s + 1);
          setGapY(120 + Math.random() * 200);
          return W;
        }
        return x - 2;
      });

      // draw
      ctx.fillStyle = "yellow";
      ctx.fillRect(50, birdY, 20, 20);

      ctx.fillStyle = "green";
      ctx.fillRect(pipeX, 0, 40, gapY - 80);
      ctx.fillRect(pipeX, gapY + 80, 40, H);

      // collision
      if (
        birdY < 0 ||
        birdY > H ||
        (pipeX < 70 &&
          pipeX > 30 &&
          (birdY < gapY - 80 || birdY > gapY + 80))
      ) {
        setDead(true);
        addDigit(score % 10);
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [vel, birdY, pipeX, dead]);

  const flap = () => {
    if (dead) {
      // reset round
      setBirdY(H / 2);
      setVel(-8);
      setPipeX(W);
      setScore(0);
      setDead(false);
      return;
    }
    setVel(-8);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={flap}
        style={{
          background: "#000",
          border: "3px solid red",
          cursor: "pointer",
        }}
      />

      <p>Digits collected: {digits.join("")}</p>
      <p>{dead ? "Click to play next digit" : "Click to flap"}</p>
    </div>
  );
}
