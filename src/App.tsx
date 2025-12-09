import { useState } from 'react';
import { Board } from './components/Board';
import { GameHeader } from './components/GameHeader';
import { DifficultySelect } from './components/DifficultySelect';
import { ThemeToggle } from './components/ThemeToggle';
import { Confetti } from './components/Confetti';
import { GameOverModal } from './components/GameOverModal';
import { MobileInstructions } from './components/MobileInstructions';
import { useGame } from './hooks/useGame';
import { DIFFICULTY_CONFIGS, type Difficulty } from './types/game';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const config = DIFFICULTY_CONFIGS[difficulty];
  const {
    board,
    gameStatus,
    timer,
    minesLeft,
    handleCellClick,
    handleCellRightClick,
    resetGame,
  } = useGame(config);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4">
      <ThemeToggle />
      <Confetti active={gameStatus === 'won'} />
      
      <div className="text-center mb-4 sm:mb-8 px-2">
        <h1 className="text-3xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 
                       dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          💣 Buscaminas Moderno
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg hidden md:block">
          Click izquierdo para revelar, derecho para marcar 🚩
        </p>
      </div>

      <MobileInstructions />

      <DifficultySelect
        currentDifficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />

      <GameHeader
        minesLeft={minesLeft}
        timer={timer}
        gameStatus={gameStatus}
        onReset={resetGame}
      />

      <div className="w-full flex justify-center overflow-x-auto px-2">
        <Board
          board={board}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
          gameStatus={gameStatus}
        />
      </div>

      <GameOverModal
        isOpen={gameStatus === 'won' || gameStatus === 'lost'}
        isWin={gameStatus === 'won'}
        time={timer}
        onRestart={resetGame}
      />
    </div>
  );
}

export default App;
