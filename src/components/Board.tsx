import React from 'react';
import type { Cell as CellType } from '../types/game';
import { Cell } from './Cell';

interface BoardProps {
  board: CellType[][];
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number) => void;
  gameStatus: string;
}

export const Board: React.FC<BoardProps> = ({ board, onCellClick, onCellRightClick, gameStatus }) => {
  const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    onCellRightClick(x, y);
  };

  const handleLongPress = (x: number, y: number) => {
    onCellRightClick(x, y);
  };

  return (
    <div className="inline-block p-2 sm:p-4 bg-slate-200 dark:bg-slate-700 rounded-xl shadow-2xl overflow-x-auto max-w-full">
      <div className="flex flex-col gap-0.5">
        {board.map((row, y) => (
          <div key={y} className="flex gap-0.5">
            {row.map((cell) => (
              <Cell
                key={`${cell.x}-${cell.y}`}
                cell={cell}
                onClick={() => onCellClick(cell.x, cell.y)}
                onRightClick={(e) => handleRightClick(e, cell.x, cell.y)}
                onLongPress={() => handleLongPress(cell.x, cell.y)}
                gameStatus={gameStatus}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
