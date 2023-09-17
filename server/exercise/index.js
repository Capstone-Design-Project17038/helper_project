const jwt = require("jsonwebtoken"); // jwt 토큰 사용을 위한 모듈 설정
const mysql = require("mysql"); // DB가져옴

const db = mysql.createPool({
  //db 설정
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "root", // 데이터베이스 비밀번호
  database: "helper", // 사용할 데이터베이스
});

/**
 CREATE TABLE `squart` (
  `SQUART_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `counts` int DEFAULT NULL,
  `user` int unsigned NOT NULL,
  PRIMARY KEY (`SQUART_ID`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `user` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 */

const squart = (req, res) => {
  console.log("1번");
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    //console.log(counts);
    //console.log(data);
    const currentTime = new Date();

    //console.log(data); //여기다가 데이터 삽입 테이블을 집어넣으면됨
    db.query(
      "INSERT INTO squart (date, counts, user) VALUES (?, ?, ?);",
      [currentTime, counts, data.id],
      // 콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json("squart data not insert DB");
        } else {
          console.log("데이터 들어감");
          res.status(200).json("squart data inserted DB");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const lunge = (req, res) => {
  console.log("1번");
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    //console.log(counts);
    //console.log(data);
    const currentTime = new Date();

    //console.log(data); //여기다가 데이터 삽입 테이블을 집어넣으면됨
    db.query(
      "INSERT INTO lunge (date, counts, user) VALUES (?, ?, ?);",
      [currentTime, counts, data.id],
      // 콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json("lunge data not insert DB");
        } else {
          console.log("데이터 들어감");
          res.status(200).json("lunge data inserted DB");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const tree = (req, res) => {
  console.log("1번");
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    //console.log(counts);
    //console.log(data);
    const currentTime = new Date();

    //console.log(data); //여기다가 데이터 삽입 테이블을 집어넣으면됨
    db.query(
      "INSERT INTO tree (date, counts, user) VALUES (?, ?, ?);",
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

const shoulder_press = (req, res) => {
  console.log("1번");
  try {
    const { counts } = req.body;
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    //console.log(counts);
    //console.log(data);
    const currentTime = new Date();

    //console.log(data); //여기다가 데이터 삽입 테이블을 집어넣으면됨
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


const view = (req, res) => {
  console.log("view 까지는 왔음");
  try {
    console.log("성공");
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    //console.log(data);

    //console.log(data); //여기다가 데이터 삽입 테이블을 집어넣으면됨

    db.query(
      "SELECT * FROM SQUART WHERE user=? ORDER BY date;",
      [data.id],
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



const rank = (req, res) => {
  console.log("rank 까지는 왔음");
  try {
    console.log("성공");
    db.query(
      "SELECT * FROM SQUART ORDER BY COUNTS DESC LIMIT 6;",
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

module.exports = {
  // 작성된 함수를 모듈화해서 내보냄
  squart,
  view,
  rank,
  lunge,
  tree,
  shoulder_press,
};
