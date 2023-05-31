import React from "react";
import './MainPage.css';
import Main from "./main";
import Footer from "../Footer";
import Header from "../Header";

function MainPage() {
    return (
      <React.Fragment>
        <Header/>
        <Main />
        <Footer/>
      </React.Fragment>
    );
  }

export default MainPage;