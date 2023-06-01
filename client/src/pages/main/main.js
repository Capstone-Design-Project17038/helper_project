import React from "react";

class Main extends React.Component {
  handleClick = () => {
    window.location.href = "../tm.html";
  };

  render() {
    return (
      <main className="main-main">

        <button
          className="btn"
          onClick={this.handleClick}
        >
          GET STARTED
        </button>
        <video src="exercise2.mp4" muted autoPlay loop></video>
      </main>
    );
  }
}

export default Main;
