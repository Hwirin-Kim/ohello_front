import React from "react";
import styled from "styled-components";
import { SimpleUser } from "../../../types";
import Stone from "../GameMatrix/Stone";

type Props = {
  userInfo: SimpleUser | undefined;
  isMe?: boolean;
  roomStatus: "waiting" | "ready" | "playing" | undefined;
};

export default function ProfileCard({ userInfo, isMe, roomStatus }: Props) {
  return (
    <StContainer $color={userInfo?.stoneColor}>
      {userInfo ? (
        <>
          <StInfoWrap>
            <StNickname>{isMe ? "나" : "상대"}</StNickname>
            {roomStatus !== "playing" ? (
              <StStatus>{userInfo.isReady ? "준비완료" : "대기중"}</StStatus>
            ) : (
              <StStatus>게임중</StStatus>
            )}
          </StInfoWrap>
          <StStoneColor>
            <Stone color={userInfo.stoneColor} height="30px" width="30px" />
          </StStoneColor>
        </>
      ) : (
        <StNoneUser>유저가 없습니다.</StNoneUser>
      )}
    </StContainer>
  );
}

const StContainer = styled.div<{ $color?: string }>`
  width: 10rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 1px solid #dddddd;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  ${(props) =>
    props.$color
      ? `box-shadow:${
          props.$color === "white"
            ? props.theme.border.white_shadow
            : props.theme.border.black_shadow
        }`
      : "white"}
`;

const StInfoWrap = styled.div``;

const StNickname = styled.p`
  font-size: 1rem;
`;
const StStatus = styled.div`
  font-size: 1rem;
`;
const StStoneColor = styled.p``;

const StNoneUser = styled.p``;

const StIsMe = styled.div``;
