import { useState } from "react";
import { styled } from "styled-components";
import Row from "../components/Row";
import { getInitialMatrix } from "../utils/getInitialMatrix";

export default function PlayGamePage() {
  const [matrix, setMatrix] = useState(getInitialMatrix);
  return (
    <StMatrix>
      {matrix.map((row, index) => {
        return <Row row={row} />;
      })}
    </StMatrix>
  );
}

const StMatrix = styled.div`
  display: table;
  border-collapse: collapse;
`;
