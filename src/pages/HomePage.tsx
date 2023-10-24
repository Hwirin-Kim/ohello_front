import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function HomePage() {
  const navigation = useNavigate();
  return (
    <>
      <Login />
      <h1>오델로 페이지</h1>
      <button onClick={() => navigation("/lobby")}>로비로 이동하기</button>
    </>
  );
}
