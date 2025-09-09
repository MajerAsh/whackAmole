import { createContext, useContext, useState } from "react"; //destructuring {} those hooks

const GameContext = createContext();
const owSound = new Audio(`${import.meta.env.BASE_URL}ow.mp3`);

/* Game logic*/
export function GameProvider({ children }) {
  const NUM_HOLES = 9;

  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [moleIndex, setMoleIndex] = useState();
  const [bangIndex, setBangIndex] = useState();
  const [highScore, setHighScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setMoleIndex(Math.floor(Math.random() * NUM_HOLES));
    setBangIndex();
  };

  const whackMole = (clickedIndex) => {
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });

    //Mole pain:
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
    setIsPlaying(false);
    setScore(0);
    setMoleIndex();
    setBangIndex();
  };

  return (
    <GameContext.Provider //defining context provider. What we want provider to know/ be able to pass on
      value={{
        score,
        highScore,
        isPlaying,
        moleIndex,
        bangIndex,
        startGame,
        whackMole,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
