import { useGame } from "./MoleContext"; //{destructuring} useGame context hook. the value of useGame is a Key on the moleContext obj

export default function WelcomeScreen() {
  const { startGame, highScore } = useGame(); //calling hook, destructuring keys: startGame highScore

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
