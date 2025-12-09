import React from 'react';

interface GameOverModalProps {
  isOpen: boolean;
  isWin: boolean;
  time: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, isWin, time, onRestart }) => {
  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 animate-in fade-in duration-300 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl 
                      transform animate-in zoom-in duration-300">
        <div className="text-center">
          <div className="text-6xl sm:text-8xl mb-4 animate-bounce">
            {isWin ? '🎉' : '💥'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
            {isWin ? '¡Felicitaciones!' : 'Game Over'}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-6">
            {isWin 
              ? `¡Completaste el juego en ${formatTime(time)}!` 
              : '¡Pisaste una mina!'}
          </p>
          <button
            onClick={onRestart}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                     font-bold rounded-lg text-base sm:text-lg hover:scale-105 transition-transform 
                     duration-200 shadow-lg active:scale-95 w-full sm:w-auto"
          >
            Jugar de Nuevo
          </button>
        </div>
      </div>
    </div>
  );
};
