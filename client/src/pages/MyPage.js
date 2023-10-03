//막대 그래프 : 우리가 막대는 몇개 띄울지 생각해야 할듯
//꺾은선 그래프 
import React from 'react';
import styled from 'styled-components';
import Header from "./header";
import Footer from "./footer";
import SidebarItem from "./SideBarItem";
import SquatChart from './chart/SquatChart';
import { NavLink } from "react-router-dom";

function MyPage()
{
  const menus = [
    { name: "스쿼트", path: "/" },
    { name: "런지", path: "/mylist" },
    { name: "숄더 프레스", path: "/likedlist" },
    { name: "설정", path: "/setting"}
  ];

  return(
    <>
    <Header/>
    <Content>
    <Side>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{color: "gray", textDecoration: "none"}}
              to={menu.path}
              key={index}
              activeStyle={{color: "black"}}
            >
              <SidebarItem
                menu={menu}
              />
            </NavLink>
          );
        })}
      </Menu>
    </Side>
    <SquatChart></SquatChart>
    </Content>
    <Footer />
    </>
  );
};
const Content = styled.div`
  display: flex;
`;


const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`

const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`
export default MyPage;