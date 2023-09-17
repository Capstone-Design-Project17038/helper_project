import React from "react";
import "./MainPage.css";
import Footer from "../footer";
import Header from "../header";
import { useNavigate } from "react-router-dom";

function MainPage() {
  let Navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="main-page">
        <Header />
        <main className="main-main">
          <button
            className="btn"
            onClick={() => Navigate("/ExerciseChoice")}
          >
            GET STARTED
          </button>
          <video className="main_background" src="exercise2.mp4" muted autoPlay loop></video>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;
