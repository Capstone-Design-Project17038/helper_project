import React from "react";

const CountdownDonut = ({ value }) => {
  return (
    <div className="countdownDonut">
      <svg viewBox="0 0 36 36">
        <path
          class="countdownDonut__outer"
          d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="countdownDonut__inner"
          stroke-dasharray={`${value}0 100`}
          d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div class="countdownDonut__text">
        <span class="countdownDonut__seconds">{value}</span>
      </div>
    </div>
  );
};

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.countdown();
  }

  countdown() {
    setInterval(() => {
      const { seconds } = this.state;
      if (seconds === 0) {
        this.setState({ seconds: 10 });
      } else {
        this.setState({ seconds: seconds - 1 });
      }
    }, 1000);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div class="countDown">
        <CountdownDonut value={seconds} />
      </div>
    );
  }
}

export default CountDown;
