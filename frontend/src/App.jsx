import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AskPage from "./pages/AskPage";
import HistoryPage from "./pages/HistoryPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;