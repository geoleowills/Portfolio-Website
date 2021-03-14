import React, { useState, useContext, useEffect } from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as ScrollLink } from "react-scroll"
import styled from "styled-components"
import { Context } from "../Context"
import Switch from "./Switch"
import { menuData } from "../data/MenuData"
import MenuBars from "../assets/svgs/menuBars.svg"

const Header = () => {
  const [navbar, setNavbar] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("/")

  useEffect(() => {
    setCurrentLocation(window.location.pathname)
  })

  const { isToggled, onToggle, toggle } = useContext(Context)

  return (
    <HeaderContainer isToggled={isToggled}>
      <IconLink to="/">
        <Initials isToggled={isToggled}>GW</Initials>
      </IconLink>
      <Nav navbar={navbar} isToggled={isToggled}>
        {currentLocation === "/" ? (
          <NavMenu>
            {menuData.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                smooth={true}
                duration={1000}
                isToggled={isToggled}
              >
                {item.title}
              </NavLink>
            ))}
          </NavMenu>
        ) : (
          <HomeLink to="/" isToggled={isToggled}>
            .home()
          </HomeLink>
        )}
      </Nav>
      <SwitchContainer>
        <Switch isToggled={isToggled} onToggle={onToggle} />
      </SwitchContainer>
      <Bars isToggled={isToggled} onClick={toggle} />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 35px;
  top: 0;
  padding: 0rem calc((100vw - 1300px) / 2);
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--very-dark-grey)" : "var(--very-light-grey)"};
  transition: 0.4s;
  z-index: 1000;
  overflow-x: hidden;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  z-index: 100;
  transition: 0.2s;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const IconLink = styled(GatsbyLink)`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 0 0 35px;
  cursor: pointer;
  text-decoration: none;
`

const Initials = styled.h1`
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  font-size: 1.3rem;
`

const NavLink = styled(ScrollLink)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  text-decoration: none;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: orange;
  }
`

const HomeLink = styled(GatsbyLink)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Bars = styled(MenuBars)`
  display: none;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(very-dark-grey)"};

  @media screen and (max-width: 768px) {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 35px 0 22px;
    cursor: pointer;
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-self: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 35px 0 0;

  @media screen and (max-width: 768px) {
    position: absolute;
    margin: 0;
    left: calc((100% - 50px) / 2);
  }
`
