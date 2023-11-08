import { useUserContext } from "./context/UserContext";
import Router from "./router/Router";

function App() {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return <div>회원 정보 받아오는 중...</div>;
  }

  return <Router />;
}

export default App;
