import { createContext, useContext, useState, useRef, useEffect } from "react"; //destructuring {} those hooks

const GameContext = createContext();
const owSound = new Audio(`${import.meta.env.BASE_URL}ow.mp3`);

/* Game logic*/
export function GameProvider({ children }) {
  const NUM_HOLES = 9;

  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("welcome");
  const [moleIndex, setMoleIndex] = useState();
  const [bangIndex, setBangIndex] = useState();
  const [highScore, setHighScore] = useState(0);
  const [timer, setTimer] = useState(10); // 10 sec per level
  const [level, setLevel] = useState(1);
  const [molesWhacked, setMolesWhacked] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) setHighScore(Number(storedHighScore));
  }, []);

  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);

  const intervalRef = useRef();
  const moleIntervalRef = useRef();

  //mole switch speed per level
  const getMoleSpeed = (level) => {
    if (level === 1) return 1400;
    if (level === 2) return 1000;
    return 700;
  };

  useEffect(() => {
    if (gameState === "playing") {
      setMessage(""); // Clear message on new level/game

      //Timer countdown
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            clearInterval(moleIntervalRef.current);
            // Check if player advances logic
            if (molesWhacked >= 4 && level < 3) {
              setMessage("Level Up!");
              setGameState("message");
              setTimeout(() => {
                setLevel(level + 1);
                setTimer(10);
                setMolesWhacked(0);
                setGameState("playing");
                setMessage("");
              }, 1200); // Start next level
            } else if (level === 3 && molesWhacked >= 4) {
              setMessage("You Win!");
              setGameState("message");
            } else {
              setMessage("Game Over");
              setGameState("gameOver");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      moleIntervalRef.current = setInterval(() => {
        setMoleIndex((prevIndex) => {
          const availableIndices = Array.from(
            { length: NUM_HOLES },
            (_, i) => i
          ).filter((i) => i !== prevIndex);
          const randomIndex = Math.floor(
            Math.random() * availableIndices.length
          );
          return availableIndices[randomIndex];
        });
        setBangIndex();
      }, getMoleSpeed(level));
    } else {
      clearInterval(intervalRef.current);
      clearInterval(moleIntervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(moleIntervalRef.current);
    };
  }, [gameState, level, molesWhacked]);

  const startGame = () => {
    clearInterval(intervalRef.current);
    clearInterval(moleIntervalRef.current);
    setScore(0);
    setTimer(10);
    setLevel(1);
    setGameState("playing");
    setMoleIndex(Math.floor(Math.random() * NUM_HOLES));
    setBangIndex();
    setMolesWhacked(0);
    setMessage("");
  };

  const whackMole = (clickedIndex) => {
    if (gameState !== "playing" || timer === 0) return;
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });
    setMolesWhacked((prev) => prev + 1);

    //Mole whacked:
    setBangIndex(clickedIndex);
    owSound.currentTime = 0;
    owSound.play();

    setTimeout(() => {
      setMoleIndex((prevIndex) => {
        const availableIndices = Array.from(
          { length: NUM_HOLES },
          (_, i) => i
        ).filter((i) => i !== prevIndex);
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        return availableIndices[randomIndex];
      });
      setBangIndex();
    }, 310);
  };

  const resetGame = () => {
    clearInterval(intervalRef.current);
    clearInterval(moleIntervalRef.current);
    setGameState("welcome");
    setScore(0);
    setLevel(1);
    setMoleIndex();
    setBangIndex();
    setTimer(10);
    setMolesWhacked(0);
    setMessage("");
  };

  //context value
  return (
    <GameContext.Provider
      value={{
        score,
        highScore,
        gameState,
        setGameState,
        moleIndex,
        bangIndex,
        timer,
        startGame,
        whackMole,
        resetGame,
        level,
        molesWhacked,
        message,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
