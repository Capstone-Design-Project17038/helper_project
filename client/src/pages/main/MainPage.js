import React from "react";
import "./MainPage.css";
import Footer from "../footer";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import startWorkOut from "./startWorkOut.gif";

function MainPage() {
  let Navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="main-main">
        <a className="btn" onClick={() => Navigate("/ExerciseChoice")}>
          <img src={startWorkOut} alt="startWorkOut"></img>
        </a>
        <img className="main_background" src="main.jpg"></img>
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
