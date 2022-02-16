import React from "react";
import { GridUI } from "./game-board";
import { useGame } from "../useGame";

export const Game: React.FC = () => {
  const { paused, onPauseClick, onRestart, generation, grid } = useGame();

  return (
    <>
      <p className="Sub-text">{`Generation: ${generation}`}</p>
      <div className="Button-container">
        <button onClick={onPauseClick} className="Button">
          {paused ? (generation > 0 ? "Resume" : "Start") : "Pause"}
        </button>
        <button onClick={onRestart} className="Button">
          Restart
        </button>
      </div>
      <GridUI grid={grid} />
    </>
  );
};
