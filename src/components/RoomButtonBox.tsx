import React from "react";
import styled, { css } from "styled-components";

type Props = {
  isReady: boolean;
  isOwner: boolean;

  onLeaveRoomHandler: () => void;
  onReadyHandler: () => void;
  onGameStartHandler: () => void;
};

export default function RoomButtonBox({
  isReady,
  isOwner,

  onGameStartHandler,
  onLeaveRoomHandler,
  onReadyHandler,
}: Props) {
  return (
    <StContainer>
      {isOwner && <StButton onClick={onGameStartHandler}>게임시작</StButton>}
      <StButton onClick={onReadyHandler}>
        {isReady ? "준비완료" : "준비하기"}
      </StButton>
      <StButton onClick={onLeaveRoomHandler}>방나가기</StButton>
    </StContainer>
  );
}

const StContainer = styled.div``;
const StButton = styled.button`
  color: #fff;
  text-shadow: ${({ theme }) => theme.text.shadow};
  border: 1px solid #fff;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: ${({ theme }) => theme.border.shadow};
`;
