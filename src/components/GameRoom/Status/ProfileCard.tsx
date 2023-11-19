import React from "react";
import styled from "styled-components";
import { SimpleUser } from "../../../types";

type Props = {
  userInfo: SimpleUser | undefined;
  isMe?: boolean;
};

export default function ProfileCard({ userInfo }: Props) {
  return (
    <StContainer>
      {userInfo ? (
        <>
          <StInfoWrap>
            <StNickname>{userInfo.nickname}</StNickname>
            <StStatus>{userInfo.isReady ? "대기중" : "준비완료"}</StStatus>
          </StInfoWrap>
          <StStoneColor>
            {userInfo.stoneColor === "black" ? "⚫️" : "⚪️"}
          </StStoneColor>
        </>
      ) : (
        <StNoneUser>유저가 없습니다.</StNoneUser>
      )}
    </StContainer>
  );
}

const StContainer = styled.div`
  width: 190px;
  height: 90px;
  border-radius: 20px;
  border: 1px solid #dddddd;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const StInfoWrap = styled.div``;

const StNickname = styled.p`
  font-size: 1.3rem;
`;
const StStatus = styled.div`
  font-size: 1.2rem;
`;
const StStoneColor = styled.p`
  font-size: 2rem;
`;

const StNoneUser = styled.p``;

const StIsMe = styled.div``;
