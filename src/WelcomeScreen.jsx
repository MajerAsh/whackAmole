import { useGame } from "./MoleContext";

export default function WelcomeScreen() {
  const { startGame, highScore } = useGame();

  return (
    <div className="welcome">
      <p>Welcome to Whack-A-Mole!</p>
      <p> Click the mole and gain points.</p>
      <p> Let out your aggression! Get Points!</p>
      <button onClick={startGame}>Play</button>
      <p>
        <strong>High Score: {highScore}</strong>
      </p>
    </div>
  );
}
