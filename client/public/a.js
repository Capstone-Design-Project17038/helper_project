const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

// 카카오 로그인 요청 처리
app.get("/auth/kakao/callback", async (req, res) => {
  try {
    const { code } = req.query;
    const { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } = process.env;

    // 카카오 액세스 토큰 요청
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        code: code,
      }
    );

    const { access_token } = tokenResponse.data;

    // 카카오 사용자 정보 요청
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = userResponse.data;

    // 사용자 정보를 이용하여 추가적인 로직을 수행할 수 있습니다.

    res.send(userInfo);
  } catch (error) {
    console.error("카카오 로그인 에러:", error);
    res.status(500).send("카카오 로그인 중에 오류가 발생했습니다.");
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

/*accessToken = await axios({
            url: "https://kauth.kakao.com/oauth/token",
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8", // 헤더 설정
            },
            data: {
              grant_type: "authorization_code",
              client_id: process.env.KAKAO_CLIENT_ID,
              redirect_uri: "http://localhost:3000/auth/callback/kakao",
              code: code,
              //client_secret: process.env.KAKAO_CLIENT_SECRET,
            },
          });
          console.log("2번 성공");
          const item1 = accessToken.data;
          console.log("3번 성공");
          res.status(200).json(item1);
          console.log("4번 성공");*/
// Kakao 관련 처리 로직 추가
