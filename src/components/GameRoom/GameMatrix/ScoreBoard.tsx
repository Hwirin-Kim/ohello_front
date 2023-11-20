import React from "react";
import { styled } from "styled-components";
import Stone from "./Stone";

type Props = {
  count: { white: number; black: number };
};
export default function ScoreBoard({ count }: Props) {
  return (
    <StSection>
      <StH1>Score</StH1>

      <StScoreContainer>
        <StWrap>
          <Stone color="white" width="25px" height="25px" />
          <StScore>{count.white}</StScore>
        </StWrap>
        <StWrap>
          <Stone color="black" width="25px" height="25px" />
          <StScore>{count.black}</StScore>
        </StWrap>
      </StScoreContainer>
    </StSection>
  );
}
const StSection = styled.section`
  margin-bottom: 1rem;
`;
const StH1 = styled.h1`
  font-size: 1.5rem;
`;

const StScoreContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
const StScore = styled.p`
  font-size: 1.3rem;
`;
const StWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`;
