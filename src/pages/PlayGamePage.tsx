import { useState } from "react";
import { styled } from "styled-components";
import Row from "../components/Row";
import { getInitialMatrix } from "../utils/getInitialMatrix";

export default function PlayGamePage() {
  const [matrix, setMatrix] = useState(getInitialMatrix);

  const handleCellClick = (index: number) => {
    const [row, col] = [Math.floor(index / 8), index % 8];
    console.log(row, col);
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
