const jwt = require("jsonwebtoken"); // jwt 토큰 사용을 위한 모듈 설정
const mysql = require("mysql"); // DB가져옴
const dotenv = require("dotenv"); //dotenc 설정
dotenv.config();

const db = mysql.createPool({
  //db 설정
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "root", // 데이터베이스 비밀번호
  database: "helper", // 사용할 데이터베이스
});


const view_squat_rank = (req, res) => {
    try {
      db.query(
        "SELECT  SQUAT.counts,SQUAT.date, USER.nickname  FROM SQUAT LEFT OUTER JOIN USER ON SQUAT.user = USER.UID UNION SELECT  SQUAT.counts,SQUAT.date, USER.nickname  FROM SQUAT RIGHT OUTER JOIN USER ON SQUAT.user = USER.UID ORDER BY counts DESC LIMIT 10; ",
        [],
        // 콜백함수
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).json("불러오기 실패");
          } else {
            console.log("불러오기 성공");
            console.log(result);
            res.status(200).json(result);
          }
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const view_crunch_rank = (req, res) => {
    try {
      db.query(
        "SELECT  side_crunch.counts,side_crunch.date, USER.nickname  FROM side_crunch LEFT OUTER JOIN USER ON side_crunch.user = USER.UID UNION SELECT  side_crunch.counts,side_crunch.date, USER.nickname  FROM side_crunch RIGHT OUTER JOIN USER ON side_crunch.user = USER.UID ORDER BY counts DESC LIMIT 10; ",
        [],
        // 콜백함수
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).json("불러오기 실패");
          } else {
            console.log("불러오기 성공");
            console.log(result);
            res.status(200).json(result);
          }
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const view_lateral_raise_rank = (req, res) => {
    try {
      db.query(
        "SELECT  side_lateral_raise.counts,side_lateral_raise.date, USER.nickname  FROM side_lateral_raise LEFT OUTER JOIN USER ON lateral_raise.user = USER.UID UNION SELECT  side_lateral_raise.counts,side_lateral_raise.date, USER.nickname  FROM side_lateral_raise RIGHT OUTER JOIN USER ON side_lateral_raise.user = USER.UID ORDER BY counts DESC LIMIT 10; ",
        [],
        // 콜백함수
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).json("불러오기 실패");
          } else {
            console.log("불러오기 성공");
            console.log(result);
            res.status(200).json(result);
          }
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const view_shoulder_rank = (req, res) => {
    try {
      db.query(
        "SELECT  shoulder_press.counts,shoulder_press.date, USER.nickname  FROM shoulder_press LEFT OUTER JOIN USER ON shoulder_press.user = USER.UID UNION SELECT  shoulder_press.counts,shoulder_press.date, USER.nickname  FROM shoulder_press RIGHT OUTER JOIN USER ON shoulder_press.user = USER.UID ORDER BY counts DESC LIMIT 10; ",
        [],
        // 콜백함수
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).json("불러오기 실패");
          } else {
            console.log("불러오기 성공");
            console.log(result);
            res.status(200).json(result);
          }
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  
  const week_record = (req, res) => {
    try {
      const currentTime = new Date();
      const oneWeekAgo = new Date(currentTime);
      const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
      const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
      console.log(data.id);
      oneWeekAgo.setDate(currentTime.getDate() - 7);
      db.query(
        "SELECT * FROM SQUAT WHERE DATE>(?) and user = (?) ORDER BY date;",
        [oneWeekAgo, data.id],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).json("불러오기 실패");
          } else {
            console.log("불러오기 성공");
            console.log(result);
            res.status(200).json(result);
          }
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  const sum = (req, res) => {
    try {
      const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
      const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
  
      db.query(
        //"SELECT user ,COUNT(counts) FROM SQUAT WHERE user = (?) ORDER BY count(counts);" -> 개인 합계 기록
        "SELECT user, SUM(counts) FROM SQUAT GROUP BY user ORDER BY COUNT(counts) DESC;", //유저 최고 합계 기록
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).json("불러오기 실패");
          } else {
            console.log("불러오기 성공");
            console.log(result);
            res.status(200).json(result);
          }
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

  module.exports = {
    // 작성된 함수를 모듈화해서 내보냄
    view_squat_rank,
    view_crunch_rank,
    view_lateral_raise_rank,
    view_shoulder_rank,
  };
  