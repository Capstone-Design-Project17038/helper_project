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

app.use("/models", express.static("public/models/"));

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
  rank,
  shoulder_press,
  week_record,
  side_lateral_raise,
  side_crunch,
  sum,
} = require("./exercise");

const {
  view_squat_month,
  view_crunch_month,
  view_shoulder_month,
  view_lateral_raise_month,
  view_squat_daily,
  view_crunch_daily,
  view_shoulder_daily,
  view_lateral_raise_daily,
} = require("./view");

const {
  view_squat_rank,
  view_crunch_rank,
  view_lateral_raise_rank,
  view_shoulder_rank,
} = require("./rank");

dotenv.config(); // dotenv 구성
// 위까지 했을때 클라이언트에서 서버로 요청이 가능해짐

//로그인 로직
app.post("/login", login); // 각각의 라우터에 요청에 대한 경우를 만듬
app.get("/accesstoken", accessToken);
app.get("/refreshtoken", refreshToken);
app.get("/login/success", loginSuccess);
app.post("/logout", logout);
app.post("/signup", signup);

// 데이터 삽입 로직
app.post("/squat", squat);
app.post("/shoulder_press", shoulder_press);
app.post("/side_lateral_raise", side_lateral_raise);
app.post("/side_crunch", side_crunch);

//데이터 보기 로직
app.post("/view_squat_month", view_squat_month);
app.post("/view_crunch_month", view_crunch_month);
app.post("/view_shoulder_month", view_shoulder_month);
app.post("/view_lateral_raise_month", view_lateral_raise_month);
app.post("/view_squat_daily", view_squat_daily);
app.post("/view_crunch_daily", view_crunch_daily);
app.post("/view_shoulder_daily", view_shoulder_daily);
app.post("/view_lateral_raise_daily", view_lateral_raise_daily);


// 운동별 랭킹 데이터 조회
app.post("/view_squat_rank", view_squat_rank);
app.post("/view_crunch_rank", view_crunch_rank);
app.post("/view_lateral_raise_rank", view_lateral_raise_rank);
app.post("/view_shoulder_rank", view_shoulder_rank);

app.listen(process.env.PORT, () => {
  // 서버 열였을때 체크하는용도
  console.log(`server is on ${process.env.PORT}`);
});
