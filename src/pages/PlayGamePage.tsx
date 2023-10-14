import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Row from "../components/Row";
import ScoreBoard from "../components/ScoreBoard";
import { CellType } from "../types";
import { gameInformation } from "../utils/gameInformation";
import { getFlipTargets } from "../utils/gameLogic";

import { getInitialMatrix } from "../utils/getInitialMatrix";

export default function PlayGamePage() {
  const [matrix, setMatrix] = useState(getInitialMatrix);
  const [turn, setTurn] = useState<CellType>("black");
  const [gameOver, setGameOver] = useState(false);
  const [count, setCount] = useState({ white: 2, black: 2 });

  const handleCellClick = (index: number) => {
    const [row, col] = [Math.floor(index / 8), index % 8];
    console.log(`row:${row}, col:${col}`);

    const flipTargets =
      !matrix[row][col] && getFlipTargets(matrix, turn, { row, col });

    if (!flipTargets || !flipTargets.length) {
      alert("둘 수 없는 위치 입니다.");
      return;
    }

    setMatrix((prev) => {
      const newMatrix = prev.map((row) => [...row]);
      flipTargets.forEach(([r, c]) => {
        newMatrix[r][c] = turn;
      });
      newMatrix[row][col] = turn;
      return newMatrix;
    });

    setTurn((prev) => (prev === "white" ? "black" : "white"));
  };

  useEffect(() => {
    const { white, black, emptyCell, isAvailable } = gameInformation(
      turn,
      matrix
    );
    setCount({ white, black });

    if (!isAvailable) {
      if (!white || !black || !emptyCell.length) {
        alert(
          `GAME OVER : ${white > black ? "winner : white" : "winner : black"}`
        );
        setGameOver(true);
      } else {
        alert("둘 수 있는 자리가 없습니다. 상대에게 턴을 넘깁니다.");
        setTurn((prev) => (prev === "white" ? "black" : "white"));
      }
    }
    console.log(isAvailable);
  }, [turn, matrix]);

  return (
    <StArticle>
      <ScoreBoard count={count} turn={turn} />
      <StMatrix>
        {matrix.map((row, index) => {
          return (
            <Row
              key={index}
              row={row}
              rowIndex={index}
              handleCellClick={handleCellClick}
              gameOver={gameOver}
            />
          );
        })}
      </StMatrix>
    </StArticle>
  );
}
const StArticle = styled.article``;

const StMatrix = styled.div`
  display: table;
  border-collapse: collapse;
`;
