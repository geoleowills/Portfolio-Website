import React, { useContext } from "react"
import styled from "styled-components"
import { Link as ScrollLink } from "react-scroll"
import { Context } from "../Context"
import ArrowDown from "../assets/svgs/arrowDown.svg"

const Footer = () => {
  const { isToggled } = useContext(Context)

  return (
    <FooterContainer isToggled={isToggled}>
      <Info>
        <ContactInfo>
          <h1>GW</h1>
          <p>willensgeorge@gmail.com</p>
          <p>079 8345 2478</p>
        </ContactInfo>
        <SiteInfo>
          <p>Site By</p>
          <p>George Willens © 2021</p>
        </SiteInfo>
      </Info>
      <ArrowContainer to="home" smooth={true} duration={1000}>
        <Arrow isToggled={isToggled} />
      </ArrowContainer>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 70px);
  height: 100%;
  margin: 0 35px;
  padding: 2rem calc((100vw - 1300px) / 2);
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--very-dark-grey)" : "var(--grey)"};
  transition: 0.4s;
`

const ContactInfo = styled.div`
  padding-bottom: 1rem;
  & > p {
    font-size: 0.85rem;
  }
`

const SiteInfo = styled.div`
  & > p {
    font-size: 0.85rem;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 100%;
  padding-left: 2rem;
`

const ArrowContainer = styled(ScrollLink)`
  display: flex;
  padding-right: 2rem;
  cursor: pointer;
`
const Arrow = styled(ArrowDown)`
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  transform: rotate(180deg);
  transition: 0.7s;

  &:hover {
    transform: rotate(540deg);
  }
`
