import React from "react";
import { styled } from "styled-components";

export default function Login() {
  return (
    <StContainer>
      <StForm>
        <StLabel>ID</StLabel>
        <StInput />
        <StLabel>PW</StLabel>
        <StInput />
        <StButtonWrap>
          <StButton>로그인</StButton>
          <StButton type="button">회원가입</StButton>
        </StButtonWrap>
      </StForm>
    </StContainer>
  );
}

const StContainer = styled.section``;

const StForm = styled.form``;
const StInput = styled.input``;
const StLabel = styled.label``;
const StButtonWrap = styled.div``;
const StButton = styled.button``;
