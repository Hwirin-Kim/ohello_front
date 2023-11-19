import React from "react";
import { CellType } from "../../../types";
import styled from "styled-components";

type Props = {
  currentTurn: CellType;
  myColor: CellType;
};
export default function CurrentTurn({ currentTurn, myColor }: Props) {
  const stone = currentTurn === "black" ? "⚫️" : "⚪️";
  const isMyTurn = currentTurn === myColor;

  return (
    <StContainer>
      <StStone>
        {myColor === "black"
          ? "당신은 ⚫️ 흑돌 입니다."
          : "당신은 ⚪️ 백돌 입니다."}
      </StStone>
      <StText>
        {stone}
        {isMyTurn ? "본인 턴입니다." : "상대의 턴입니다."}
      </StText>
    </StContainer>
  );
}

const StContainer = styled.div``;
const StStone = styled.span``;
const StText = styled.p``;
