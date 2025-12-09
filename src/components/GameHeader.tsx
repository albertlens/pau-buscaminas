import React from 'react';

interface GameHeaderProps {
  minesLeft: number;
  timer: number;
  gameStatus: string;
  onReset: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ minesLeft, timer, gameStatus, onReset }) => {
  const getStatusEmoji = () => {
    switch (gameStatus) {
      case 'won':
        return '😎';
      case 'lost':
        return '😵';
      case 'playing':
        return '😃';
      default:
        return '🙂';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between w-full max-w-md px-6 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg mb-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💣</span>
        <span className="text-xl font-bold text-slate-700 dark:text-slate-200">
          {minesLeft}
        </span>
      </div>

      <button
        onClick={onReset}
        className="text-4xl hover:scale-110 transition-transform duration-200 active:scale-95"
      >
        {getStatusEmoji()}
      </button>

      <div className="flex items-center gap-2">
        <span className="text-2xl">⏱️</span>
        <span className="text-xl font-bold text-slate-700 dark:text-slate-200 font-mono">
          {formatTime(timer)}
        </span>
      </div>
    </div>
  );
};
