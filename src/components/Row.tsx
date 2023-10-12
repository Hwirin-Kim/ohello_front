import { styled } from "styled-components";
import { RowType } from "../types";

import Cell from "./Cell";

type Props = {
  row: RowType;
  rowIndex: number;
  handleCellClick: (index: number) => void;
};
export default function Row({ row, rowIndex, handleCellClick }: Props) {
  return (
    <StRowContainer>
      {row.map((cell, index) => {
        return (
          <Cell
            key={`${rowIndex},${index}`}
            color={cell}
            handleCellClick={() => handleCellClick(rowIndex * 8 + index)}
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
