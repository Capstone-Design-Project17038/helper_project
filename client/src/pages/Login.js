import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      <InputLogin
        type="email"
        placeholder="email"
        className="inputValue"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <InputLogin
        type="password"
        placeholder="password"
        className="inputValue"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button onClick={login} className="loginButton">
        Login
      </Button>
      <Button onClick={() => Navigate("/SignUpPage")} className="loginButton">
        SignUp
      </Button>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 100px;
`;

const InputLogin = styled.input`
  display: block;
  width: 270px;
  height: 40px;
  margin: 6px auto;
  padding: 0 10px;
  font-size: 14px;
  &::placeholder {
    font-size: 12px;
    color: #8e8e8e;
  }
  &:focus {
    border: 1px solid #8a8a8a;
    outline: none;
  }
`;

const Button = styled.button.attrs(() => ({
  type: "submit",
}))`
  width: 268px;
  height: 30px;
  margin: 13px 0;
  background-color: #0095f6;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 14px;
  font-weight: 600;

  &:disabled {
    background-color: #b9dffc;

    &:hover {
      cursor: default;
    }
  }

  &:enabled:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
