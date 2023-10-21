import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const StyledHeader = styled.header`
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    margin-left: 20px;
    .nav-logo-link img {
      width: 60px;
      height: 60px;
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
  margin-right: 20px;

  li {
    &:hover {
      cursor: pointer;
      background: #555;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: black;
    display: block;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

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
            <Link to={"/About"} className="nav-menu-list">
              About
            </Link>
          </li>
          <li>
            <Link to={"/Ranking"} className="nav-menu-list">
              랭킹
            </Link>
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

export default Header;
