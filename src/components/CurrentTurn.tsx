import React from "react";
import { CellType } from "../types";
import styled from "styled-components";

type Props = {
  currentTurn: CellType;
};
export default function CurrentTurn({ currentTurn }: Props) {
  const stone = currentTurn === "black" ? "⚫️" : "⚪️";

  return (
    <StContainer>
      <StStone>{stone}</StStone>
      <StText>{currentTurn}돌의 턴 입니다.</StText>
    </StContainer>
  );
}

const StContainer = styled.div``;
const StStone = styled.span``;
const StText = styled.p``;
