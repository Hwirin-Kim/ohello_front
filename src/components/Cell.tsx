import { styled } from "styled-components";
type Props = {
  color: string | undefined;

  handleCellClick: () => void;
};
export default function Cell({ color, handleCellClick }: Props) {
  return <StCellContainer color={color} onClick={handleCellClick} />;
}

const StCellContainer = styled.div<{ color?: string }>`
  display: table-cell;
  width: 4rem;
  height: 4rem;
  border: 1px solid;
  text-align: center; /* 수평 가운데 정렬 */
  vertical-align: middle; /* 수직 가운데 정렬 */
  font-size: 3rem;

  &::after {
    ${({ color }) => color === "white" && 'content:"⚪️"'}
    ${({ color }) => color === "black" && 'content:"⚫️"'}
  }
`;
