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

const view_squat_month = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE_FORMAT(`date`, '%Y-%m') AS month, ROUND(AVG(`counts`), 1) AS total_count FROM `squat` WHERE `user` = ? GROUP BY month ORDER BY month;",
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

const view_crunch_month = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE_FORMAT(`date`, '%Y-%m') AS month, ROUND(AVG(`counts`), 1) AS total_count FROM `side_crunch` WHERE `user` = ? GROUP BY month ORDER BY month;",
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

const view_shoulder_month = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE_FORMAT(`date`, '%Y-%m') AS month, ROUND(AVG(`counts`), 1) AS total_count FROM `shoulde_press` WHERE `user` = ? GROUP BY month ORDER BY month;",
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

const view_lateral_raise_month = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE_FORMAT(`date`, '%Y-%m') AS month, ROUND(AVG(`counts`), 1) AS total_count FROM `side_lateral_raise` WHERE `user` = ? GROUP BY month ORDER BY month;",
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

const view_squat_daily = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE(`date`) AS day, SUM(`counts`) AS total_count FROM `squat` WHERE `user` = ? GROUP BY day ORDER BY day;",
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

const view_crunch_daily = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE(`date`) AS day, SUM(`counts`) AS total_count FROM `side_crunch` WHERE `user` = ? GROUP BY day ORDER BY day;",
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

const view_shoulder_daily = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE(`date`) AS day, SUM(`counts`) AS total_count FROM `shoulder_press` WHERE `user` = ? GROUP BY day ORDER BY day;",
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

const view_lateral_raise_daily = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    db.query(
      "SELECT DATE(`date`) AS day, SUM(`counts`) AS total_count FROM `side_lateral_raise` WHERE `user` = ? GROUP BY day ORDER BY day;",
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

module.exports = {
  // 작성된 함수를 모듈화해서 내보냄
  view_squat_month,
  view_crunch_month,
  view_shoulder_month,
  view_lateral_raise_month,
  view_squat_daily,
  view_crunch_daily,
  view_shoulder_daily,
  view_lateral_raise_daily,
};
