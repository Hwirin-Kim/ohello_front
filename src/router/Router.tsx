import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlayGamePage from "../pages/PlayGamePage";
import Test from "../pages/Test";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/game" element={<PlayGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
