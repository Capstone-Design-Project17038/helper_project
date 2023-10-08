import React from 'react';
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';


function Ranking() {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:8123/rank",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setRank(result.data);
        console.log(result.data)
      }
    });
  }, []);
  return (
    <>
    <Header></Header>
    <Container>
    <TitleContaienr>
          <Title>랭킹</Title>
          <SubTitle>랭킹은 1위부터 100위까지만 표시됩니다.</SubTitle>
          <SubTitle>랭킹은 주기적으로 초기화합니다. (보통 일주일 단위)</SubTitle>
        </TitleContaienr>
    <Table>
        <THead>
          <THeadRow>
            <Rank>랭킹</Rank>
            <UserName>이름</UserName>
            <Point>점수</Point>
          </THeadRow>
        </THead>
        <TBody>
          {rank.map((data, index) => {
            if (index + 1 === 1) {
              console.log(data);
              return (
                <TBodyRow key={data.time}>
                  <Rank>🥇 {index + 1}등</Rank>
                  <RankerUserName>{data.nickname}</RankerUserName>
                  <RankerPoint>
                    {data.counts}개
                  </RankerPoint>
                </TBodyRow>
              );
            }
            if (index + 1 === 2) {
              return (
                <TBodyRow key={data.time}>
                  <Rank>🥈 {index + 1}등</Rank>
                  <RankerUserName>{data.nickname}</RankerUserName>
                  <RankerPoint>
                  {data.counts}개
                  </RankerPoint>
                </TBodyRow>
              );
            }
            if (index + 1 === 3) {
              return (
                <TBodyRow key={data.time}>
                  <Rank>🥉 {index + 1}등</Rank>
                  <RankerUserName>{data.nickname}</RankerUserName>
                  <RankerPoint>
                    {data.counts}개
                  </RankerPoint>
                </TBodyRow>
              );
            }
            return (
              <TBodyRow key={data.time}>
                <Rank>{index + 1}등</Rank>
                <UserName>{data.nickname}</UserName>
                <RankerPoint>
                  {data.counts}개
                </RankerPoint>
              </TBodyRow>
            );
          })}
        </TBody>
      </Table>
      </Container>
    <Footer></Footer>
    </>
  )
}
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  width: 100vw;
`;


const TitleContaienr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  color: #b3b3b3;
`;

const HomeButton = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  transition: 0.3s all ease;
  object-fit: contain;
  padding: 20px;
  margin-top: 10px;

  :hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;

const Table = styled.table`
  width: 1024px;
  text-align: center;

  @media screen and (max-width: 1024px) {
    width: 100vw;
  }
`;

const THead = styled.thead`
  background-color: rgba(66, 73, 255, 1);
  color: white;
  font-size: 18px;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const THeadRow = styled.tr``;

const TBody = styled.tbody``;

const TBodyRow = styled.tr`
  font-size: 18px;
  border: 1px solid #eeeeee;
  transition: 0.3s background-color ease;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  :hover {
    background-color: #f8f8f8;
  }
`;

const Rank = styled.td`
  width: 15%;
  padding: 20px 0px;
`;

const UserName = styled.td`
  width: 30%;
  padding: 20px 0px;
  border-left: 1px solid #eeeeee;
`;


const Point = styled.td`
  width: 40%;
  padding: 20px 0px;
  border-left: 1px solid #eeeeee;
`;

const RankerUserName = styled.td`
  width: 30%;
  padding: 30px 0px;
  border-left: 1px solid #eeeeee;
  font-weight: bold;
  font-size: 24px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const RankerPoint = styled.td`
  width: 40%;
  padding: 30px 0px;
  border-left: 1px solid #eeeeee;
  font-weight: bold;
  font-size: 24px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export default Ranking;