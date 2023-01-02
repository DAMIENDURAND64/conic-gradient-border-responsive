import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import "./App.css";

const Card = styled.div`
  --startDeg: 0deg;
  inline-size: 190vmin;
  block-size: 90vmin;
  box-shadow: 0px 0px 10px 10px #444;

  border: 1vmin solid hsl(100 100% 60%);
  border-image-slice: 1;

  border-image-source: conic-gradient(
    from var(--startDeg, 5deg),
    hsl(0, 0%, 100%),
    hsl(0, 0%, 0%),
    hsl(0, 0%, 100%)
  );

  display: grid;
  place-content: center;
  padding: 4ch;
  font-size: 10vmin;
  color: white;
`;

function App() {
  const cardRef = useRef();

  const mouseMoveListener = useCallback(({ clientX, clientY }) => {
    const card = cardRef.current;
    const { x, y, width, height } = card.getBoundingClientRect();
    const dx = clientX - (x + 0.5 * width);
    const dy = clientY - (y + 0.5 * height);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    card.style.setProperty("--startDeg", `${angle + 90}deg`);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveListener, false);
    return () => window.removeEventListener("mousemove", mouseMoveListener);
  }, [mouseMoveListener]);

  return (
    <div className="background h-screen flex justify-center items-center ">
      <Card ref={cardRef}>Conic Gradient Border</Card>
    </div>
  );
}

export default App;
