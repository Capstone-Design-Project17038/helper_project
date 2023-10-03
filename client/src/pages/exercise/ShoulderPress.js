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
  const [csv, setCSV] = useState([]);
  const [result, setResult] = useState("Result");
  const [predictResult, setPredictResult] = useState("Predict result");
  const [startFlag, setStartFlag] = useState(null);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(0);

  //const canvasRef = useRef(null);

  const setupCamera = async () => {
    const video = videoRef.current;
    //const canvas = canvasRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    video.srcObject = stream;
    video.play();

    // video.onloadedmetadata = () => {
    //   canvas.width = video.width;
    //   canvas.height = video.height;
    // };

    console.log("camera set up success");
  };

  // 버튼 내부 함수로 이동시킴
  // const detectPose = async () => {
  //   console.log("start pose estimate");
  //   const video = videoRef.current;
  //   //const ctx = canvasRef.current.getContext("2d");
  //   const net = await posenet.load();
  //   let previousPose = null;

  //   // while (true) {
  //   const pose = await net.estimateSinglePose(video);
  //   console.log(tf.memory());
  //   // Clear the canvas
  //   //ctx.clearRect(0, 0, video.width, video.height);

  //   // Draw the pose
  //   //drawKeypoints(pose.keypoints, 0.6, ctx);
  //   //drawSkeleton(pose.keypoints, 0.6, ctx);

  //   // 추정된 관절부 출력
  //   print_result(pose.keypoints);

  //   // 딥러닝 모델을 이용해서 동작 판단 진행
  //   if (pose.score >= 0.8) {
  //     squat_model(get_keyPoints(pose.keypoints)).then((e) => {
  //       if (e[0][0] > e[0][1]) {
  //         setPredictResult("stand");
  //         if (previousPose === "squat") {
  //           setCount((prevCount) => prevCount + 1);
  //         }
  //         previousPose = "stand";
  //       } else if (e[0][0] < e[0][1]) {
  //         setPredictResult("squat");
  //         previousPose = "squat";
  //       }
  //     });
  //   }
  //   // }
  // };

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

  const get_CSV = (keypoints) => {
    const row = [];
    let toggle_saving = 0;

    if (csv.length === 0) {
      for (let i = 0; i < 17; i++) {
        row.push(keypoints[i].part + "_x");
        row.push(keypoints[i].part + "_y");
      }
      setCSV((prevCSV) => [...prevCSV, row]);
    }

    if (toggle_saving === 0) {
      row.length = 0;
      for (let i = 0; i < 17; i++) {
        row.push(keypoints[i].position.x);
        row.push(keypoints[i].position.y);
      }
      setCSV((prevCSV) => [...prevCSV, row]);
    }
  };

  const save_CSV = () => {
    console.log("saving...");
    const csv_content =
      "data:text/csv;charset=utf-8,\uFEFF" +
      csv.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csv_content);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_data.csv");
    document.body.appendChild(link);
    link.click();
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
    //const ctx = canvasRef.current.getContext("2d");
    const net = await posenet.load();
    let previousPose = null;
    intervalRef.current = setInterval(async () => {
      const pose = await net.estimateSinglePose(video);
      console.log(tf.memory());

      // Clear the canvas
      //ctx.clearRect(0, 0, video.width, video.height);

      // Draw the pose
      //drawKeypoints(pose.keypoints, 0.6, ctx);
      //drawSkeleton(pose.keypoints, 0.6, ctx);

      // 추정된 관절부 출력
      print_result(pose.keypoints);

      // 딥러닝 모델을 이용해서 동작 판단 진행
      if (pose.score >= 0.8) {
        shoulderPress_model(get_keyPoints(pose.keypoints)).then((e) => {
          if (e[0][0] > e[0][1]) {
            setPredictResult("standBy");
            if (previousPose === "press") {
              setCount((prevCount) => prevCount + 1);
            }
            previousPose = "standBy";
          } else if (e[0][0] < e[0][1]) {
            setPredictResult("press");
            previousPose = "press";
          }
        });
      }
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
