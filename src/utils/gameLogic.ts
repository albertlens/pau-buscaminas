import type { Cell, GameConfig } from '../types/game';

export const createEmptyBoard = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
      x,
      y,
    }))
  );
};

export const placeMines = (board: Cell[][], config: GameConfig, firstClick: { x: number; y: number }): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  let minesPlaced = 0;
  const { rows, cols, mines } = config;

  while (minesPlaced < mines) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);

    // No colocar minas en la primera celda clickeada ni en sus vecinos
    const isFirstClick = x === firstClick.x && y === firstClick.y;
    const isNearFirstClick = Math.abs(x - firstClick.x) <= 1 && Math.abs(y - firstClick.y) <= 1;

    if (!newBoard[y][x].isMine && !isFirstClick && !isNearFirstClick) {
      newBoard[y][x].isMine = true;
      minesPlaced++;
    }
  }

  return calculateNeighborMines(newBoard);
};

const calculateNeighborMines = (board: Cell[][]): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));

  for (let y = 0; y < newBoard.length; y++) {
    for (let x = 0; x < newBoard[y].length; x++) {
      if (!newBoard[y][x].isMine) {
        newBoard[y][x].neighborMines = countNeighborMines(newBoard, x, y);
      }
    }
  }

  return newBoard;
};

const countNeighborMines = (board: Cell[][], x: number, y: number): number => {
  let count = 0;
  const neighbors = getNeighbors(board, x, y);

  neighbors.forEach(neighbor => {
    if (neighbor.isMine) count++;
  });

  return count;
};

export const getNeighbors = (board: Cell[][], x: number, y: number): Cell[] => {
  const neighbors: Cell[] = [];
  const rows = board.length;
  const cols = board[0].length;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      const newY = y + dy;
      const newX = x + dx;

      if (newY >= 0 && newY < rows && newX >= 0 && newX < cols) {
        neighbors.push(board[newY][newX]);
      }
    }
  }

  return neighbors;
};

export const revealCell = (board: Cell[][], x: number, y: number): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));

  if (newBoard[y][x].isRevealed || newBoard[y][x].isFlagged) {
    return newBoard;
  }

  // Usar un enfoque iterativo con cola para evitar problemas con recursión en tableros grandes
  const queue: { x: number; y: number }[] = [{ x, y }];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = `${current.x},${current.y}`;

    if (visited.has(key)) continue;
    visited.add(key);

    const cell = newBoard[current.y][current.x];

    if (cell.isRevealed || cell.isFlagged || cell.isMine) continue;

    cell.isRevealed = true;

    // Si no tiene minas vecinas, añadir vecinos a la cola
    if (cell.neighborMines === 0) {
      const neighbors = getNeighbors(newBoard, current.x, current.y);
      neighbors.forEach(neighbor => {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        if (!visited.has(neighborKey) && !neighbor.isRevealed && !neighbor.isFlagged) {
          queue.push({ x: neighbor.x, y: neighbor.y });
        }
      });
    }
  }

  return newBoard;
};

export const checkWin = (board: Cell[][], totalMines: number): boolean => {
  let revealedCount = 0;
  let totalCells = 0;

  board.forEach(row => {
    row.forEach(cell => {
      totalCells++;
      if (cell.isRevealed && !cell.isMine) {
        revealedCount++;
      }
    });
  });

  return revealedCount === totalCells - totalMines;
};

export const revealAllMines = (board: Cell[][]): Cell[][] => {
  return board.map(row =>
    row.map(cell => ({
      ...cell,
      isRevealed: cell.isMine ? true : cell.isRevealed,
    }))
  );
};
