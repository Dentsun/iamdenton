import React, { useState, useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 20;
const BOARD_SIZE = 400;

const Snake: React.FC = () => {
  const [snake, setSnake] = useState<{x: number, y: number}[]>([{x: 10, y: 10}]);
  const [food, setFood] = useState({x: 15, y: 15});
  const [direction, setDirection] = useState<'UP'|'DOWN'|'LEFT'|'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const moveInterval = useRef<any>(null);

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * (BOARD_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (BOARD_SIZE / GRID_SIZE))
    };
  };

  const resetGame = () => {
    setSnake([{x: 10, y: 10}]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prev => {
      const newHead = { ...prev[0] };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check Collisions
      if (
        newHead.x < 0 || 
        newHead.x >= BOARD_SIZE / GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= BOARD_SIZE / GRID_SIZE ||
        prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        return prev;
      }

      const newSnake = [newHead, ...prev];

      // Check Food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      moveInterval.current = setInterval(moveSnake, 150);
    } else {
      clearInterval(moveInterval.current);
    }
    return () => clearInterval(moveInterval.current);
  }, [gameStarted, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': if(direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if(direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if(direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if(direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 h-full text-white">
      <div className="mb-4 text-xl font-mono flex gap-4">
        <span>Score: {score}</span>
        <button 
          onClick={resetGame} 
          className="px-2 bg-green-600 hover:bg-green-500 text-white text-sm border border-white"
        >
          {gameOver ? 'Try Again' : gameStarted ? 'Restart' : 'Start Game'}
        </button>
      </div>

      <div 
        className="relative bg-black border-4 border-gray-600"
        style={{ width: BOARD_SIZE, height: BOARD_SIZE }}
      >
        {gameOver && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-red-500 font-bold text-3xl z-10">
             GAME OVER
           </div>
        )}
        
        <div 
          className="absolute bg-red-500 rounded-full shadow-[0_0_10px_red]"
          style={{
            left: food.x * GRID_SIZE,
            top: food.y * GRID_SIZE,
            width: GRID_SIZE,
            height: GRID_SIZE
          }}
        />
        
        {snake.map((segment, i) => (
          <div
            key={i}
            className="absolute bg-green-500 border border-black"
            style={{
              left: segment.x * GRID_SIZE,
              top: segment.y * GRID_SIZE,
              width: GRID_SIZE,
              height: GRID_SIZE,
              opacity: i === 0 ? 1 : 0.7 // Head is brighter
            }}
          />
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-400 font-mono">Use Arrow Keys to Move</div>
    </div>
  );
};

export default Snake;
