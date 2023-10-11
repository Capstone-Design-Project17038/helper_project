import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import "./Squat.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { drawKeypoints, drawSkeleton } from "./Draw";

function ShoulderPress() {
  let Navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState("Result");
  const [predictResult, setPredictResult] = useState("Predict result");
  const [startFlag, setStartFlag] = useState(null);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(0);

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

  const get_keyPoints = (keypoints) => {
    const row = [];
    for (let i = 0; i < 17; i++) {
      row.push(keypoints[i].position.x);
      row.push(keypoints[i].position.y);
    }

    return row;
  };

  const shoulderPress_model = async (data) => {
    const input_data = tf.tensor([data]);

    const model = await tf.loadLayersModel(
      "http://localhost:8123/models/shoulder_press/model.json"
    );
    const predict = model.predict(input_data);
    const result = await predict.array();

    input_data.dispose();
    model.dispose();
    predict.dispose();

    return result;
  };

  const shoulder_press = () => {
    axios({
      url: "http://localhost:8123/shoulder_press",
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
  const btn_start_click = async () => {
    console.log("start pose estimate");
    setStartFlag("start");
    const video = videoRef.current;
    const net = await posenet.load();
    let previousPose = null;
    intervalRef.current = setInterval(async () => {
      const pose = await net.estimateSinglePose(video);
      console.log(tf.memory());

      // 추정된 관절부 출력
      print_result(pose.keypoints);

      /* 딥러닝 모델을 이용해서 동작 판단 진행
         Stand = 0 (e[0][0]), Press = 1 (e[0][1]) */

      if (pose.score >= 0.8) {
        shoulderPress_model(get_keyPoints(pose.keypoints)).then((e) => {
          if (e[0][0] - e[0][1] >= 0.5) {
            setPredictResult("stand");
            if (previousPose === "press") {
              setCount((prevCount) => prevCount + 1);
            }
            previousPose = "stand";
          } else if (e[0][0] - e[0][1] >= 0.5) {
            setPredictResult("press");
            previousPose = "press";
          }
        });
      } else setPredictResult("unknown");
    }, 100);
  };

  const btn_stop_click = () => {
    setStartFlag("stop");
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    setupCamera();
  }, []); // 빈 배열을 전달하여 페이지가 처음 로드될 때만 실행

  // 타이머 useEffect
  useEffect(() => {
    if (startFlag === "start") {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  }, [startFlag]);

  return (
    <div id="squat_div">
      <div id="estimate_div">
        <video id="video" width={640} height={480} ref={videoRef}></video>
      </div>
      <div id="result_div">
        <p>Timer={timer}</p>
        <p id="keypoints"></p>
        <p id="result">{result}</p>
        <p id="predict_result">{predictResult}</p>
        <p id="exercise_count">개수 : {count}</p>
        <button id="btn_start" onClick={btn_start_click}>
          Start
        </button>
        <button id="btn_stop" onClick={btn_stop_click}>
          Stop
        </button>
        <button id="btn_save" onClick={shoulder_press}>
          Save
        </button>
      </div>
      <link rel="stylesheet" href="index.css" />
    </div>
  );
}

export default ShoulderPress;
