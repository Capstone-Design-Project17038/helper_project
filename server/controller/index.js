const axios = require("axios");

module.exports = {
  accessToken: async (req, res) => {
    try {
      const { code } = req.body;
      const { type } = req.body;
      console.log("인가코드");
      console.log(code);
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
          console.log("1");
          accessToken = await axios({
            url: "https://kauth.kakao.com/oauth/token",
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8", // 헤더 설정
            },
            params: {
              grant_type: "authorization_code",
              client_id: process.env.KAKAO_CLIENT_ID,
              redirect_uri: "http://localhost:3000/auth/callback/kakao",
              code: code,
              //client_secret: process.env.KAKAO_CLIENT_SECRET,
            },
          });
          console.log("2번 성공");
          const item1 = accessToken.params;
          console.log("3번 성공");
          res.status(200).json(item1);
          console.log("4번 성공");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
