import { useState } from "react";
import { styled } from "styled-components";
import Row from "../components/Row";
import { CellType } from "../types";
import { getFlipTargets } from "../utils/gameLogic";

import { getInitialMatrix } from "../utils/getInitialMatrix";

export default function PlayGamePage() {
  const [matrix, setMatrix] = useState(getInitialMatrix);
  const [turn, setTurn] = useState<CellType>("black");
  const handleCellClick = (index: number) => {
    const [row, col] = [Math.floor(index / 8), index % 8];
    console.log(`row:${row}, col:${col}`);

    const flipTargets =
      !matrix[row][col] && getFlipTargets(matrix, turn, { row, col });
    console.log(flipTargets);

    if (!flipTargets || !flipTargets.length) {
      alert("둘 수 없는 위치입니다.");
      return;
    }

    setMatrix((prev) => {
      const newBoard = prev.map((r) => [...r]);
      flipTargets.forEach(([r, c]) => {
        newBoard[r][c] = turn;
      });
      newBoard[row][col] = turn;
      return newBoard;
    });

    // 턴 바꿈
    setTurn((prev) => (prev === "white" ? "black" : "white"));
  };

  return (
    <StMatrix>
      {matrix.map((row, index) => {
        return (
          <Row
            key={index}
            row={row}
            rowIndex={index}
            handleCellClick={handleCellClick}
          />
        );
      })}
    </StMatrix>
  );
}

const StMatrix = styled.div`
  display: table;
  border-collapse: collapse;
`;
