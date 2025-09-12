import { GameProvider, useGame } from "./MoleContext";
import Field from "./Field";
import WelcomeScreen from "./WelcomeScreen";
import Scoreboard from "./Scoreboard";

function GameView() {
  return (
    <>
      <Scoreboard />
      <Field />
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
}

function Main() {
  const { isPlaying } = useGame();
  return (
    <div className={isPlaying ? "game-playing" : ""}>
      <h1>Whack-A-Mole</h1>
      {isPlaying ? <GameView /> : <WelcomeScreen />}
    </div>
  );
}
