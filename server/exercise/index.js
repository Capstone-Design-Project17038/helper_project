const jwt = require("jsonwebtoken"); // jwt 토큰 사용을 위한 모듈 설정
const mysql = require("mysql"); // DB가져옴

const db = mysql.createPool({
  //db 설정
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "root", // 데이터베이스 비밀번호
  database: "helper", // 사용할 데이터베이스
});

const squart = (req, res) => {
  try {
    const token = req.cookies.accessToken; // req의 쿠키에서 엑세스 토큰에 접근
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // verify 해줌
    console.log(token);
    console.log(data); //여기다가 데이터 삽입 테이블을 집어넣으면됨
    db.query(
      "SELECT * FROM user WHERE email=? ",
      [data.email],
      // 콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json("Not Authorized");
        } else {
          console.log(result[0]);
          res.status(200).json(result[0]);
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
};
