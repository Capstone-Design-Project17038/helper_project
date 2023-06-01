import React from "react";
import "./MainPage.css";
import Footer from "../footer";
import Header from "../header";
import Main from "./main";

function MainPage() {
  return (
    <React.Fragment>
      <div className="main-page">
        <Header />
        <Main />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;
