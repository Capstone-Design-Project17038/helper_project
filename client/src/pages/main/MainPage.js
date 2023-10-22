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
          <img className="main_background" src="main.jpg"></img>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;
