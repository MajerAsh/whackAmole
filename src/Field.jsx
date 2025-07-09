import { useGame } from "./MoleContext";

export default function Field() {
  const NUM_HOLES = 9;
  const { moleIndex, bangIndex, whackMole } = useGame();

  return (
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
  );
}
