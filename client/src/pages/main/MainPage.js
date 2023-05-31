import React from "react";
import './MainPage.css';
import Header from "../header";
import Main from "./main";
import Footer from "../footer";

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default MainPage;
