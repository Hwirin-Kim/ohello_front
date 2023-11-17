import { ThemeProvider } from "styled-components";
import { useUserContext } from "./context/UserContext";
import Router from "./router/Router";
import { theme } from "./styles/theme";

function App() {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return <div>회원 정보 받아오는 중...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
