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
  const [month, setMonth] = useState([]); // 한달간에 운동 데이터
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
      url: 'http://localhost:8123/view_squat_month',
      method: 'POST',
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setMonth(result.data);
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

  console.log(month);
  const day_count = day.map((element)=> element.total_count); // day객체의 total_count 추출
  const month_count = month.map((element) => element.total_count);
  const month_date = month.map((element) => element.month);
  
  const bar_options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // You can change this to true if you want to display the legend
      },
    },
    animation: {
      duration: 1000, // Animation duration in milliseconds
    },
  };
  
  const line_options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // You can change this to true if you want to display the legend
      },
    },
    animation: {
      duration: 1000, // Animation duration in milliseconds
    },
  };


  const bar_data = {
    labels: formattedDateData,
    datasets: [
      {
        data: day_count,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const line_data = {
    labels: month_date,
    datasets: [
      {
        data: month_count,
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
        <Line options={line_options} data={line_data}/>
        <h2>스쿼트 정보</h2>
        <Bar options={bar_options} data={bar_data}/>
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
    max-width: 100%;
    width: 800px;
    height: 400px;
  }
`;

export default SquatChart;
