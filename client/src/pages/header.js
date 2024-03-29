import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaBars } from "react-icons/fa";

const logout = () => {
  axios({
    url: "http://localhost:8123/logout",
    method: "POST",
    withCredentials: true,
  }).then((result) => {
    if (result.status === 200) {
      window.open("/", "_self");
    }
  });
};

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      <StyledHeader>
        <div className="nav_logo">
          <Link to={"/MainPage"} className="nav-logo-link">
            <img src="helper.png" alt="logo" />
          </Link>
        </div>
        <NavManu isToggleOpen={isToggleOpen}>
          <li>
            <Link to={"/Ranking"} className="nav-menu-list">
              랭킹
            </Link>
          </li>
          <li onClick={logout} className="nav-menu-list">
            로그아웃
          </li>
          <li>
            <Link to={"/MyPage"} className="nav-menu-list">
              마이페이지
            </Link>
          </li>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.header`
  z-index: 100;
  position: fixed;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    margin-left: 30px;
    .nav-logo-link img {
      width: 70px;
      height: 70px;
    }
  }
  .menuToggleBtn {
    display: none;
    color: black;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;
  margin-right: 60px;
  font-size: 18px;

  li {
    &:hover {
      cursor: pointer;
      background-color: #0095f6;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: #fff;
    text-shadow: -0.5px 0 #000, 0 0.5px #000, 0.5px 0 #000, 0 -0.5px #000;
    display: block;
    padding: 8px 16px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

export default Header;
