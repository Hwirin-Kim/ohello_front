import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Home/LoginForm";

export default function HomePage() {
  const navigation = useNavigate();

  return (
    <>
      <LoginForm />
      <h1>오델로 페이지</h1>
    </>
  );
}
