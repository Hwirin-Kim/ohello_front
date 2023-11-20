import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useUserContext } from "../../context/UserContext";
import { logout } from "../../service/auth";

export default function Header() {
  const { isLogin, setIsLogin, userInfo } = useUserContext();
  const navigation = useNavigate();
  const onLogoutHandler = () => {
    logout();
    setIsLogin(false);
    navigation("/");
  };
  const onLoginHandler = () => {
    navigation("/");
  };

  return (
    <StHeader>
      <StH1>Othello</StH1>
      <StWrapper>
        {isLogin && <StNickname>{userInfo.nickname}님 반가워요!</StNickname>}
        <StLogin onClick={isLogin ? onLogoutHandler : onLoginHandler}>
          {isLogin ? "로그아웃" : "로그인"}
        </StLogin>
      </StWrapper>
    </StHeader>
  );
}

const StHeader = styled.header`
  width: 100vw;
  height: 3rem;
  border-bottom: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  box-shadow: ${({ theme }) => theme.border.border_shadow};
`;

const StH1 = styled.h1`
  font-size: 1.5rem;
  color: "white";
  text-shadow: ${({ theme }) => theme.text.logo_text_shadow};
`;

const StLogin = styled.button`
  font-size: 1rem;
  text-shadow: ${({ theme }) => theme.text.logo_text_shadow};
`;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StNickname = styled.p`
  font-size: 1rem;
  text-shadow: ${({ theme }) => theme.text.small_text_shadow};
`;
