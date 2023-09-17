import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import MainPage from "./pages/main/MainPage";
import { UserContext } from "./context/LoginContext";
import MyPage from "./pages/MyPage";
import About from "./pages/About";
import Work from "./pages/Work";
import ExerciseChoice from "./pages/ExerciseChoice";
import SignUpPage from "./pages/SignUpPage";
import Squat from "./pages/exercise/Squat";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [loginType, setLoginType] = useState("");

  return (
    <div className="App">
      <Router>
        <UserContext.Provider
          value={{ accessToken, setAccessToken, loginType, setLoginType }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Work" element={<Work />} />
            <Route path="/ExerciseChoice" element={<ExerciseChoice />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="/Squat" element={<Squat />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
