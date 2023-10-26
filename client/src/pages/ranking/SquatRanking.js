import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function SquatRanking() {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    axios({
      url: `http://localhost:8123/view_squat_rank`, //클릭하면 선택한 운동의 랭킹 데이터 가져오기
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setRank(result.data);
        console.log(result.data);
      }
    });
  }, []);

  return (
    <>
      <Container>
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
                return (
                  <TBodyRow key={data.time}>
                    <Rank>🥇 {index + 1}등</Rank>
                    <RankerUserName>{data.nickname}</RankerUserName>
                    <RankerPoint>{data.counts}개</RankerPoint>
                  </TBodyRow>
                );
              }
              if (index + 1 === 2) {
                return (
                  <TBodyRow key={data.time}>
                    <Rank>🥈 {index + 1}등</Rank>
                    <RankerUserName>{data.nickname}</RankerUserName>
                    <RankerPoint>{data.counts}개</RankerPoint>
                  </TBodyRow>
                );
              }
              if (index + 1 === 3) {
                return (
                  <TBodyRow key={data.time}>
                    <Rank>🥉 {index + 1}등</Rank>
                    <RankerUserName>{data.nickname}</RankerUserName>
                    <RankerPoint>{data.counts}개</RankerPoint>
                  </TBodyRow>
                );
              }
              return (
                <TBodyRow key={data.time}>
                  <Rank>{index + 1}등</Rank>
                  <UserName>{data.nickname}</UserName>
                  <RankerPoint>{data.counts}개</RankerPoint>
                </TBodyRow>
              );
            })}
          </TBody>
        </Table>
      </Container>
    </>
  );
}
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  width: 90vw;
`;

const Table = styled.table`
  width: 70%;
  text-align: center;

  @media screen and (max-width: 1024px) {
    width: 100vw;
  }
`;

const THead = styled.thead`
  background-color: rgba(66, 73, 255, 1);
  color: white;
  font-size: 16px;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const THeadRow = styled.tr``;

const TBody = styled.tbody``;

const TBodyRow = styled.tr`
  font-size: 16px;
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
  padding: 12px 0px;
`;

const UserName = styled.td`
  width: 30%;
  padding: 12px 0px;
  border-left: 1px solid #eeeeee;
`;

const Point = styled.td`
  width: 40%;
  padding: 12px 0px;
  border-left: 1px solid #eeeeee;
`;

const RankerUserName = styled.td`
  width: 30%;
  padding: 20px 0px;
  border-left: 1px solid #eeeeee;
  font-weight: bold;
  font-size: 18px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const RankerPoint = styled.td`
  width: 40%;
  padding: 20px 0px;
  border-left: 1px solid #eeeeee;
  font-weight: bold;
  font-size: 18px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export default SquatRanking;
