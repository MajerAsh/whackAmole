import { useGame } from "./MoleContext"; //{destructuring} useGame context hook. the value of useGame is a Key on the moleContext obj

export default function WelcomeScreen() {
  const { startGame, highScore } = useGame(); //calling hook, destructuring keys: startGame highScore

  return (
    <div className="welcome">
      <button onClick={startGame}>Play</button>
      <p>
        <strong>Current High Score: {highScore}</strong>
      </p>
      <div className="instructions-list">
        <div className="instruction">
          <span role="img" aria-label="hammer">
            🔨
          </span>{" "}
          Click the mole to gain points!
        </div>
        <div className="instruction">
          <span role="img" aria-label="timer">
            ⏱️
          </span>{" "}
          Hit the mole <strong>at least 4 times</strong> in{" "}
          <strong>10 seconds</strong> to level up.
        </div>
        <div className="instruction">
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          Each level gets harder—faster moles, less time. Reach level 3 to win!
        </div>
      </div>
      <br />
    </div>
  );
}
