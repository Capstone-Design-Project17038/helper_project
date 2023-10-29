import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./header";

const SignUpPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate

  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 동작 중단
    try {
      const response = await axios.post("http://localhost:8123/signup", {
        loginId,
        password,
        nickname,
        passwordCheck,
      });

      // 회원가입 성공 시 처리
      console.log(response.data);
      alert("회원가입 성공");
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입 실패");
    }
  };

  return (
    <>
      <Header></Header>
      <TContainer>
        <Title>환영합니다!</Title>
        <SubTitle>기본 회원 정보를 등록해주세요</SubTitle>
        <SignUpContainer>
          <LogInForm type="text" placeholder="아이디" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
          <LogInForm type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <LogInForm
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LogInForm
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <SignUpBtn onClick={handleSignup} className="loginButton">
            회원가입
          </SignUpBtn>
        </SignUpContainer>
      </TContainer>
    </>
  );
};

const TContainer = styled.div`
  top: 200px;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
  }
`;

const Title = styled.div`
  margin-top: 200px;
  width: 466px;
  height: 94px;
  font-weight: 700;
  font-size: 50px;
  line-height: 47px;
`;
const SubTitle = styled.div`
  width: 466px;
  height: 94px;
  font-size: 28px;
  line-height: 47px;
`;

const SignUpContainer = styled.div`
  width: 466px;
`;

const SignUpBtn = styled.button`
  width: 80%;
  height: 45px;
  background-color: #0095f6;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  font-weight: 900;
  font-family: "nanumsquare";

  &:hover {
    cursor: pointer;
    background-color: #b9dffc;
  }
`;

const LogInForm = styled.input`
  width: 80%;
  height: 30px;
  padding: 10px;
  margin: 30px;
  display: block;
  border: 0;
  border-bottom: 1px solid #e1e2e3;
  font-weight: 900;
  font-family: "nanumsquare";
  font-size: 22px;

  &:focus {
    border-bottom: 2px solid black;
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 25px;
  }
  &::placeholder {
    font-size: 18px;
    color: #8e8e8e;
  }
`;

export default SignUpPage;
