import React from "react";
import { styled } from "styled-components";
import { CellType } from "../../../types";
import Stone from "./Stone";

type Props = {
  count: { white: number; black: number };
};
export default function ScoreBoard({ count }: Props) {
  return (
    <StSection>
      <StH1>Score Board</StH1>

      <StScoreContainer>
        <StWrap>
          <Stone color="white" width="20px" height="20px" />
          <StScore>{count.white}</StScore>
        </StWrap>
        <StWrap>
          <Stone color="black" width="20px" height="20px" />
          <StScore>{count.black}</StScore>
        </StWrap>
      </StScoreContainer>
    </StSection>
  );
}
const StSection = styled.section``;
const StH1 = styled.h1``;

const StScoreContainer = styled.div`
  display: flex;
`;
const StScore = styled.p``;
const StWrap = styled.div``;
