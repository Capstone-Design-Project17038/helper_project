import React from "react";
import Login from "./Login";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

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
    <Wrapper>
      <LogoWrapper>
        <Logo src="helper.png" className="App-logo" alt="logo" />
      </LogoWrapper>

      {isLogin ? (
        <>
          <h3>{user.nickname} 님이 로그인했습니다.</h3>
          <button onClick={logout} className="loginButton">
            Logout
          </button>
        </>
      ) : (
        <Login setUser={setUser} setIsLogin={setIsLogin} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 100px;
`;

const Logo = styled.img`
  margin-bottom: 10px;
`;
