//막대 그래프 : 우리가 막대는 몇개 띄울지 생각해야 할듯
//꺾은선 그래프 
import React, {useState, useEffect} from 'react';
//import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction : column;
    padding: 10px 5px;
    span{
      font-size: 2em;
      font-weight: bold;
    }
    ul{
      color: #616161;
      font-size: 1.2em;
      margin-top: 1em;
      list-style: none;
      h2 {
        color: black;
      }
    }
    @media (max-width: 768px) {
      span{
        font-size: 1.5em;
        font-weight: bold;
      }
    }
   
`;

const InterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 12px;
  margin-top: 5px;
  color: #616161;
  clear: both;

  i {
    font-size: 2em;
  }

  span {
    font-size: 2em;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    span {
      font-size: 1.5em;
      font-weight: bold;
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

const InfoDiv = styled.div`
  color: #616161;
  float: left;
  text-align: right;
  margin-right: 12px;

  ul {
    color: #616161;
    font-size: 1.2em;
    margin-top: 1em;
    list-style: none;
    h2 {
      color: black;
    }
  }

  @media (max-width: 768px) {
    span {
      font-size: 1.5em;
      font-weight: bold;
    }
  }
`;

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

function MyPage()
{
  const [week, setWeek] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios({
    url: "http://localhost:8123/week",
    method: "GET",
    withCredentials: true,
  }).then((result) => {
    if (result.status === 200) {
      setWeek(result.data);
    }
  })
  }, []);
  useEffect(() => {
    axios({
      url: "http://localhost:8123/accesstoken",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
    if (result.status === 200) {
      setUser(result.data);
    }
  })
  }, []);

  const formattedDateData = week.map(item => {
    // item.date는 데이터베이스로부터 받아온 날짜 데이터라고 가정합니다.
    const date = new Date(item.date); // 문자열을 JavaScript Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리 숫자로
    const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리 숫자로
    const formattedDate = `${year}-${month}-${day}`; // ISO 8601 형식으로 변환
    return formattedDate;
  });
  console.log(formattedDateData);
  console.log(week);
  console.log(user);
  const count_data = [];
  for(let a of week) {
    count_data.push(a.counts);
  }

  const options1 = { reponsive: true }
  const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "월 별 운동 내역",
        },
    },
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

  return(
    <>
    <Header/>
    <br/><br/><br/>

    <Wrapper>
      <InterDiv>
        <div>
          <i className="fas fa-running fa-2x"></i>
          <span> level</span>
        </div>
        <InfoDiv>
          <i className="fas fa-user fa-2x"></i>
          <span> Info</span>
          <ul>
            <li>아이디 : {user.email}</li>
            <li>닉네임 : {user.nickname}</li>
          </ul>
        </InfoDiv>
      </InterDiv>
      <ChartDiv>
        <i className="fas fa-chart-line fa-2x"></i>
        <span> Monthly Statistics</span>
        <Bar options={options1} data={data} />
        <Line options={options2} data={data} />
        </ChartDiv>
    </Wrapper>
    
    <Footer />
    </>
  );
};

export default MyPage;