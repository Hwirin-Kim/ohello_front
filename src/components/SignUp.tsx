import React from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { postDuplicate, postRegister } from "../service/auth";

export type FormValue = {
  username: string;
  nickname: string;
  password: string;
  password_check: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = async (data: FormValue) => {
    const formData = {
      username: data.username.trim(),
      nickname: data.nickname.trim(),
      password: data.password.trim(),
    };

    try {
      // 서버로 데이터 전송
      const responseData = await postRegister(formData);
      console.log("회원가입 성공:", responseData);
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  const validateUsername = async (username: string) => {
    const isDuplicate = await postDuplicate(username);
    if (isDuplicate) {
      if (isDuplicate.success) return true;
      else {
        console.log(isDuplicate.message);
        return isDuplicate.message;
      }
    } else return "서버 오류 입니다.";
  };

  return (
    <StContainer>
      <StForm onSubmit={handleSubmit((data) => onSubmit(data))}>
        <StLabel>ID</StLabel>
        <StInput
          {...register("username", {
            required: "필수로 입력하셔야 합니다.",
            pattern: {
              value: /^[a-z0-9]{4,16}$/,
              message: "영어와 숫자를 조합하여 4~16글자로 입력하세요",
            },
            validate: async (username) => await validateUsername(username),
          })}
        />
        {errors.username && errors.username.type === "required" && (
          <StError>{errors.username.message}</StError>
        )}
        {errors.username && errors.username.type === "pattern" && (
          <StError>{errors.username.message}</StError>
        )}
        {errors.username && errors.username.type === "validate" && (
          <StError>{errors.username.message}</StError>
        )}
        <StLabel>NICKNAME</StLabel>
        <StInput
          {...register("nickname", {
            pattern: /^[a-zA-Z0-9\u0000-\uFFFF]{2,5}$/,
            required: "필수로 입력하셔야 합니다.",
          })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <StError>{errors.nickname.message}</StError>
        )}
        {errors.nickname && errors.nickname.type === "pattern" && (
          <StError>2~5글자를 입력하세요!</StError>
        )}

        <StLabel>PASSWORD</StLabel>
        <StInput
          type="password"
          {...register("password", {
            minLength: 6,
            maxLength: 20,
            required: "필수로 입력하셔야 합니다.",
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <StError>{errors.password.message}</StError>
        )}
        {errors.password &&
          errors.password.type === ("minLength" || "maxLength") && (
            <StError>6~20글자 사이로 입력하세요</StError>
          )}

        <StLabel>PASSWORD CHECK</StLabel>
        <StInput
          type="password"
          {...register("password_check", {
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
            required: "필수로 입력하셔야 합니다.",
          })}
        />
        {errors.password_check && errors.password_check.type === "required" && (
          <StError>{errors.password_check.message}</StError>
        )}
        {errors.password_check && errors.password_check.type === "validate" && (
          <StError>{errors.password_check.message}</StError>
        )}
        <StButton disabled={Object.keys(errors).length > 0}>전송</StButton>
      </StForm>
    </StContainer>
  );
}
const StContainer = styled.section``;
const StForm = styled.form`
  max-width: 15rem;
  display: flex;
  flex-direction: column;
`;
const StInput = styled.input``;
const StLabel = styled.label`
  margin-top: 1rem;
`;
const StError = styled.p`
  color: red;
  font-size: 0.8rem;
`;
const StButton = styled.button`
  margin: 2rem 0;
`;
