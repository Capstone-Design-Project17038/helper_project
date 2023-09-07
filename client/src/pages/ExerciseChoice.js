import React,  { useState } from "react";
import "./css/ExerciseChoice.css";
import Header from "./header";
import SquatModal from "./modal/SquatModal";
import LungeModal from "./modal/LungeModal";
import ShoulderPressModal from "./modal/ShoulderPressModal";
import TreeModal from "./modal/TreeModal";

function ExerciseChoice() {
  const [squatOpen, setSquatOpen] = useState(false);
  const [lungeOpen, setLungeOpen] = useState(false);
  const [ShoulderPressOpen, setShoulderPressOpen] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);

    // 모달창 노출
    const showSquat = () => {
      setSquatOpen(true);
    };
    const showLunge = () => {
      setLungeOpen(true);
    };
    const showShoulderPress = () => {
      setShoulderPressOpen(true);
    };
    const showTree = () => {
      setTreeOpen(true);
    };

  return (
    <>
    <Header></Header>
    <div className="mainLayout">
      <div className="rutin_page">
        <div className="rutin_pageFlex">
          <div className="rutin_pageInfo">
            <div className="rutin__img">
              <div className="rutin__wrap">
                  <img src="/exercise_img/lungeIcon.png" alt="health__image" onClick={showLunge}/>
                  {lungeOpen && <LungeModal setLungeOpen={setLungeOpen} />}
                <div>런지</div>
              </div>
              <div className="rutin__wrap">
                  <img src="/exercise_img/squatIcon.png" alt="health__image" onClick={showSquat}/>
                  {squatOpen && <SquatModal setSquatOpen={setSquatOpen} />}
                <div>스쿼트</div>
              </div>
              <div className="rutin__wrap">
                  <img src="/exercise_img/pressIcon.png" alt="health__image" onClick={showShoulderPress}/>
                  {ShoulderPressOpen && <ShoulderPressModal setShoulderPressOpen={setShoulderPressOpen} />}
                <div>숄더 프레스</div>
              </div>
              <div className="rutin__wrap">
                  <img src="/exercise_img/treeIcon.png" alt="health__image" onClick={showTree}/>
                  {treeOpen && <TreeModal setTreeOpen={setTreeOpen} />}
                <div>나무 자세</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ExerciseChoice