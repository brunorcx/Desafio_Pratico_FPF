import "styles/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Game from "pages/Game";
import Ranking from "pages/Ranking";
import Rules from "pages/Rules";

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/Rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
