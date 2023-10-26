import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import "./Exercise.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header";
//import { drawKeypoints, drawSkeleton } from "./Draw";

function SideCrunch() {
  let Navigate = useNavigate();

  /*------------------------------------- 변수 선언부 -------------------------------------*/
  //결과값 출력 변수
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const [predictResult, setPredictResult] = useState("Predict result");

  let widthRef = useRef();
  let heightRef = useRef();

  //시작되었는지 확인하는 Flag 변수
  const [startFlag, setStartFlag] = useState(false);

  //CSS 관리를 위한 변수
  const [resultVisible, setResultVisible] = useState(false);

  //타이머 관련 변수
  const [timerFlag, setTimerFlag] = useState(false);
  const videoRef = useRef(null);
  const predictRef = useRef(null);
  const timerRef = useRef(0);
  const [curValue, setCurValue] = useState(5);
  const inputRef = useRef(null);
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

  const sideCrunch_model = async (data) => {
    const input_data = tf.tensor([data]);

    const model = await tf.loadLayersModel(
      "http://localhost:8123/models/side_crunch/model.json"
    );
    const predict = model.predict(input_data);
    const result = await predict.array();

    input_data.dispose();
    model.dispose();
    predict.dispose();

    console.log(result);

    return result;
  };
  /*-------------------------------------------------------------------------------------*/

  const side_crunch = () => {
    setTimeout(() => {
      window.open("/MainPage", "_self");
    }, 3000);

    axios({
      url: "http://localhost:8123/side_crunch",
      method: "POST",
      data: {
        counts: count,
      },
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/MainPage", "_self");
      }
    });
  };

  const toggleResultVisible = () => {
    setResultVisible(!resultVisible);
  };

  const btn_start_click = async () => {
    if (startFlag === false) {
      setStartFlag(true);
      let countdown = 6; // 카운트 다운 시작 값
      const countdownInterval = setInterval(() => {
        console.log(`Countdown: ${countdown}`);
        countdown -= 1;
        if (countdown === 0) {
          clearInterval(countdownInterval);
          startPoseEstimation(); // 5초 후 pose estimate 시작
        }
      }, 1000); // 1초마다 카운트 다운

      // 이전 포즈 유지 시간을 추적하기 위한 변수
      let previousPoseDuration = 0;

      const startPoseEstimation = async () => {
        console.log("start pose estimate");
        setTimerFlag(true);
        const video = videoRef.current;
        const net = await posenet.load();
        let previousPose = null;
        toggleResultVisible();

        let exerciseStartTime = null; // squat 동작 시작 시간을 기록하는 변수
        let exerciseDuration = 0;

        predictRef.current = setInterval(async () => {
          const pose = await net.estimateSinglePose(video);
          // 추정된 관절부 출력
          print_result(pose.keypoints);

          /* 딥러닝 모델을 이용해서 동작 판단 진행
             Stand = 0 (e[0][0]), Squat = 1 (e[0][1]) */
          if (pose.score) {
            sideCrunch_model(
              calc_body_angle(get_lower_keyPoints(pose.keypoints))
            ).then((e) => {
              console.log(calc_body_angle(get_lower_keyPoints(pose.keypoints)));
              if (e[0][0] - e[0][1] >= 0.5) {
                setPredictResult("stand");
                if (previousPose === "crunch" && exerciseDuration >= 1) {
                  setCount((prevCount) => prevCount + 1);
                  exerciseDuration = 0;
                }
                previousPose = "stand";
                // stand 동작으로 전환한 경우 squatStartTime 초기화
              } else if (e[0][1] - e[0][0] >= 0.5) {
                setPredictResult("crunch");
                previousPose = "crunch";

                if (exerciseStartTime === null) {
                  exerciseStartTime = new Date(); // squat 동작이 시작된 시간 기록
                } else {
                  // squat 동작을 유지 중이므로 squat 시작 후 시간 계산
                  const currentTime = new Date();
                  exerciseDuration = (currentTime - exerciseStartTime) / 1000; // 초 단위로 계산
                }
              }
            });
          } else {
            setPredictResult("unknown");
            previousPoseDuration = 0; // 포즈를 인식하지 못한 경우 previousPoseDuration 초기화
            exerciseStartTime = null; // 포즈를 인식하지 못한 경우 squatStartTime 초기화
          }
        }, 100);
      };
    }
  };

  const btn_stop_click = () => {
    if (startFlag === true) {
      setStartFlag(false);
      setTimerFlag(false);
      setCurValue(5);
      toggleResultVisible();
      clearInterval(predictRef.current);
    }
  };

  useEffect(() => {
    if (startFlag && curValue > 1) {
      const timerId = setInterval(() => {
        console.log(curValue);
        handleCountdown();
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [startFlag, curValue]);

  const changeValue = (newValue) => {
    setCurValue(newValue !== 100 ? newValue : 99);
  };

  const handleValueChange = (newValue, isField) => {
    newValue = parseInt(newValue, 10);

    if (!newValue) {
      if (isField) {
        newValue = "";
      } else {
        newValue = 0;
      }
    }
    if (newValue < 0) {
      newValue = 1;
    }

    if (!isField) {
      inputRef.current.style.transform =
        newValue > curValue ? "translateY(-100%)" : "translateY(100%)";
      inputRef.current.style.opacity = 0;

      setTimeout(() => {
        inputRef.current.style.transitionDuration = "0s";
        inputRef.current.style.transform =
          newValue > curValue ? "translateY(100%)" : "translateY(-100%)";
        inputRef.current.style.opacity = 0;
        changeValue(newValue);

        setTimeout(() => {
          inputRef.current.style.transitionDuration = "0.3s";
          inputRef.current.style.transform = "translateY(0)";
          inputRef.current.style.opacity = 1;
        }, 20);
      }, 250);
    } else {
      changeValue(newValue);
    }
  };

  const handleCountdown = () => {
    if (curValue >= 0) {
      handleValueChange(curValue - 1);
    }
  };

  useEffect(() => {
    setupCamera();
    console.log(videoRef);
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
          side_crunch(); // timer가 0이 되면 squat 함수 호출
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

  return (
    <>
      <Header />
      <div id="container">
        <div id="screen">
          <video id="video" width={640} height={480} ref={videoRef}></video>
        </div>
        {resultVisible && (
          <div id="showResult">
            <p>Timer={timer}</p>
            <p id="keypoints"></p>
            <p id="predict_result">{predictResult}</p>
            <p id="exercise_count">개수 : {count}</p>
          </div>
        )}
        {!resultVisible && (
          <div className="counter">
            <div className="input-wrapper">
              <input
                disabled
                className="input"
                onChange={(e) => {
                  e.preventDefault();
                  handleValueChange(e.target.value, true);
                }}
                ref={inputRef}
                type="text"
                value={curValue}
              />
            </div>
          </div>
        )}
        {!startFlag && (
          <div id="Buttons">
            <button id="btn_start" onClick={btn_start_click}>
              Start
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SideCrunch;
