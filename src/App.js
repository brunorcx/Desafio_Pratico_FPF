import "styles/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
