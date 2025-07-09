import { useGame } from "./MoleContext";

export default function Scoreboard() {
  const { score, resetGame } = useGame();

  return (
    <div className="scoreboard">
      <p>
        Score: <span className="score-value">{score}</span>
      </p>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
}
