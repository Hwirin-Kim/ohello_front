import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocketLayout from "../components/SocketLayout";
import HomePage from "../pages/HomePage";
import LobbyPage from "../pages/LobbyPage";

import GameRoomPage from "../pages/GameRoomPage";

import SignUp from "../components/SignUp";
import ProtectedRouter from "./ProtectedRouter";
import Layout from "../components/layout/Layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route element={<SocketLayout />}>
            <Route element={<ProtectedRouter />}>
              <Route path="/room/:id" element={<GameRoomPage />} />
              <Route path="/lobby" element={<LobbyPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
