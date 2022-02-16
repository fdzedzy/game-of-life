import React from "react";
import { Cell } from "../types";
import { CellUI } from "./cell";

type Props = {
  cells: Cell[];
};

export const RowUI: React.FC<Props> = ({ cells }) => {
  return (
    <div className="Row">
      {cells.map((c, i) => (
        <CellUI key={i} alive={c.alive} />
      ))}
    </div>
  );
};
