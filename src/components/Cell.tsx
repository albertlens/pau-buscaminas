import React, { useState, useRef } from 'react';
import type { Cell as CellType } from '../types/game';

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  onLongPress: () => void;
  gameStatus: string;
}

const COLORS = {
  1: 'text-blue-600 dark:text-blue-400',
  2: 'text-green-600 dark:text-green-400',
  3: 'text-red-600 dark:text-red-400',
  4: 'text-purple-700 dark:text-purple-400',
  5: 'text-amber-700 dark:text-amber-400',
  6: 'text-cyan-600 dark:text-cyan-400',
  7: 'text-gray-900 dark:text-gray-200',
  8: 'text-pink-600 dark:text-pink-400',
};

export const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick, onLongPress, gameStatus }) => {
  const [isPressing, setIsPressing] = useState(false);
  const longPressTimer = useRef<number | null>(null);
  const longPressTriggered = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsPressing(true);
    longPressTriggered.current = false;
    
    longPressTimer.current = window.setTimeout(() => {
      longPressTriggered.current = true;
      onLongPress();
      setIsPressing(false);
      
      // Vibración háptica si está disponible
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    
    // Solo hacer click si NO se activó el long press
    if (isPressing && !longPressTriggered.current) {
      onClick();
    }
    
    setIsPressing(false);
    longPressTriggered.current = false;
  };

  const handleTouchCancel = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setIsPressing(false);
    longPressTriggered.current = false;
  };

  const getCellContent = () => {
    if (cell.isFlagged && !cell.isRevealed) {
      return <span className="text-lg sm:text-xl md:text-2xl">🚩</span>;
    }

    if (!cell.isRevealed) {
      return null;
    }

    if (cell.isMine) {
      return <span className="text-lg sm:text-xl md:text-2xl">💣</span>;
    }

    if (cell.neighborMines > 0) {
      return (
        <span className={`font-bold text-sm sm:text-base md:text-lg ${COLORS[cell.neighborMines as keyof typeof COLORS]}`}>
          {cell.neighborMines}
        </span>
      );
    }

    return null;
  };

  const getCellClasses = () => {
    const baseClasses = 'w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center cell-transition border select-none touch-none';
    
    if (!cell.isRevealed) {
      return `${baseClasses} bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 
              border-slate-400 dark:border-slate-500 cursor-pointer cell-hover shadow-md 
              hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-500 dark:hover:to-slate-600`;
    }

    if (cell.isMine && gameStatus === 'lost') {
      return `${baseClasses} bg-red-500 dark:bg-red-600 border-red-600 dark:border-red-700 animate-pulse`;
    }

    return `${baseClasses} bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600`;
  };

  return (
    <button
      className={`${getCellClasses()} ${isPressing ? 'scale-90 ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
      onContextMenu={onRightClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      disabled={cell.isRevealed}
    >
      {getCellContent()}
    </button>
  );
};
