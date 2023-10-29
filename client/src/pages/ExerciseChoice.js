import React, { useState } from "react";
import Header from "./header";
import SquatModal from "./modal/SquatModal";
import SideLateralModal from "./modal/SideLateralModal";
import ShoulderPressModal from "./modal/ShoulderPressModal";
import SideCrunchModal from "./modal/SideCrunchModal";
import styled from "styled-components";
import Footer from "./footer";
import { motion } from "framer-motion";
import "./body.css";

function ExerciseChoice() {
  const [squatOpen, setSquatOpen] = useState(false);
  const [sidelateralOpen, setsidelateralOpen] = useState(false);
  const [shoulderPressOpen, setShoulderPressOpen] = useState(false);
  const [sidecrunchOpen, setsidecrunchOpen] = useState(false);

  const openModal = (setter) => {
    setter(true);
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Title>운동 선택</Title>
        <ImagesContainer>
          <ExerciseItem
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openModal(setsidelateralOpen)}
          >
            <Image
              src="/exercise_img/sidelateralIcon.png"
              alt="health__image"
            />
            <ExerciseTitle>사이드 레터럴 레이즈</ExerciseTitle>
          </ExerciseItem>
          {sidelateralOpen && (
            <SideLateralModal setsidelateralOpen={setsidelateralOpen} />
          )}

          <ExerciseItem
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openModal(setSquatOpen)}
          >
            <Image src="/exercise_img/squatIcon.png" alt="health__image" />
            <ExerciseTitle>스쿼트</ExerciseTitle>
          </ExerciseItem>
          {squatOpen && <SquatModal setSquatOpen={setSquatOpen} />}

          <ExerciseItem
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openModal(setShoulderPressOpen)}
          >
            <Image src="/exercise_img/pressIcon.png" alt="health__image" />
            <ExerciseTitle>숄더 프레스</ExerciseTitle>
          </ExerciseItem>
          {shoulderPressOpen && (
            <ShoulderPressModal setShoulderPressOpen={setShoulderPressOpen} />
          )}

          <ExerciseItem
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openModal(setsidecrunchOpen)}
          >
            <Image src="/exercise_img/sidecrunchIcon.png" alt="health__image" />
            <ExerciseTitle>사이드 크런치</ExerciseTitle>
          </ExerciseItem>
          {sidecrunchOpen && (
            <SideCrunchModal setsidecrunchOpen={setsidecrunchOpen} />
          )}
        </ImagesContainer>
      </Wrapper>
      <Footer></Footer>
    </>
  );
}

const Title = styled.div`
  padding: 50px;
  margin: 30px;
  font-size: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px 0px 0px;
  min-height: 100vh;
  overflow-y: scroll;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const ExerciseItem = styled(motion.div)`
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

const Image = styled.img`
  width: 100%;
`;

const ExerciseTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;

export default ExerciseChoice;
