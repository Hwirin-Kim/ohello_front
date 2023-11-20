import React from "react";
import { CellType } from "../../../types";
import styled from "styled-components";

type Props = {
  currentTurn: CellType;
  myColor: CellType;
};
export default function CurrentTurn({ currentTurn, myColor }: Props) {
  const isMyTurn = currentTurn === myColor;

  return (
    <StContainer>
      <StText>{isMyTurn ? "당신 차례입니다." : "상대방 차례입니다."}</StText>
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
`;

const StText = styled.p`
  font-weight: 300;
`;
