import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

function ShoulderPressModal({ setShoulderPressOpen }) {
  const Navigate = useNavigate();
  // 모달 끄기
  const closeModal = () => {
    setShoulderPressOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      <h2>숄더 프레스</h2>
      <div className={styles.exercise}>
        <div className={styles.exercise_img}>
          <img src="/exercise_img/shoulderpress.gif" />
        </div>
        <div className={styles.exercise_des}>
          <ol>
            <li>카메라를 바라보는 방향으로 섭니다.</li>
            <li>양발의 간격은 어깨너비로 벌립니다.</li>
            <li>허리는 꼿꼿이 핀 상태를 유지합니다.</li>
            <li>어깨 좌우 대칭을 유지하고, 손목과 팔꿈치가 일자를 이루도록 하며 팔을 완전히 위쪽으로 펴줍니다.</li>
            <li>천천히 준비자세로 돌아옵니다.</li>
          </ol>
        </div>
      </div>
      <button onClick={() => Navigate("/ShoulderPress")}>운동 시작</button>
    </div>
  );
}
export default ShoulderPressModal;
