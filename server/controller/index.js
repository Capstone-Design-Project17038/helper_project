const axios = require("axios");

module.exports = {
  accessToken: async (req, res) => {
    try {
      const { code } = req.body;
      const {type} = req.body;
      console.log(type);
      let accessToken; // 변수 선언

      switch (type) {
        case "git":
          accessToken = await axios({
            url: "https://github.com/login/oauth/access_token",
            method: "POST",
            data: {
              client_id: process.env.GIT_CLIENT_ID,
              client_secret: process.env.GIT_CLIENT_SECRET,
              code: code,
            },
          });
          const item = accessToken.data;
          res.status(200).json(item);
          break;
          
        case "kakao":
          accessToken = await axios({
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
              client_secret: process.env.KAKAO_CLIENT_SECRET,
            },
          });
          const params = new URLSearchParams(accessToken).toString();
          const finalUrl = `${"https://kauth.kakao.com/oauth/token"}?${params}`;
          const kakaoTokenRequest = await fetch(finalUrl, {
            method: "POST",
            headers: {
              "Content-type": "application/json", // 이 부분을 명시하지않으면 text로 응답을 받게됨
            },
          });
          const json = await kakaoTokenRequest.json();
          res.status(200).json(json);

          // Kakao 관련 처리 로직 추가
          break;
        default:
          // 기본 처리 로직 추가
          break;
          
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};