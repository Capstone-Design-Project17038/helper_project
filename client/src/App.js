import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Git from "./components/callback/Git";
import Google from "./components/callback/Google";
import Kakao from "./components/callback/Kakao";
import MainPage from "./pages/main/MainPage";
import { UserContext } from "./context/LoginContext";
import MyPage from "./pages/MyPage";
import About from "./pages/About";
import Work from "./pages/Work";
import ExerciseChoice from "./pages/ExerciseChoice";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [loginType, setLoginType] = useState("");

  useEffect(() => {
    if (accessToken) {
      switch (loginType) {
        case "GIT":
          axios({
            url: "https://api.github.com/user",
            method: "get",
            headers: {
              Authorization: `token ${accessToken}`,
            },
          })
            .then((result) => {
              console.log("user info from github", result);
            })
            .catch((error) => {
              console.log(error);
            });

          break;
        case "GOOGLE":
          break;
        case "KAKAO":
          axios({
            url: "https://kapi.kakao.com/v2/user/me",
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((result) => {
              console.log("user info from kakao", result);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        default:
          break;
      }
    }
  }, [accessToken]);

  return (
    <div className="App" style={{ fontFamily: "NanumSquareNeo-Variable" }}>
      <Router>
        <UserContext.Provider
          value={{ accessToken, setAccessToken, loginType, setLoginType }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/auth/callback/git" element={<Git />} />
            <Route path="/auth/callback/google" element={<Google />} />
            <Route path="/auth/callback/kakao" element={<Kakao />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Work" element={<Work />} />
            <Route path="/ExerciseChoice" element={<ExerciseChoice />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />

          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;