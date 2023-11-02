import React from "react";
import Footer from "../footer";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import startWorkOut from "./startWorkOut.gif";
import styled from "styled-components";
import { motion } from "framer-motion";

function MainPage() {
  let navigate = useNavigate();

  const StartClick = () => {
    navigate("/ExerciseChoice");
  };

  return (
    <>
      <Header />
      <MainContainer>
        <SectionOne>
          <StartImage2 src="main_logo2.png" />
          <StartButton onClick={StartClick}>운동 시작하기</StartButton>
        </SectionOne>
      </MainContainer>
      <Footer />
    </>
  );
}

const SectionOne = styled.section`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: Column;
  margin-top: 30vh;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column; /* 위에서 아래로 정렬 (열) */
  justify-content: center; /*세로방향 가운데 정렬*/
  align-items: center;
  height: 100%;
  width: 100%;
`;
const StartButton = styled.button`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid #555;
  border-radius: 100px;
  font-weight: 900;
  background: transparent;
  font-size: 26px;
  color: #555;
  padding: 13px 24px;
  font-family: "Spoqa Han Sans Neo";

  &:hover {
    cursor: pointer;
    background: #a4c4ee;
    color: #ffffff;
    border: 2px solid #ffffff;
  }
`;
const StartImage2 = styled.img`
  width: 45%;
  padding-left: 250px;
  padding-bottom: 100px;
`;

export default MainPage;
