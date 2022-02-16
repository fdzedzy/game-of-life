import React from "react";
import { Grid } from "../types";
import { RowUI } from "./row";

type Props = {
  grid: Grid;
};

export const GridUI: React.FC<Props> = ({ grid }) => {
  return (
    <div>
      {grid.map((r, i) => (
        <RowUI key={i} cells={r} />
      ))}
    </div>
  );
};
