import React from "react";
import { styled } from "styled-components";
export type SimpleUser = {
  username: string;
  nickname: string;
};
type Props = {
  opponent: SimpleUser | undefined;
};
export default function Opponent({ opponent }: Props) {
  return (
    <StContainer>
      {opponent ? (
        <>
          <StNick>{opponent.nickname}</StNick>
          <StReady>{opponent ? "준비완료" : "대기중"}</StReady>
        </>
      ) : (
        <StNick>상대가 없습니다.</StNick>
      )}
    </StContainer>
  );
}

const StContainer = styled.section`
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  gap: 1rem;
  padding: 0.3rem 1rem;
`;

const StNick = styled.span``;
const StVictory = styled.span``;
const StReady = styled.span``;
