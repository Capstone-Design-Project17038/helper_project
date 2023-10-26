import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

function SideLateralModal({ setsidelateralOpen }) {
  const Navigate = useNavigate();
  // 모달 끄기
  const closeModal = () => {
    setsidelateralOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      <h1>Side Lateral Raise</h1>
      <div className={styles.exercise}>
        <div className={styles.exercise_img}>
          <img src="/exercise_img/sidelateral.gif" />
        </div>
        <div className={styles.exercise_des}>
          <ol>
            <li>카메라를 바라보는 방향으로 섭니다.</li>
            <li>두 손은 모은 상태를 유지합니다.</li>
            <li>양발의 간격이 어깨의 2배정도 되도록 벌려줍니다.</li>
            <li>
              한쪽 방향으로 몸을 옮겨 체중을 실어주며 옮기는 쪽 다리에 대부분의 힘을 준 상태로 허리는 꼿꼿이 펴고
              엉덩이를 뒤로 빼며 체중을 실은 쪽의 무릎을 굽혀줍니다.
            </li>
            <li>굽힌 쪽의 허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.</li>
          </ol>
        </div>
      </div>
      <button onClick={() => Navigate("/SideLateralRaise")}>운동 시작</button>
    </div>
  );
}
export default SideLateralModal;
