import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./body.css";
import styled from "styled-components";

export default function Login({ setIsLogin, setUser }) {
  let Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios({
      url: "http://localhost:8123/login",
      method: "POST",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    }).then((result) => {
      if (result.status === 200) {
        window.open("/MainPage", "_self");
      }
    });
  };

  return (
    <LoginContainer>
      <InputLabel>이메일</InputLabel>
      <InputLogin
        label="이메일"
        type="email"
        placeholder="이메일"
        className="inputValue"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <InputLabel>비밀번호</InputLabel>
      <InputLogin
        type="password"
        placeholder="비밀번호"
        className="inputValue"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button onClick={login} className="loginButton">
        로그인
      </Button>
      <Button onClick={() => Navigate("/SignUpPage")} className="loginButton">
        회원가입
      </Button>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 80px;
`;

const InputLogin = styled.input`
  display: block;
  width: 300px;
  height: 40px;
  margin: 6px auto;
  padding: 0 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1.5px solid #8e8e8e;
  font-weight: 900;
  font-family: "nanumsquare";
  &::placeholder {
    font-size: 18px;
    color: #8e8e8e;
  }
  &:focus {
    border: 2px solid black;
    outline: none;
  }
`;

const InputLabel = styled.div`
  width: 300px;
  margin: 6px auto;
  text-align: left;
`;
const Button = styled.button`
  width: 320px;
  height: 40px;
  margin: 8px 0;
  background-color: #0095f6;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: 900;
  font-family: "nanumsquare";
  &:hover {
    cursor: pointer;
    background-color: #b9dffc;
  }
`;
