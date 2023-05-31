import React from "react";

class main extends React.Component {
  handleClick = () => {
    window.location.href = "../tm.html";
  };

  render() {
    return (
      <main className="main-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2>건강한 삶을 위한 운동을 시작하세요!</h2>
            <p>더 나은 건강과 체력을 위한 운동 프로그램을 찾아보세요.</p>
            <button
              className="btn"
              onClick={this.handleClick}
            >
              시작하기
            </button>
          </div>
          <img src="exercise.jpg" alt="운동하는 사람" />
        </section>
        <section className="feature-section">
          <div className="feature">
            <img src="/images/feature1.png" alt="기능 1" />
            <h3>개인화된 운동 계획</h3>
            <p>당신의 목표에 맞는 개인화된 운동 계획을 제공합니다.</p>
          </div>
          <div className="feature">
            <img src="/images/feature2.png" alt="기능 2" />
            <h3>온라인 코칭 서비스</h3>
            <p>전문 트레이너와의 온라인 코칭으로 효과적인 운동을 도와줍니다.</p>
          </div>
          <div className="feature">
            <img src="/images/feature3.png" alt="기능 3" />
            <h3>진행 상황 추적</h3>
            <p>운동 일지를 작성하고 진행 상황을 시각적으로 확인하세요.</p>
          </div>
        </section>
      </main>
    );
  }
}

export default main;
