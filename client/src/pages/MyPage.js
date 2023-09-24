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
  margin-left: 12px;
  margin-top: 5px;
  color: #616161;
  float: left;
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
  
  const [str, setStr] = useState('헬스 새싹');
  const [week, setWeek] = useState([]);
  //const { user } = useSelector(({ user }) => ({ user: user.user }));

  /*useEffect(() => {
    let lv = user.level;   
    if(lv == '🐣') setStr('헬스 병아리');
    else if(lv == '👶') setStr('헬린이');
    else if(lv == '🏋')  setStr('헬스 홀릭');
    else if(lv == '💪')  setStr('헬스 전문가');
    else if(lv == '👿')  setStr('PT 쌤');
    else if(lv == '🦍')  setStr('측정 불가');
  }, [user]);*/
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
  const date_data = [];
  for( let a of week){
    date_data.push(a.date);
  }
  console.log(date_data);
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
  const labels = date_data;
  const data = {
    labels,
    datasets: [
      {
        data: [100, 300, 500, 600, 300, 200, 100, 300, 500, 100, 200, 5],
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
            <i class="fas fa-running fa-2x"></i>
            <span> level</span> 
          </InterDiv>
          <br/><br/><br/><br/><br/><br/>
          <InterDiv>
            <i class="fas fa-user fa-2x"></i>
            <span> Info</span> 
          </InterDiv> 
          <br/><br/>
          <ul>
            <li>이름 <h2>케빈 데브라위너</h2></li>
            <li>닉네임 <h2>김덕배</h2></li>
          </ul>
          <br/><br/><br/><br/><br/><br/>
          <InterDiv>
            <i class="fas fa-chart-line fa-2x"></i>
            <span> Monthly Statistics</span>
            <Bar options={options1} data={data} />
            <Line options={options2} data={data} />
          </InterDiv>
    </Wrapper>
    
    <Footer />
    </>
  );
};

export default MyPage;