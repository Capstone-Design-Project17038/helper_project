import React from "react";
import Login from "./Login";
import { useEffect, useState } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

export default function Home() {
  const [mainTitle, setmainTitle] = useState(" ");
  const [count, setCount] = useState(0);
  const completionWord = "Helper";
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
    const typingInterval = setInterval(() => {
      setmainTitle((prevTitleValue) => {
        let result = prevTitleValue ? prevTitleValue + completionWord[count] : completionWord[0];
        setCount(count + 1);

        if (count >= completionWord.length) {
          setCount(0);
          setmainTitle("");
        }

        return result;
      });
    }, 300);

    return () => {
      clearInterval(typingInterval);
    };
  });

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
    <>
      <TitleContainer>
        <TitleImg src="slogan.png" />
      </TitleContainer>
      <Wrapper>
        <LogoWrapper>
          <Logo src="main_logo.gif" />
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
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  width: 100%
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
`;

const TitleImg = styled.img`
  width: 30%;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 100px;
  margin-bottom: 50px;
`;

const Logo = styled.img`
  margin-bottom: 10px;
  width: 350px;
  height: 350px;
`;
