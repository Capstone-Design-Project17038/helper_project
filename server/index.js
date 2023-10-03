const express = require("express"); //express 설정
const dotenv = require("dotenv"); //dotenc 설정
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express(); //express를 이용해 앱을 만든다

// 기본설정을 해줍니다.
app.use(express.json()); //클라와 서버간에 통신을 위해 json형식 데이터 사용을위해 미들웨어 설치
app.use(cookieParser()); // 쿠키를 사용해 jwt 사용을위해 설정
app.use(
  // 오리진이 다를때를 위해 사용함
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = mysql.createPool({
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "1121", // 데이터베이스 비밀번호
  database: "helper", // 사용할 데이터베이스
});

app.use("/models", express.static("public"));

const {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
  signup,
} = require("./controller"); // 해당 요청이 사용될때 컨트롤러 폴더로 가서 작동됨, index.js로 만들면 폴더만 추가해도 자동으로 설정됨

const { 
  squat, 
  view,
  rank,
   lunge,
   tree,
   shoulder_press,
   week_record,
   sum,
   } = require("./exercise");


dotenv.config(); // dotenv 구성


// 위까지 했을때 클라이언트에서 서버로 요청이 가능해짐

app.post("/login", login); // 각각의 라우터에 요청에 대한 경우를 만듬
app.get("/accesstoken", accessToken);
app.get("/refreshtoken", refreshToken);
app.get("/login/success", loginSuccess);
app.post("/logout", logout);
app.post("/signup", signup);

app.post("/squat", squat);
app.post("/tree", tree);
app.post("/lunge", lunge);
app.post("/shoulder_press", shoulder_press);
app.post("/view", view);
app.post("/rank", rank);
app.get("/week", week_record);
app.post("/sum", sum);

app.listen(process.env.PORT, () => {
  // 서버 열였을때 체크하는용도
  console.log(`server is on ${process.env.PORT}`);
});
