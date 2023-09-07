import styles from './Modal.module.css';

function SquatModal({ setSquatOpen}) {
    // 모달 끄기 
    const closeModal = () => {
        setSquatOpen(false);
    };

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <p>Squat</p>
            <ol>
                <li>카메라를 바라보는 방향을 기준으로 오른쪽으로 몸을 돌리고 섭니다.</li>
                <li>두 손은 모은 상태를 유지합니다.</li>
                <li>양발의 간격은 골반보다 조금 더 넓게 유지하고, 양발 끝은 바깥쪽으로 15도~20도 정도 벌려줍니다.</li>
                <li>상체는 그대로 꼿꼿이 유지하면서 천천히 엉덩이를 뒤로 빼며 무릎을 굽혀 앉는 자세를 취합니다.</li>
                <li>허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.</li>
            </ol>           
        </div>
    );
}
export default SquatModal;