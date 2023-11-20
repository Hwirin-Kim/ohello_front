import React from "react";
import styled from "styled-components";

type Props = {
  timer: number;
};
export default function TimerBar({ timer }: Props) {
  const maxNum = 15;
  const ratio = Math.floor((timer / maxNum) * 100);
  return (
    <StContainer>
      <StProgressBar $ratio={ratio} />
    </StContainer>
  );
}

const StContainer = styled.div`
  width: 100vw;
  position: absolute;
  top: 53px;
`;

const StProgressBar = styled.div<{ $ratio: number }>`
  width: ${({ $ratio }) => `${$ratio}%`};
  height: 0.2rem;
  background-color: white;
`;
