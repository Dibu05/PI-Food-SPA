import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import RecipeCreate from "./components/RecipeCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<RecipeCreate />} />
          <Route path="/recipes/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
