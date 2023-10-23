import { RegisterForm } from "../types";
import { api } from "./axios";

//회원가입
export const postRegister = async (formData: RegisterForm) => {
  const { data } = await api.post("/register", formData);
  return data;
};
