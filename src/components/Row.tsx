import { styled } from "styled-components";
import { RowType } from "../types";

import Cell from "./Cell";

type Props = {
  row: RowType;
  rowIndex: number;
  handleCellClick: (index: number) => void;
  gameOver: boolean;
};
export default function Row({
  row,
  rowIndex,
  handleCellClick,
  gameOver,
}: Props) {
  return (
    <StRowContainer>
      {row.map((cell, index) => {
        return (
          <Cell
            key={`${rowIndex},${index}`}
            color={cell}
            handleCellClick={() =>
              gameOver ? undefined : handleCellClick(rowIndex * 8 + index)
            }
          />
        );
      })}
    </StRowContainer>
  );
}

const StRowContainer = styled.div`
  display: table-row;
  border-collapse: collapse;
`;
