import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SocketLayout from "../components/SocketLayout";
import HomePage from "../pages/HomePage";
import LobbyPage from "../pages/LobbyPage";

import GameRoomPage from "../pages/GameRoomPage";
import { useUserContext } from "../context/UserContext";
import LoginForm from "../components/LoginForm";
import SignUp from "../components/SignUp";

export default function Router() {
  const { isLogin } = useUserContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={isLogin ? <Navigate to="/lobby" /> : <HomePage />}
        />
        <Route element={<SocketLayout />}>
          <Route
            path="/room/:id"
            element={isLogin ? <GameRoomPage /> : <Navigate to="/" />}
          />
          <Route
            path="/lobby"
            element={isLogin ? <LobbyPage /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
