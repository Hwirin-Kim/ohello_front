import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocketLayout from "../components/SocketLayout";
import HomePage from "../pages/HomePage";
import LobbyPage from "../pages/LobbyPage";

import GameRoomPage from "../pages/GameRoomPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<SocketLayout />}>
          <Route path="/room/:id" element={<GameRoomPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
