import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import "./Squat.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Counter from "./Counter";
//import { drawKeypoints, drawSkeleton } from "./Draw";

function SideLateralRaise() {
  let Navigate = useNavigate();
  /*------------------------------------- 변수 선언부 -------------------------------------*/
  //결과값 출력 변수
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState("Result");
  const [predictResult, setPredictResult] = useState("Predict result");

  //시작되었는지 확인하는 Flag 변수
  const [startFlag, setStartFlag] = useState(false);

  //CSS 관리를 위한 변수
  const [resultVisible, setResultVisible] = useState(false);
  const [countVisible, setCountVisible] = useState(true);

  //타이머 관련 변수
  const [countDownProp, setCountDownProp] = useState("");
  const [countDown, setCountDown] = useState(0);
  const [timerFlag, setTimerFlag] = useState(false);
  const videoRef = useRef(null);
  const predictRef = useRef(null);
  const timerRef = useRef(0);
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
    setResult(keypoints_arr);
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
      arr.push(keypoints[i].position.x);
      arr.push(keypoints[i].position.y);
    }

    return arr;
  };

  //하체 관절부 계산 함수
  const get_lower_keyPoints = (keypoints) => {
    const arr = [];

    for (let i = 5; i < 7; i++) {
      arr.push(keypoints[i].position.x);
      arr.push(keypoints[i].position.y);
    }
    for (let i = 11; i < 17; i++) {
      arr.push(keypoints[i].position.x);
      arr.push(keypoints[i].position.y);
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

    const angle_deg = (angle_rad * 180) / Math.PI;

    return angle_deg;
  };

  const calc_body_angle = (data) => {
    const keypoint_list = [
      "left_shoulder",
      "right_shoulder",
      "left_elbow",
      "right_elbow",
      "left_hip",
      "right_hip",
    ];
    const angle_keypoint_list = ["angle_leftShoulder", "angle_rightShoulder"];

    const arr = data;
    const keypoints = {};
    const angles = {};

    for (let i = 0; i < 4; i++) {
      keypoints[keypoint_list[i]] = [data[i * 2], data[i * 2 + 1]];
    }
    for (let i = 6; i < 8; i++) {
      keypoints[keypoint_list[i - 2]] = [data[i * 2], data[i * 2 + 1]];
    }

    angles[angle_keypoint_list[0]] = calc_angle(
      keypoints["left_shoulder"],
      keypoints["left_elbow"],
      keypoints["left_hip"]
    );

    angles[angle_keypoint_list[1]] = calc_angle(
      keypoints["right_shoulder"],
      keypoints["right_elbow"],
      keypoints["right_hip"]
    );

    for (let i = 0; i < 2; i++) {
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

  const side_lateral_raise = () => {
    axios({
      url: "http://localhost:8123/side_lateral_raise",
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

  const toggleCountVisible = () => {
    setCountVisible(!countVisible);
  };

  const btn_start_click = async () => {
    if (startFlag === false) {
      setStartFlag(true);
      setCountDownProp(true);
      let countdown = 1; // 카운트 다운 시작 값
      setCountDown(countdown);
      const countdownInterval = setInterval(() => {
        console.log(`Countdown: ${countdown}`);
        countdown -= 1;
        setCountDown((prevCount) => prevCount - 1);
        if (countdown === 0) {
          toggleCountVisible();
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

        predictRef.current = setInterval(async () => {
          const pose = await net.estimateSinglePose(video);

          // 추정된 관절부 출력
          print_result(pose.keypoints);

          /* 딥러닝 모델을 이용해서 동작 판단 진행
             Stand = 0 (e[0][0]), Squat = 1 (e[0][1]) */
          if (pose.score >= 0.8) {
            sideLateralRaise_model(
              calc_body_angle(get_upper_keyPoints(pose.keypoints))
            ).then((e) => {
              console.log(calc_body_angle(get_upper_keyPoints(pose.keypoints)));
              if (e[0][0] - e[0][1] >= 0.5) {
                setPredictResult("stand");
                if (previousPose === "raise") {
                  setCount((prevCount) => prevCount + 1);
                }
                previousPose = "stand";
              } else if (e[0][1] - e[0][0] >= 0.5) {
                setPredictResult("raise");
                previousPose = "raise";
              }
            });
          } else setPredictResult("unknown");
        }, 100);
      };
    }
  };

  const btn_stop_click = () => {
    if (startFlag === true) {
      setStartFlag(false);
      setTimerFlag(false);
      toggleResultVisible();
      toggleCountVisible();
      clearInterval(predictRef.current);
    }
  };

  useEffect(() => {
    setupCamera();
  }, []); // 빈 배열을 전달하여 페이지가 처음 로드될 때만 실행

  // 타이머 useEffect
  useEffect(() => {
    if (timerFlag) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  }, [timerFlag]);

  return (
    <div id="container">
      <div id="screen">
        <video id="video" width={640} height={480} ref={videoRef}></video>
      </div>
      {/* <div id="countDown" style={countDownStyle}>
        <p>{countDown}</p>
      </div> */}
      {/* {countVisible && <Counter startFlag={startFlag} />} */}
      {resultVisible && (
        <div id="showResult">
          <p>Timer={timer}</p>
          <p id="keypoints"></p>
          <p id="result">{result}</p>
          <p id="predict_result">{predictResult}</p>
          <p id="exercise_count">개수 : {count}</p>
        </div>
      )}
      <div id="Buttons">
        <button id="btn_start" onClick={btn_start_click}>
          Start
        </button>
        <button id="btn_stop" onClick={btn_stop_click}>
          Stop
        </button>
        <button id="btn_save" onClick={side_lateral_raise}>
          Save
        </button>
      </div>
      <link rel="stylesheet" href="index.css" />
    </div>
  );
}

export default SideLateralRaise;
