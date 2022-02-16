import { useEffect, useState } from "react";
import { Cell, Grid } from "./types";

export const useGame = (height = 25, width = 25) => {
  const [paused, setPaused] = useState(true);
  const [generation, setGeneration] = useState(0);
  const [grid, setGrid] = useState<Grid>(generateInitialGrid(height, width));

  useEffect(() => {
    const timer = setInterval(() => iterate(), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  function iterate() {
    if (!paused) {
      setGeneration(generation + 1);
      setGrid(generateNextGeneration(grid));
    }
  }

  const onRestart = () => {
    setGeneration(0);
    setGrid(generateInitialGrid(height, width));
    setPaused(false);
  };

  const onPauseClick = () => setPaused(!paused);

  return { paused, onPauseClick, onRestart, generation, grid };
};

const generateInitialGrid = (height = 25, width = 25) => {
  const grid: Cell[][] = [];

  for (let i = 0; i < height; i++) {
    const row: Cell[] = [];
    for (let i = 0; i < width; i++) {
      row.push({ alive: !!Math.floor(Math.random() * 2) });
    }
    grid.push(row);
  }

  return grid;
};

const generateNextGeneration = (grid: Grid): Grid => {
  const newGrid = grid.map((r) => r.slice());
  newGrid.forEach((r, y) =>
    r.forEach((c, x) => {
      const liveNeighborCount = getLiveNeighborCount(x, y, grid);

      // If Cell is live and has 2 or 3 live neighbors it lives
      // If cell is not alive and has 3 live neighbors is becomes live
      if (liveNeighborCount === 3 || (c.alive && liveNeighborCount === 2)) {
        c.alive = true;
      } else {
        c.alive = false;
      }
    })
  );

  return newGrid;
};

const getLiveNeighborCount = (x: number, y: number, prevGrid: Grid): number => {
  let count = 0;
  // A cell can have up to 8 neighbors

  // 1 2 3
  // 4   5
  // 6 7 8

  // 1
  if (prevGrid[y - 1]?.[x - 1]?.alive) count++;

  // 2
  if (prevGrid[y - 1]?.[x]?.alive) count++;

  // 3
  if (prevGrid[y - 1]?.[x + 1]?.alive) count++;

  // 4
  if (prevGrid[y]?.[x - 1]?.alive) count++;

  // 5
  if (prevGrid[y]?.[x + 1]?.alive) count++;

  // 6
  if (prevGrid[y + 1]?.[x - 1]?.alive) count++;

  // 7
  if (prevGrid[y + 1]?.[x]?.alive) count++;

  // 8
  if (prevGrid[y + 1]?.[x + 1]?.alive) count++;

  return count;
};
