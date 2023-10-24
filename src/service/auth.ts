import { AxiosError, isAxiosError } from "axios";
import { AxiosErrorType, RegisterForm } from "../types";
import { api } from "./axios";

interface ResponseDataType {
  message: string;
  code: number;
}

//회원가입
export const postRegister = async (formData: RegisterForm) => {
  const { data } = await api.post("/register", formData);
  return data;
};

//id중복검사
export const postDuplicate = async (username: string) => {
  try {
    const response = await api.post("/check", { username });
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
