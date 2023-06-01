import React from "react";
import "./MainPage.css";
import Footer from "../Footer";
import Header from "../Header";
import Main from "./Main";

function MainPage() {
  return (
    <React.Fragment>
      <div className="main-page">
        <Header />
        <Main/>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;
