import { styled } from "styled-components";
import { RowType } from "../utils/getInitialMatrix";
import Cell from "./Cell";

type Props = {
  row: RowType;
};
export default function Row({ row }: Props) {
  return (
    <StRowContainer>
      {row.map((cell, index) => {
        return <Cell color={cell} />;
      })}
    </StRowContainer>
  );
}

const StRowContainer = styled.div`
  display: table-row;
  border-collapse: collapse;
`;
