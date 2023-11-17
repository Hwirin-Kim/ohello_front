import React from "react";
import { styled } from "styled-components";
import { CellType } from "../types";

type Props = {
  count: { white: number; black: number };
};
export default function ScoreBoard({ count }: Props) {
  return (
    <StSection>
      <StH1>Score Board</StH1>

      <StScoreContainer>
        <StScore>{`⚪️ : ${count.white}`}</StScore>
        <StScore>{`⚫️ : ${count.black}`}</StScore>
      </StScoreContainer>
    </StSection>
  );
}
const StSection = styled.section``;
const StH1 = styled.h1``;

const StScoreContainer = styled.div``;
const StScore = styled.p``;
