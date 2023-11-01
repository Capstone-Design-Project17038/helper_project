import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SquatModal({ count, workOutType }) {
  const Navigate = useNavigate();

  const squat = () => {
    axios({
      url: "http://localhost:8123/squat",
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

  const side_crunch = () => {
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

  return (
    <div className={styles.container_result}>
      <h1 className="endPhrase">수고하셨습니다!</h1>
      <h2>운동 결과</h2>
      <div className={styles.exercise}>
        <p>횟수: {count}</p>
        <div className={styles.exercise_des}></div>
      </div>
      <button
        onClick={() => {
          if (workOutType === "Squat") {
            squat();
          } else if (workOutType === "SideLateralRaise") {
            side_lateral_raise();
          } else if (workOutType === "SideCrunch") {
            side_crunch();
          } else if (workOutType === "ShoulderPress") {
            shoulder_press();
          }
          Navigate("../MainPage");
        }}
      >
        닫기
      </button>
    </div>
  );
}
export default SquatModal;
