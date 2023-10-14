import { CellType, Information, MatrixType } from "../types";
import { getFlipTargets } from "./gameLogic";

export const gameInformation = (turn: CellType, matrix: MatrixType) => {
  const information: Information = {
    white: 0,
    black: 0,
    emptyCell: [],
    isAvailable: true,
  };

  matrix.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      if (!col) {
        information.emptyCell.push({ row: rowIndex, col: colIndex });
      } else {
        col === "white" ? information.white++ : information.black++;
      }
    })
  );

  information.isAvailable = information.emptyCell.some(
    (cell) => getFlipTargets(matrix, turn, cell).length
  );

  return information;
};
