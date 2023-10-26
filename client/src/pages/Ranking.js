import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import SquatRanking from "./ranking/SquatRanking";
import ShoulderRanking from "./ranking/ShoulderRanking";
import SideCrunchRanking from "./ranking/SideCrunchRanking";
import SideLateralRanking from "./ranking/SideLateralRanking";

function Ranking() {
  const [exercise, setExercise] = useState(1);

  const exercises = ["스쿼트", "숄더프레스", "사이드크런치", "사이드레터럴레이즈"];

  const rankComponents = [<SquatRanking />, <ShoulderRanking />, <SideCrunchRanking />, <SideLateralRanking />];

  return (
    <>
      <Header></Header>
      <Wrapper>
        <ImagesContainer>
          <ImageContainer
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExercise(1)}
            src="/exercise_img/squatIcon.png"
            alt="squat"
          />
          <ImageContainer
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExercise(2)}
            src="/exercise_img/pressIcon.png"
            alt="burpee"
          />
          <ImageContainer
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExercise(3)}
            src="/exercise_img/sidecrunchIcon.png"
            alt="pushup"
          />
          <ImageContainer
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExercise(4)}
            src="/exercise_img/sidelateralIcon.png"
            alt="pushup"
          />
        </ImagesContainer>
        <Title layout>{exercises[exercise - 1]}</Title>
        <SubTitle>랭킹은 1위부터 100위까지만 표시됩니다.</SubTitle>
        {rankComponents[exercise - 1]}
      </Wrapper>
      <Footer></Footer>
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px 0px 0px;
  min-height: 100vh;
  overflow-y: scroll;
`;

const Title = styled(motion.p)`
  font-size: 30px;
  font-weight: 600;
  margin: 20px 0;

  @media (max-width: 414px) {
    font-size: 1.5rem;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #b3b3b3;
  font-weight: 600;

  @media (max-width: 414px) {
    font-size: 1rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;
const ImageContainer = styled(motion.img)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0px 15px;
  cursor: pointer;
  width: 40%;
  @media (max-width: 414px) {
    width: 90%;
    margin: 0px 10px;
  }
`;

export default Ranking;
