import React from "react";
import styled from "styled-components";

class Footer extends React.Component {
  render() {
    return (
      <FooterContainer>
        <p>© 2023 Helper. All rights reserved.</p>
      </FooterContainer>
    );
  }
}

const FooterContainer = styled.footer`
  color: #fff;
  text-shadow: -0.5px 0 #000, 0 0.5px #000, 0.5px 0 #000, 0 -0.5px #000;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  p {
    margin: 0;
  }
`;

export default Footer;
