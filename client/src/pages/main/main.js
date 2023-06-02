import React from "react";

class Main extends React.Component {
  handleClick = () => {
    window.location.href = "../tm.html";
  };

  mouseOn = (e) => {
    e.target.style.backgroundColor = "#888";
    e.target.style.transition = "all 0.5s ease-out";
  };

  mouseOut = (e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.transition = "all 0.5s ease-out";
  };

  render() {
    return (
      <main className="main-main">
        <button
          className="btn"
          onClick={this.handleClick}
          onMouseOver={this.mouseOn}
          onMouseLeave={this.mouseOut}
        >
          GET STARTED
        </button>
        <video src="exercise2.mp4" muted autoPlay loop></video>
      </main>
    );
  }
}

export default Main;
