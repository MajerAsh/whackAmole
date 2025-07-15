import { useGame } from "./MoleContext";

export default function Scoreboard() {
  const { score, resetGame } = useGame(); //pulling info we need from useGame

  return (
    <div className="scoreboard">
      <p>
        Score: <span className="score-value">{score}</span>
      </p>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
}
