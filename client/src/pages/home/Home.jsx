import React from "react";
import Login from "../../components/login/Login";
import axios from "axios";

export default function Home() {

  return (
    <div>
      <header className="App-header">
        <img src="helper.png" className="App-logo" alt="logo" />
        
        <Login />
      </header>
    </div>
  );
}
