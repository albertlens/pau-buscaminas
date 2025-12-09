import { useState } from 'react';
import { Board } from './components/Board';
import { GameHeader } from './components/GameHeader';
import { DifficultySelect } from './components/DifficultySelect';
import { ThemeToggle } from './components/ThemeToggle';
import { Confetti } from './components/Confetti';
import { GameOverModal } from './components/GameOverModal';
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ThemeToggle />
      <Confetti active={gameStatus === 'won'} />
      
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 
                       dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          💣 Buscaminas Moderno
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Click izquierdo para revelar, derecho para marcar 🚩
        </p>
      </div>

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

      <Board
        board={board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
        gameStatus={gameStatus}
      />

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
