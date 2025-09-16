import { useGame } from "./MoleContext";
import { useEffect, useState } from "react";

export default function Field() {
  const NUM_HOLES = 9;
  const { moleIndex, bangIndex, whackMole, level, gameState } = useGame();
  const [wiggle, setWiggle] = useState(false);

  // "level:{level} animation"
  useEffect(() => {
    if (gameState === "playing") {
      setWiggle(true);
      const timeout = setTimeout(() => setWiggle(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [level, gameState]);

  /* returns an array of booleans; false = hole, true = mole/hole */
  return (
    <>
      <ul className="field">
        {Array.from({ length: NUM_HOLES }).map((_, i) => (
          <li
            key={i}
            className={`hole${i === moleIndex ? " mole" : ""}`}
            onClick={() => {
              if (i === moleIndex) {
                whackMole(i); // Pass clicked index for 💥
              }
            }}
          >
            {i === bangIndex && <span className="bang">💥</span>}
          </li>
        ))}
      </ul>
      <div className={`level-display${wiggle ? " wiggle" : ""}`}>
        Level: {level}
      </div>
    </>
  );
}
