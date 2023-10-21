import React from "react";
import styled from "styled-components";

function About() {
  return <HeaderContainer></HeaderContainer>;
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.2);
`;

export default About;
