import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/login/Login";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  let Navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const counts = 100;

  const squat = () => {
    axios({
      url: "http://localhost:8123/squat",
      method: "POST",
      data: {
        counts: counts,
      },
      withCredentials: true,
    });
  };

  const view = () => {
    axios({
      url: "http://localhost:8123/view",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        console.log(result.data);
      }
    });
  };

  const rank = () => {
    axios({
      url: "http://localhost:8123/rank",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        console.log(result.data);
      }
    });
  };

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
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
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

  const week = () => {
    axios({
      url: "http://localhost:8123/week",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        console.log(result.data[0]);
      }
    });
  };
  const sum = () => {
    axios({
      url: "http://localhost:8123/sum",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        console.log(result.data);
      }
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
        
        {isLogin ? (
          <>
            <h3>{user.nickname} 님이 로그인했습니다.</h3>
            <button onClick={logout} className="loginButton">
              Logout
            </button>

            <button onClick={squat} className="squat">
              운동 스쿼트 했을때 db 들어가는 버튼
            </button>
            <button onClick={view} className="view">
              마이페이지에서 운동 한 양 보는 버튼
            </button>
            <button onClick={week} className="week">
              일주일치 보는 버튼
            </button>
            <button onClick={sum} className="sum">
              누적 갯수 순위 버튼
            </button>
            <button onClick={rank} className="rank">
              랭킹보기 버튼
            </button>
          </>
        ) : (
          <Login setUser={setUser} setIsLogin={setIsLogin} />
        )}
      </header>
    </div>
  );
}
