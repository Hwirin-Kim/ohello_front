import { UserContextProvider } from "./context/UserContext";
import Router from "./router/Router";

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
