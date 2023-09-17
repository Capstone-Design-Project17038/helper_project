import styles from './Modal.module.css';

function TreeModal({ setTreeOpen}) {
    // 모달 끄기 
    const closeModal = () => {
        setTreeOpen(false);
    };

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <h1>Tree</h1>
            <div className= {styles.exercise}>
                <div className={styles.exercise_img}>
                    <img src='/exercise_img/tree.png'/>
                </div>
                <div className={styles.exercise_des}>
                    <ol>
                        <li>카메라를 바라보는 방향으로 섭니다.</li>
                        <li>오른쪽 다리를 구부려 들어올립니다.</li>
                        <li>구부린 다리를 옆으로 열어 골반을 열어줍니다.</li>
                        <li>구부린 다리를 손으로 잡아 반대 쪽 다리의 허벅지 옆면에 붙여줍니다.</li>
                        <li>몸의 균형을 잡고 천천히 양 손을 가슴 앞에 모아주어 자세를 유지합니다.</li>
                    </ol>     
                </div>
            </div>
            <button>운동 시작</button>
        </div>
    );
}
export default TreeModal;