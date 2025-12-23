import React, { useState, useRef, useEffect } from "react";
import "./Slider.css"; // we'll add styles separately

const Slider: React.FC = () => {
  const [value, setValue] = useState(50); // slider value
  const [detached, setDetached] = useState(false); // whether circle is free
  const circleRef = useRef<HTMLDivElement | null>(null);

  // Handle slider change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);

    // If user exceeds 100, detach circle
    if (newValue > 100) {
      setDetached(true);
    }
  };

  // Allow free movement when detached
  useEffect(() => {
    if (!detached || !circleRef.current) return;

    const circle = circleRef.current;

    const moveCircle = (e: MouseEvent) => {
      circle.style.left = `${e.clientX - 25}px`;
      circle.style.top = `${e.clientY - 25}px`;
    };

    window.addEventListener("mousemove", moveCircle);

    return () => {
      window.removeEventListener("mousemove", moveCircle);
    };
  }, [detached]);

  return (
    <div className="slider-container">
      {!detached ? (
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="slider"
        />
      ) : (
        <div ref={circleRef} className="circle-blocker">
          🚫
        </div>
      )}
    </div>
  );
};

export default Slider;
