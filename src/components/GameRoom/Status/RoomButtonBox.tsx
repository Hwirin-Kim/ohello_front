import React from "react";
import styled from "styled-components";

type Props = {
  isReady: boolean | undefined;
  isOwner: boolean;
  roomStatus: "waiting" | "ready" | "playing" | undefined;
  onLeaveRoomHandler: () => void;
  onReadyHandler: () => void;
  onGameStartHandler: () => void;
};

export default function RoomButtonBox({
  isReady,
  isOwner,
  roomStatus,
  onGameStartHandler,
  onLeaveRoomHandler,
  onReadyHandler,
}: Props) {
  return (
    <StContainer>
      <StButton onClick={onReadyHandler}>
        {isReady ? "준비완료" : "준비하기"}
      </StButton>
      {isOwner && roomStatus === "ready" && (
        <StButton onClick={onGameStartHandler}>게임시작</StButton>
      )}
      <StButton onClick={onLeaveRoomHandler}>방나가기</StButton>
    </StContainer>
  );
}

const StContainer = styled.div`
  width: 100%;
  max-width: 25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;
`;
const StButton = styled.button`
  color: #fff;
  box-shadow: ${({ theme }) => theme.border.border_shadow};
  border: 1px solid #fff;
  border-radius: 0.5rem;
  padding: 0.4em;
`;
