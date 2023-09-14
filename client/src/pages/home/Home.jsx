import React from "react";
import Login from "../../components/login/Login";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const counts = 5;
  const accessToken = () => {
    axios({
      url: "http://localhost:8123/accesstoken",
      method: "GET",
      withCredentials: true,
    });
  };

  const refreshToken = () => {
    axios({
      url: "http://localhost:8123/refreshtoken",
      method: "GET",
      withCredentials: true,
    });
  };

  const logout = () => {
    axios({
      url: "http://localhost:8123/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  const squart = () => {
    axios({
      url: "http://localhost:8123/squart",
      method: "GET",
      data: {
        counts: counts,
      },
      withCredentials: true,
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8123/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          console.log(result.data);
          if (result.data) {
            setIsLogin(true);
            console.log(result);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <header className="App-header">
        <img src="helper.png" className="App-logo" alt="logo" />
        <a onClick={accessToken} className="App-link">
          get Access Token
        </a>
        <a onClick={refreshToken} className="App-link">
          get Refresh Token
        </a>
        {isLogin ? (
          <>
            <h3>{user.nickname} 님이 로그인했습니다.</h3>
            <button onClick={logout} className="loginButton">
              Logout
            </button>

            <button onClick={squart} className="squart">
              운동 완료 테스트 버튼
            </button>
          </>
        ) : (
          <Login setUser={setUser} setIsLogin={setIsLogin} />
        )}
      </header>
    </div>
  );
}
