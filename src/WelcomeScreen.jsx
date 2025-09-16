import { useGame } from "./MoleContext"; //{destructuring} useGame context hook. the value of useGame is a Key on the moleContext obj

export default function WelcomeScreen() {
  const { startGame, highScore } = useGame(); //calling hook, destructuring keys: startGame highScore

  return (
    <div className="welcome">
      <div className="instructions"> Click on the mole to gain points.</div>
      <div className="instructions">
        {" "}
        You must hit the mole at least 4 times within 10 seconds to move on to
        the next level.
      </div>
      <div className="instructions">
        {" "}
        Each level gets harder, with less time and faster moles. Reach level 3
        to win!
      </div>
      <br />
      <button onClick={startGame}>Play</button>
      <p>
        <strong>High Score: {highScore}</strong>
      </p>
    </div>
  );
}
