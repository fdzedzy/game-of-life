import React from "react";
import clsx from "clsx";

type Props = {
  alive: boolean;
};

export const CellUI: React.FC<Props> = ({ alive }) => {
  return (
    <div
      className={clsx({
        Cell: true,
        "Live-cell": alive,
      })}
    ></div>
  );
};
