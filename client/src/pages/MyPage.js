//막대 그래프 : 우리가 막대는 몇개 띄울지 생각해야 할듯
//꺾은선 그래프
import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
import Footer from "./footer";
import SquatChart from "./chart/SquatChart";
import ShoulderChart from "./chart/ShoulderChart";
import SideCrunchChart from "./chart/SideCrunchChart";

function MyPage() {
  const [content, setContent] = useState();

  const handleClickButton = (e) => {
    const { name } = e.target;
    console.log(name);
    setContent(name);
  };

  const exercises = [
    { name: "SquatChart", id: "스쿼트" },
    { name: "ShoulderChar", id: "숄더프레스" },
    { name: "SideCrunchChart", id: "사이드크런치" },
    { name: "SideCrunchChart", id: "사이드레터럴레이즈" },
  ];

  const selectComponent = {
    스쿼트: <SquatChart />,
    숄더프레스: <ShoulderChart />,
    사이드크런치: <SideCrunchChart />,
  };

  return (
    <>
      <Header />
      <Content>
        <Side>
          <Menu>
            {exercises.map((data) => {
              return (
                <Button onClick={handleClickButton} name={data.id}>
                  {data.id}
                </Button>
              );
            })}
          </Menu>
        </Side>
        {content && <CenteredChart>{selectComponent[content]}</CenteredChart>}
      </Content>
      <Footer />
    </>
  );
}
const Content = styled.div`
  display: flex;
  height: 2000px;
`;

const Side = styled.div`
  top: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  background-color: #f0f0f0; /* 사이드바 배경색 지정 */
  padding: 20px; /* 내부 여백 지정 */
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
`;

const Menu = styled.div`
  margin-top: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px; /* 각 메뉴 아이템 사이의 간격 지정 */
`;

const Button = styled.button`
  background-color: #fff; /* 버튼 배경색 지정 */
  border: 1px solid #ccc; /* 버튼 테두리 스타일 지정 */
  padding: 10px 20px; /* 버튼 내부 여백 지정 */
  border-radius: 5px; /* 버튼 모서리 둥글게 지정 */
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e0e0e0; /* 마우스 오버시 배경색 변경 */
  }
`;

const CenteredChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1; /* 부모 Content에 대한 공간을 채우기 위해 확장합니다. */
`;

export default MyPage;
