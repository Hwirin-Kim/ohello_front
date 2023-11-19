import styled from "styled-components";
import Stone from "./Stone";
type Props = {
  color: string | undefined;

  handleCellClick: () => void;
};
export default function Cell({ color, handleCellClick }: Props) {
  return (
    <StCellContainer color={color} onClick={handleCellClick}>
      {color && <Stone color={color} width="75%" height="75%" />}
    </StCellContainer>
  );
}

const StCellContainer = styled.div<{ color?: string }>`
  display: table-cell;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${({ theme }) => theme.matrix.color};

  text-align: center;
  vertical-align: middle;
  font-size: 3rem;

  /* &::after {
    ${({ color }) => color === "white" && 'content:"⚪️"'}
    ${({ color }) => color === "black" && 'content:"⚫️"'}
  } */
`;
