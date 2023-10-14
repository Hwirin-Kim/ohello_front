import React from "react";
import { styled } from "styled-components";

type Props = {
  count: { white: number; black: number };
  turn: string;
};
export default function ScoreBoard({ count, turn }: Props) {
  return (
    <StSection>
      <StH1>Score Board</StH1>
      <StTurn>{turn} 의 차례</StTurn>
      <StScoreContainer>
        <StScore>{`⚪️ : ${count.white}`}</StScore>
        <StScore>{`⚫️ : ${count.black}`}</StScore>
      </StScoreContainer>
    </StSection>
  );
}
const StSection = styled.section``;
const StH1 = styled.h1``;
const StTurn = styled.p``;
const StScoreContainer = styled.div``;
const StScore = styled.p``;
