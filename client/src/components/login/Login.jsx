import axios from "axios";
import React, { useContext, useEffect } from "react";
import "./login.css";

export default function Login() {
  const kakaoid = "b95846f7ffaa2715ee237dd29dbcd482";
  const kakaoREDIRECT_URI = "http://localhost:3000/auth/callback/kakao";
  const github = () => {
    window
      .open(
        "https://github.com/login/oauth/authorize" +
          `?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`,
        "_self"
      )
  };

  const google = () => {

  }

  const kakao = () => {
    window
    .open(
      `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoid}&redirect_uri=${kakaoREDIRECT_URI}&response_type=code`
    )

  }

  return (
    <div>
      <div className="loginContainer">
        <div className="inputGroup">
          <button className="loginButton" onClick={github}>
            <img src="../assets/git.jpg" alt="" className="buttonImg" />
          </button>
          <button className="loginButton" onClick={google}>
            <img src="../assets/google.png" alt="" className="buttonImg" />
          </button>
          <button className="loginButton" onClick={kakao}>
            <img src="../assets/kakao.png" alt="" className="buttonImg" />
          </button>
        </div>
      </div>
    </div>
  );
}
