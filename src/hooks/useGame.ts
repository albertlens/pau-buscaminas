import { useState, useEffect, useCallback } from 'react';
import type { Cell, GameConfig, GameStatus } from '../types/game';
import { createEmptyBoard, placeMines, revealCell, checkWin, revealAllMines } from '../utils/gameLogic';

export const useGame = (config: GameConfig) => {
  const [board, setBoard] = useState<Cell[][]>(() => createEmptyBoard(config.rows, config.cols));
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [flagCount, setFlagCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (gameStatus === 'playing') {
      interval = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStatus]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard(config.rows, config.cols));
    setGameStatus('idle');
    setFlagCount(0);
    setTimer(0);
    setIsInitialized(false);
  }, [config]);

  // Resetear cuando cambia la configuración
  useEffect(() => {
    resetGame();
  }, [config.rows, config.cols, config.mines]);

  const handleCellClick = useCallback((x: number, y: number) => {
    if (gameStatus === 'won' || gameStatus === 'lost') return;

    setBoard(currentBoard => {
      let newBoard = currentBoard;

      // Primera vez que se hace click, inicializar las minas
      if (!isInitialized) {
        newBoard = placeMines(currentBoard, config, { x, y });
        setIsInitialized(true);
        setGameStatus('playing');
      }

      // Obtener la celda después de inicializar
      const cell = newBoard[y][x];

      if (cell.isFlagged || cell.isRevealed) {
        return newBoard;
      }

      // Verificar si es una mina ANTES de revelar
      if (cell.isMine) {
        setGameStatus('lost');
        newBoard[y][x].isRevealed = true;
        return revealAllMines(newBoard);
      }

      newBoard = revealCell(newBoard, x, y);

      // Verificar si ganó
      if (checkWin(newBoard, config.mines)) {
        setGameStatus('won');
      }

      return newBoard;
    });
  }, [config, gameStatus, isInitialized]);

  const handleCellRightClick = useCallback((x: number, y: number) => {
    if (gameStatus === 'won' || gameStatus === 'lost') return;

    setBoard(currentBoard => {
      const newBoard = currentBoard.map(row => row.map(cell => ({ ...cell })));
      const cell = newBoard[y][x];

      if (cell.isRevealed) return currentBoard;

      cell.isFlagged = !cell.isFlagged;
      setFlagCount(prev => cell.isFlagged ? prev + 1 : prev - 1);

      return newBoard;
    });
  }, [gameStatus]);

  return {
    board,
    gameStatus,
    flagCount,
    timer,
    minesLeft: config.mines - flagCount,
    handleCellClick,
    handleCellRightClick,
    resetGame,
  };
};
