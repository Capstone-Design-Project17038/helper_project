import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import "./Exercise.css";
import "./Timer.css";
import axios from "axios";
import Header from "../header";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ShowResultModal from "../modal/ShowResultModal";
//import { drawKeypoints, drawSkeleton } from "./Draw";

function SideLateralRaise() {
  /*------------------------------------- 변수 선언부 -------------------------------------*/
  //결과값 출력 변수
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const [counter, setCounter] = useState(5);
  const [predictResult, setPredictResult] = useState("Predict result");

  let widthRef = useRef();
  let heightRef = useRef();

  //시작되었는지 확인하는 Flag 변수
  const [startFlag, setStartFlag] = useState(false);

  //CSS 관리를 위한 변수
  const [resultVisible, setResultVisible] = useState(false);
  const [counterVisible, setCounterVisible] = useState(false);
  const [showResultVisible, setShowResultVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);

  //타이머 관련 변수
  const [timerFlag, setTimerFlag] = useState(false);
  const videoRef = useRef(null);
  const predictRef = useRef(null);
  const timerRef = useRef(0);
  const counterRef = useRef(0);
  /*-------------------------------------------------------------------------------------*/

  /*------------------------------------- 카메라 세팅 -------------------------------------*/
  const setupCamera = async () => {
    const video = videoRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    video.srcObject = stream;
    video.play();

    console.log("camera set up success");
  };
  /*-------------------------------------------------------------------------------------*/

  /*------------------------------------- 모델 관련 함수 -------------------------------------*/
  const print_result = (keypoints) => {
    const keypoint_list = [
      "nose",
      "leftEye",
      "rightEye",
      "leftEar",
      "rightEar",
      "leftShoulder",
      "rightShoulder",
      "leftElbow",
      "rightElbow",
      "leftWrist",
      "rightWrist",
      "leftHip",
      "rightHip",
      "leftKnee",
      "rightKnee",
      "leftAnkle",
      "rightAnkle",
    ];
    let keypoints_arr = [];

    for (let i = 0; i < keypoint_list.length; i++) {
      const x = Math.round(keypoints[i].position.x);
      const y = Math.round(keypoints[i].position.y);
      keypoints_arr.push(`${keypoint_list[i]}: (${x}, ${y}) `);
    }
  };

  //모든 관절부 데이터
  const get_keyPoints = (keypoints) => {
    const arr = [];
    for (let i = 0; i < 17; i++) {
      arr.push(keypoints[i].position.x);
      arr.push(keypoints[i].position.y);
    }

    return arr;
  };

  //상체 관절부 계산 함수
  const get_upper_keyPoints = (keypoints) => {
    const arr = [];
    for (let i = 5; i < 13; i++) {
      arr.push(keypoints[i].position.x / 640);
      arr.push(keypoints[i].position.y / 480);
    }

    return arr;
  };

  //하체 관절부 계산 함수
  const get_lower_keyPoints = (keypoints) => {
    const arr = [];

    for (let i = 5; i < 7; i++) {
      arr.push(keypoints[i].position.x / 640);
      arr.push(keypoints[i].position.y / 480);
    }
    for (let i = 11; i < 17; i++) {
      arr.push(keypoints[i].position.x / 640);
      arr.push(keypoints[i].position.y / 480);
    }

    return arr;
  };

  //관절 각도 계산 함수
  const calc_angle = (pivot, fst_loc, snd_loc) => {
    const vector1 = [fst_loc[0] - pivot[0], fst_loc[1] - pivot[1]];
    const vector2 = [snd_loc[0] - pivot[0], snd_loc[1] - pivot[1]];

    const dot_product = vector1[0] * vector2[0] + vector1[1] * vector2[1];
    const magnitude1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
    const magnitude2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);
    const angle_rad = Math.acos(dot_product / (magnitude1 * magnitude2));

    const angle_deg = (angle_rad * 180) / Math.PI / 180;

    return angle_deg;
  };

  const calc_body_angle = (data) => {
    const keypoint_list = [
      "left_shoulder",
      "right_shoulder",
      "left_hip",
      "right_hip",
      "left_knee",
      "right_knee",
      "left_ankle",
      "right_ankle",
    ];
    const angle_keypoint_list = [
      "angle_leftHip",
      "angle_rightHip",
      "angle_leftKnee",
      "angle_rightKnee",
    ];

    const arr = data;
    const keypoints = {};
    const angles = {};

    for (let i = 0; i < keypoint_list.length; i++) {
      keypoints[keypoint_list[i]] = [data[i * 2], data[i * 2 + 1]];
    }

    angles[angle_keypoint_list[0]] = calc_angle(
      keypoints["left_hip"],
      keypoints["left_shoulder"],
      keypoints["left_knee"]
    );

    angles[angle_keypoint_list[1]] = calc_angle(
      keypoints["right_hip"],
      keypoints["right_shoulder"],
      keypoints["right_knee"]
    );

    angles[angle_keypoint_list[2]] = calc_angle(
      keypoints["left_knee"],
      keypoints["left_hip"],
      keypoints["left_ankle"]
    );

    angles[angle_keypoint_list[3]] = calc_angle(
      keypoints["right_knee"],
      keypoints["right_hip"],
      keypoints["right_ankle"]
    );

    for (let i = 0; i < 4; i++) {
      arr.push(angles[angle_keypoint_list[i]]);
    }

    return arr;
  };

  const sideLateralRaise_model = async (data) => {
    const input_data = tf.tensor([data]);

    const model = await tf.loadLayersModel(
      "http://localhost:8123/models/side_lateral_raise/model.json"
    );
    const predict = model.predict(input_data);
    const result = await predict.array();

    input_data.dispose();
    model.dispose();
    predict.dispose();

    return result;
  };
  /*-------------------------------------------------------------------------------------*/

  const toggleResultVisible = () => {
    setResultVisible(!resultVisible);
  };

  const btn_start_click = async () => {
    if (startFlag === false) {
      setStartFlag(true);
      setCounter(5);
      setCounterVisible(true);
      setBtnVisible(false);
      let countdown = 5; // 카운트 다운 시작 값
      const countdownInterval = setInterval(() => {
        console.log(`Countdown: ${countdown}`);
        countdown -= 1;
        if (countdown === 0) {
          clearInterval(countdownInterval);
          startPoseEstimation(); // 5초 후 pose estimate 시작
        }
      }, 1000); // 1초마다 카운트 다운

      const startPoseEstimation = async () => {
        console.log("start pose estimate");
        setTimerFlag(true);
        const video = videoRef.current;
        const net = await posenet.load();
        let previousPose = null;
        toggleResultVisible();

        let exerciseStartTime = null; // squat 동작 시작 시간을 기록하는 변수
        let exerciseDuration = 0;
        let currentTime = null;

        predictRef.current = setInterval(async () => {
          const pose = await net.estimateSinglePose(video);
          // 추정된 관절부 출력
          print_result(pose.keypoints);

          /* 딥러닝 모델을 이용해서 동작 판단 진행
             Stand = 0 (e[0][0]), Squat = 1 (e[0][1]) */
          if (pose.score >= 0.85) {
            sideLateralRaise_model(
              calc_body_angle(get_upper_keyPoints(pose.keypoints))
            ).then((e) => {
              if (e[0][0] - e[0][1] >= 0.5) {
                setPredictResult("stand");
                if (previousPose === "raise") {
                  currentTime = new Date();
                  exerciseDuration = (currentTime - exerciseStartTime) / 1000;
                  console.log(exerciseDuration);
                  if (exerciseDuration >= 2) {
                    setCount((prevCount) => prevCount + 1);
                    exerciseDuration = 0;
                    currentTime = null;
                    exerciseStartTime = null;
                  }
                }
                previousPose = "stand";
                // stand 동작으로 전환한 경우 squatStartTime 초기화
              } else if (e[0][1] - e[0][0] >= 0.5) {
                if (previousPose === "stand") {
                  exerciseStartTime = new Date();
                  console.log(exerciseStartTime);
                }
                setPredictResult("raise");
                previousPose = "raise";
              }
            });
          } else {
            setPredictResult("unknown");
            exerciseStartTime = null; // 포즈를 인식하지 못한 경우 squatStartTime 초기화
            currentTime = null;
            exerciseStartTime = null;
          }
        }, 100);
      };
    }
  };

  const btn_stop_click = () => {
    if (startFlag === true) {
      setStartFlag(false);
      setTimerFlag(false);
      toggleResultVisible();
      clearInterval(predictRef.current);
    }
  };

  useEffect(() => {
    let counterID;

    if (startFlag) {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
      counterID = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
        if (counter === 1) {
          setCounterVisible(false);
          clearInterval(counterID);
          if (counterRef.current) {
            clearInterval(counterRef.current);
          }
        }
      }, 1000);
    } else {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    }
    counterRef.current = counterID;
  }, [startFlag, counter]);

  useEffect(() => {
    setupCamera();
  }, []); // 빈 배열을 전달하여 페이지가 처음 로드될 때만 실행

  // 타이머 useEffect
  useEffect(() => {
    let timerId;

    if (timerFlag) {
      // 기존 타이머가 있으면 먼저 해제
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        if (timer === 0) {
          setShowResultVisible(true);
          btn_stop_click();
          clearInterval(timerId); // 타이머 해제
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }
      }, 1000);
    } else {
      // 타이머가 종료되면 해제
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    // 타이머 ID를 저장하여 나중에 해제할 수 있도록 함
    timerRef.current = timerId;
  }, [timerFlag, timer]); // timer 값도 감시

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">결과 집계중</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div id="container">
        <div id="screen">
          <video id="video" width={640} height={480} ref={videoRef}></video>
        </div>
        {resultVisible && (
          <div id="showResult">
            <p hidden>Timer={timer}</p>
            <CountdownCircleTimer
              isPlaying
              duration={30}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: false, delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer>
            <p id="predict_result">{predictResult}</p>
            <p id="exercise_count">개수 : {count}</p>
          </div>
        )}
        {counterVisible && (
          <div className={startFlag ? "active" : ""}>{counter}</div>
        )}
        {showResultVisible && (
          <ShowResultModal count={count} workOutType={"SideLateralRaise"} />
        )}
      </div>
      {btnVisible && (
        <div id="Buttons">
          <button id="btn_start" onClick={btn_start_click}>
            Start
          </button>
        </div>
      )}
    </>
  );
}

export default SideLateralRaise;
