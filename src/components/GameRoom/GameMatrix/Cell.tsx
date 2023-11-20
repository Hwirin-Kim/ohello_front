import styled from "styled-components";
import Stone from "./Stone";
import { devices } from "../../../styles/devices";
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
  width: 2.5rem;
  min-width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.matrix.color};
  text-align: center;
  vertical-align: middle;
  font-size: 3rem;
  @media ${devices.sm} {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
  }
`;
