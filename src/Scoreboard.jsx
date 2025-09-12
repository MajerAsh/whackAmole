import { useGame } from "./MoleContext";

export default function Scoreboard() {
  const { score, highScore, timer } = useGame(); //pulling from useGame

  //timer format
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  const timerDisplay = `${minutes}:${seconds}`;

  // Format scores as two digits
  const scoreDisplay = String(score).padStart(2, "0");
  const highScoreDisplay = String(highScore).padStart(2, "0");

  return (
    <div className="scoreboard-png">
      <div className="scoreboard-label score-label">SCORE</div>
      <div className="scoreboard-label highscore-label">HIGH SCORE</div>
      <div className="scoreboard-value score-value">{scoreDisplay}</div>
      <div className="scoreboard-value highscore-value">{highScoreDisplay}</div>
      <div className="scoreboard-timer">{timerDisplay}</div>
    </div>
  );
}
