import React, { useState, useEffect, useCallback } from 'react';
import { Smile, Frown, RefreshCw } from 'lucide-react';

type CellValue = number | 'mine';
type CellState = 'hidden' | 'visible' | 'flagged';

interface Cell {
  value: CellValue;
  state: CellState;
}

const ROWS = 10;
const COLS = 10;
const MINES = 15;

const Minesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [timer, setTimer] = useState(0);

  const initGame = useCallback(() => {
    // Initialize empty grid
    const newGrid: Cell[][] = Array(ROWS).fill(null).map(() =>
      Array(COLS).fill(null).map(() => ({ value: 0, state: 'hidden' }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (newGrid[r][c].value !== 'mine') {
        newGrid[r][c].value = 'mine';
        minesPlaced++;
      }
    }

    // Calculate numbers
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (newGrid[r][c].value === 'mine') continue;
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (r+i >= 0 && r+i < ROWS && c+j >= 0 && c+j < COLS) {
              if (newGrid[r+i][c+j].value === 'mine') neighbors++;
            }
          }
        }
        newGrid[r][c].value = neighbors;
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
    setTimer(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let interval: any;
    if (!gameOver && !win) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver, win]);

  const reveal = (r: number, c: number, currentGrid: Cell[][]) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || currentGrid[r][c].state !== 'hidden') return;
    
    currentGrid[r][c].state = 'visible';
    
    if (currentGrid[r][c].value === 0) {
       for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            reveal(r+i, c+j, currentGrid);
          }
       }
    }
  };

  const handleClick = (r: number, c: number) => {
    if (gameOver || win || grid[r][c].state === 'flagged') return;

    const newGrid = [...grid.map(row => [...row])];
    
    if (newGrid[r][c].value === 'mine') {
      newGrid[r][c].state = 'visible';
      // Reveal all mines
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.value === 'mine') cell.state = 'visible';
      }));
      setGrid(newGrid);
      setGameOver(true);
    } else {
      reveal(r, c, newGrid);
      setGrid(newGrid);
      checkWin(newGrid);
    }
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || win || grid[r][c].state === 'visible') return;

    const newGrid = [...grid.map(row => [...row])];
    if (newGrid[r][c].state === 'hidden') newGrid[r][c].state = 'flagged';
    else if (newGrid[r][c].state === 'flagged') newGrid[r][c].state = 'hidden';
    
    setGrid(newGrid);
  };

  const checkWin = (currentGrid: Cell[][]) => {
    let hiddenNonMines = 0;
    currentGrid.forEach(row => row.forEach(cell => {
      if (cell.value !== 'mine' && cell.state !== 'visible') hiddenNonMines++;
    }));
    if (hiddenNonMines === 0) setWin(true);
  };

  const getCellContent = (cell: Cell) => {
    if (cell.state === 'hidden') return '';
    if (cell.state === 'flagged') return '🚩';
    if (cell.value === 'mine') return '💣';
    if (cell.value === 0) return '';
    return cell.value;
  };

  const getCellColor = (val: number) => {
    const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-800', 'text-red-800', 'text-teal-600', 'text-black', 'text-gray-600'];
    return colors[val] || '';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#c0c0c0] h-full">
      <div className="bg-[#c0c0c0] p-1 retro-border mb-2 flex justify-between items-center w-[280px]">
        <div className="bg-black text-red-600 font-mono text-2xl px-1 border-2 border-gray-500 inset-shadow">
          {String(MINES - grid.flat().filter(c => c.state === 'flagged').length).padStart(3, '0')}
        </div>
        <button onClick={initGame} className="retro-border p-1 active:retro-border-inset">
          {gameOver ? <Frown size={24} /> : win ? <Smile size={24} /> : <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-black flex items-center justify-center text-xs">:)</div>}
        </button>
        <div className="bg-black text-red-600 font-mono text-2xl px-1 border-2 border-gray-500 inset-shadow">
          {String(timer).padStart(3, '0')}
        </div>
      </div>

      <div className="bg-gray-400 border-4 border-gray-500 p-1" style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 24px)` }}>
        {grid.map((row, r) => 
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`w-6 h-6 flex items-center justify-center text-sm font-bold select-none cursor-pointer
                ${cell.state === 'visible' 
                  ? 'border border-gray-400 bg-[#c0c0c0] ' + (typeof cell.value === 'number' ? getCellColor(cell.value) : '') 
                  : 'retro-border bg-[#c0c0c0] active:retro-border-inset'
                }
              `}
              onClick={() => handleClick(r, c)}
              onContextMenu={(e) => handleRightClick(e, r, c)}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}
      </div>
      {win && <div className="mt-2 font-bold text-green-700">You Win!</div>}
      {gameOver && <div className="mt-2 font-bold text-red-700">Game Over!</div>}
    </div>
  );
};

export default Minesweeper;
