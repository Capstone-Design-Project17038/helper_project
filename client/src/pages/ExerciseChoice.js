import React from "react";
import "./css/ExerciseChoice.css";
import Header from "./header";

function ExerciseChoice() {
  return (
    <>
    <Header></Header>
    <div className="mainLayout">
      <div className="rutin_page">
        <div className="rutin_pageFlex">
          <div className="rutin_pageInfo">
            <div className="rutin__img">
              <div className="rutin__wrap">
                <a href="/Lunge">
                  <img src="/exercise_img/lungeIcon.png" alt="health__image" />
                </a>
                <div>런지</div>
              </div>
              <div className="rutin__wrap">
                <a href="/Squat">
                  <img src="/exercise_img/squatIcon.png" alt="health__image" />
                </a>
                <div>스쿼트</div>
              </div>
              <div className="rutin__wrap">
                <a href="/ShoulderPress">
                  <img src="/exercise_img/pressIcon.png" alt="health__image" />
                </a>
                <div>숄더 프레스</div>
              </div>
              <div className="rutin__wrap">
                <a href="/Tree">
                  <img src="/exercise_img/treeIcon.png" alt="health__image" />
                </a>
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