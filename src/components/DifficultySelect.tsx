import React from 'react';
import type { Difficulty } from '../types/game';

interface DifficultySelectProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export const DifficultySelect: React.FC<DifficultySelectProps> = ({ currentDifficulty, onDifficultyChange }) => {
  const difficulties: { value: Difficulty; label: string; emoji: string }[] = [
    { value: 'easy', label: 'Fácil', emoji: '🟢' },
    { value: 'medium', label: 'Medio', emoji: '🟡' },
    { value: 'hard', label: 'Difícil', emoji: '🔴' },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap justify-center px-2">
      {difficulties.map(({ value, label, emoji }) => (
        <button
          key={value}
          onClick={() => onDifficultyChange(value)}
          className={`
            px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
            ${currentDifficulty === value
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:scale-105 shadow-md'
            }
          `}
        >
          <span className="mr-1 sm:mr-2">{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
};
