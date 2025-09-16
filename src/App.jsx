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

// Added gameState to determine which screen to show vvvv
function Main() {
  const { gameState, message } = useGame();
  return (
    <div className={gameState === "playing" ? "game-playing" : ""}>
      <h1>Whack-A-Mole</h1>
      {gameState === "playing" && <GameView />}
      {(gameState === "message" || gameState === "gameOver") && (
        <MessageScreen message={message} />
      )}
      {gameState === "welcome" && <WelcomeScreen />}
    </div>
  );
}

function MessageScreen({ message }) {
  const { startGame, setGameState } = useGame();
  const showRetry = message === "Game Over" || message === "You Win!";

  return (
    <div className="message-screen">
      <h2 className="game-message">{message}</h2>
      {showRetry && (
        <>
          <button className="retry-btn" onClick={startGame}>
            Try Again
          </button>
          <button
            className="retry-btn"
            style={{ marginLeft: "1rem" }}
            onClick={() => setGameState("welcome")}
          >
            Return Home
          </button>
        </>
      )}
    </div>
  );
}
