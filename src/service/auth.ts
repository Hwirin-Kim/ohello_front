import { AuthResponse, UserInfo, UserLogin } from "./../types";
import { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import { AxiosErrorType, RegisterForm } from "../types";
import { api } from "./axios";

interface ResponseDataType {
  message: string;
  code: number;
}

//회원가입
export const postRegister = async (payload: RegisterForm) => {
  const { data } = await api.post("/user/register", payload);
  return data;
};

//id중복검사
export const postDuplicate = async (payload: string) => {
  try {
    const response = await api.post("/user/check", { username: payload });
    if (response.status === 200 && response.data && response.data.message) {
      return { success: true, message: response.data.message };
    }
    return null;
  } catch (error) {
    if (isAxiosError<AxiosErrorType>(error)) {
      if (error.response && error.response.status === 409) {
        return {
          success: false,
          message: "중복된 ID 입니다.",
        };
      } else {
        return {
          success: false,
          message: "서버 오류 입니다.",
        };
      }
    } else {
      return {
        success: false,
        message: "서버 오류 입니다.",
      };
    }
  }
};

//로그인
export const postLogin = async (payload: UserLogin) => {
  const data = await api.post("/user/login", payload);
  const userInfo: UserInfo = data.data;
  const accessToken = data.headers["authorization"];
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ username: userInfo.username, nickname: userInfo.nickname })
  );
  return data;
};

export const authorization = async () => {
  try {
    const response = await api.get<AuthResponse>("/auth/check");

    if (response.data.isAuthenticated) {
      return {
        isAuthenticated: true,
        user: response.data.user,
      };
    } else {
      // 인증되지 않았으면 해당 상태를 반환합니다.
      return {
        isAuthenticated: false,
      };
    }
  } catch (error) {
    throw Error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/user/logout");
    return alert("로그아웃됨!");
  } catch (error) {
    console.error("logout failed", error);
    throw Error;
  }
};
