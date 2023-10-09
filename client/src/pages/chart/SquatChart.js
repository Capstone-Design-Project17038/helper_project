import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, BarElement, Tooltip } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend,
);

function SquatChart() {
  const [day, setDay] = useState([]); // 모든 날짜 운동 데이터
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios({
      url: 'http://localhost:8123/view_squat_daily',
      method: 'POST',
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setDay(result.data);
      }
    });
  }, []);

  useEffect(() => {
    axios({
      url: 'http://localhost:8123/accesstoken',
      method: 'GET',
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setUser(result.data);
      }
    });
  }, []);

  const formattedDateData = day.map((item) => {
    // item.date는 데이터베이스로부터 받아온 날짜 데이터라고 가정합니다.
    const date = new Date(item.day); // 문자열을 JavaScript Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리 숫자로
    const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리 숫자로
    const formattedDate = `${year}-${month}-${day}`; // ISO 8601 형식으로 변환
    return formattedDate;
  });

  const count_data = [];
  for (let a of day) {
    count_data.push(a.total_count);
  }

  const options1 = {
    responsive: false,
  }; //막대 그래프
  const options2 = {
    responsive: false,
  };

  const labels = formattedDateData;
  const data = {
    labels,
    datasets: [
      {
        data: count_data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Wrapper>
      <InfoDiv>
        <i className="fas fa-user fa-2x"></i>
        <h2>회원정보</h2>
        <ul>
          <li>아이디 : {user.email}</li>
          <li>닉네임 : {user.nickname}</li>
        </ul>
      </InfoDiv>
      <ChartDiv>
        <i className="fas fa-chart-line fa-2x"></i>
        <h2>월간 정보</h2>
        <Line options={options2} data={data} style={{ position: 'relative', height: '200px' }} />
        <h2>스쿼트 정보</h2>
        <Bar options={options1} data={data} style={{ position: 'relative', height: '200px' }} />
      </ChartDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const InfoDiv = styled.div`
  color: #616161;
  text-align: center;

  ul {
    color: #616161;
    font-size: 1.2em;
    margin-top: 1em;
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
    }
  }
`;

const ChartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  canvas {
    max-width: 80%;
  }
`;

export default SquatChart;
