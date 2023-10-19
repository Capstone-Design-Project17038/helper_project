import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import MainPage from "./pages/main/MainPage";
import { UserContext } from "./context/LoginContext";
import MyPage from "./pages/MyPage";
import About from "./pages/About";
import Ranking from "./pages/Ranking";
import ExerciseChoice from "./pages/ExerciseChoice";
import SignUpPage from "./pages/SignUpPage";
import Squat from "./pages/exercise/Squat";
import SideLateralRaise from "./pages/exercise/SideLateralRaise";
import SideCrunch from "./pages/exercise/SideCrunch";
import ShoulderPress from "./pages/exercise/ShoulderPress";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [loginType, setLoginType] = useState("");

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ accessToken, setAccessToken, loginType, setLoginType }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Ranking" element={<Ranking />} />
            <Route path="/ExerciseChoice" element={<ExerciseChoice />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="/Squat" element={<Squat />} />
            <Route path="/SideLateralRaise" element={<SideLateralRaise />} />
            <Route path="/ShoulderPress" element={<ShoulderPress />} />
            <Route path="/SideCrunch" element={<SideCrunch />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
