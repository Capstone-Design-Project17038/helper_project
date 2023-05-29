
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/LoginContext";

export default function Kakao() {
  const { accessToken, setAccessToken, loginType, setLoginType } =
    useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
      let params = new URL(document.location.toString()).searchParams;
      let code = params.get("code"); // 인가코드 받는 부분
      let grant_type = "authorization_code";
      let client_id = "b95846f7ffaa2715ee237dd29dbcd482";
  
      axios.post(`https://kauth.kakao.com/oauth/token?
          grant_type=${grant_type}
          &client_id=${client_id}
          &redirect_uri=http://localhost:3000/oauth/callback/kakao
          &code=${code}`
          , {
      headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
        console.log(res)
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
    })
    }, []);  

  return (
    <div>Kakao</div>
  )
}
