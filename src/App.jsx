import { GameProvider, useGame } from "./GameContext";
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
    <div>
      <h1>Whack-A-Mole</h1>
      {isPlaying ? <GameView /> : <WelcomeScreen />}
    </div>
  );
}
