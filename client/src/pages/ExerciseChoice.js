import React, { useState } from "react";
import Header from "./header";
import SquatModal from "./modal/SquatModal";
import SideLateralModal from "./modal/SideLateralModal";
import ShoulderPressModal from "./modal/ShoulderPressModal";
import SideCrunchModal from "./modal/SideCrunchModal";
import styled from "styled-components";
import Footer from "./footer";

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
      <Title>운동 선택</Title>
      <ExerciseChoiceContainer>
        <ExerciseOptionsContainer>
          <ExerciseOption>
            <img
              src="/exercise_img/sidelateralIcon.png"
              alt="health__image"
              onClick={() => openModal(setsidelateralOpen)}
            />
            {sidelateralOpen && <SideLateralModal setsidelateralOpen={setsidelateralOpen} />}
            <ExerciseTitle>사이드 레터럴 레이즈</ExerciseTitle>
          </ExerciseOption>
          <ExerciseOption>
            <img src="/exercise_img/squatIcon.png" alt="health__image" onClick={() => openModal(setSquatOpen)} />
            {squatOpen && <SquatModal setSquatOpen={setSquatOpen} />}
            <ExerciseTitle>스쿼트</ExerciseTitle>
          </ExerciseOption>
          <ExerciseOption>
            <img
              src="/exercise_img/pressIcon.png"
              alt="health__image"
              onClick={() => openModal(setShoulderPressOpen)}
            />
            {shoulderPressOpen && <ShoulderPressModal setShoulderPressOpen={setShoulderPressOpen} />}
            <ExerciseTitle>숄더 프레스</ExerciseTitle>
          </ExerciseOption>
          <ExerciseOption>
            <img
              src="/exercise_img/sidecrunchIcon.png"
              alt="health__image"
              onClick={() => openModal(setsidecrunchOpen)}
            />
            {sidecrunchOpen && <SideCrunchModal setsidecrunchOpen={setsidecrunchOpen} />}
            <ExerciseTitle>사이드 크런치</ExerciseTitle>
          </ExerciseOption>
        </ExerciseOptionsContainer>
      </ExerciseChoiceContainer>
      <Footer></Footer>
    </>
  );
}
const Title = styled.div`
  padding: 50px;
  margin: 30px;
  font-size: 30px;
`;
const ExerciseChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExerciseOptionsContainer = styled.div`
  display: flex;
  flex-direction: row; /* 가로로 배치 */
  justify-content: space-between; /* 옵션 사이의 간격 조절 */
  flex-wrap: wrap; /* 컨테이너가 넘칠 경우 다음 줄로 넘어갑니다. */
`;

const ExerciseOption = styled.div`
  display: flex;
  flex-direction: column; /* 각 옵션을 세로로 배열 */
  align-items: center;
  margin: 50px;

  img {
    width: 300px;
    height: 300px; /* 오타 'heigth'를 'height'로 수정했습니다. */
    cursor: pointer;
  }
`;

const ExerciseTitle = styled.div`
  margin-top: 20px; /* 제목 위에 약간의 여백을 추가합니다. */
  font-size: 20px;
`;
export default ExerciseChoice;
