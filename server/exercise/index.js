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

/**
 CREATE TABLE `squat` (
  `SQUAT_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `counts` int DEFAULT NULL,
  `user` int unsigned NOT NULL,
  PRIMARY KEY (`SQUAT_ID`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `user` (`UID`)
)

 CREATE TABLE `side_crunch` (
  `SIDE_CRUNCH_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `counts` int DEFAULT NULL,
  `user` int unsigned NOT NULL,
  PRIMARY KEY (`SIDE_CRUNCH_ID`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user1` FOREIGN KEY (`user`) REFERENCES `user` (`UID`)
)

 CREATE TABLE `side_lateral_raise` (
  `SIDE_LATERAL_RAISE_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `counts` int DEFAULT NULL,
  `user` int unsigned NOT NULL,
  PRIMARY KEY (`SIDE_LATERAL_RAISE_ID`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user2` FOREIGN KEY (`user`) REFERENCES `user` (`UID`)
)

 CREATE TABLE `shoulder_press` (
  `SHOULDER_PRESS_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `counts` int DEFAULT NULL,
  `user` int unsigned NOT NULL,
  PRIMARY KEY (`SHOULDER_PRESS_ID`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user3` FOREIGN KEY (`user`) REFERENCES `user` (`UID`)
)


 */

const squat = (req, res) => {
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌

    const offset = 1000 * 60 * 60 * 9;
    const koreaNow = new Date(new Date().getTime() + offset);
    const currentTime = koreaNow.toISOString().replace("T", " ").split(".")[0];

    //console.log(data); //여기다가 데이터 삽입 테이블을 집어넣으면됨
    db.query(
      "INSERT INTO squat (date, counts, user) VALUES (?, ?, ?);",
      [currentTime, counts, data.id],
      // 콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json("squat data not insert DB");
        } else {
          console.log("상민이 데이터 들어감");
          res.status(200).json("squat data inserted DB");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const side_crunch = (req, res) => {
  console.log("1번");
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    const currentTime = new Date();
    db.query(
      "INSERT INTO side_crunch (date, counts, user) VALUES (?, ?, ?);",
      [currentTime, counts, data.id],
      // 콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json("side_crunch data not insert DB");
        } else {
          console.log("데이터 들어감");
          res.status(200).json("side_crunch data inserted DB");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const side_lateral_raise = (req, res) => {
  console.log("1번");
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    const currentTime = new Date();
    db.query(
      "INSERT INTO side_lateral_raise (date, counts, user) VALUES (?, ?, ?);",
      [currentTime, counts, data.id],
      // 콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json("side_lateral_raise data not insert DB");
        } else {
          res.status(200).json("side_lateral_raise data inserted DB");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const shoulder_press = (req, res) => {
  console.log("1번");
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    const currentTime = new Date();
    db.query(
      "INSERT INTO shoulder_press (date, counts, user) VALUES (?, ?, ?);",
      [currentTime, counts, data.id],
      // 콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json("tree data not insert DB");
        } else {
          console.log("데이터 들어감");
          res.status(200).json("tree data inserted DB");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const rank = (req, res) => {
  console.log("rank 까지는 왔음");
  try {
    console.log("성공");
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
  squat,
  rank,
  side_lateral_raise,
  side_crunch,
  shoulder_press,
  week_record,
  sum,
};
