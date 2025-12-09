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
    <div className="flex gap-3 mb-6">
      {difficulties.map(({ value, label, emoji }) => (
        <button
          key={value}
          onClick={() => onDifficultyChange(value)}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-200
            ${currentDifficulty === value
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:scale-105 shadow-md'
            }
          `}
        >
          <span className="mr-2">{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
};
