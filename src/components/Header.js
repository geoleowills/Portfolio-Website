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
  const { darkMode, modeToggle, dropdownToggle } = useContext(Context)

  useEffect(() => {
    setCurrentLocation(window.location.pathname)
  })

  return (
    <HeaderContainer darkMode={darkMode}>
      <IconLink to="/">
        <Initials darkMode={darkMode}>GW</Initials>
      </IconLink>
      <Nav navbar={navbar} darkMode={darkMode}>
        {currentLocation === "/" ? (
          <NavMenu>
            {menuData.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                smooth={true}
                duration={1000}
                darkMode={darkMode}
              >
                {item.title}
              </NavLink>
            ))}
          </NavMenu>
        ) : (
          <HomeLink to="/" darkMode={darkMode}>
            .home()
          </HomeLink>
        )}
      </Nav>
      <SwitchContainer>
        <Switch darkMode={darkMode} modeToggle={modeToggle} />
      </SwitchContainer>
      <Bars darkMode={darkMode} onClick={dropdownToggle} />
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
  padding: 0 calc((100vw - 1300px) / 2);
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--very-dark-grey)" : "var(--very-light-grey)"};
  transition: 0.4s;
  z-index: 4;
  overflow-x: hidden;
`

const IconLink = styled(GatsbyLink)`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 35px;
  cursor: pointer;
  text-decoration: none;
`

const Initials = styled.h1`
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  font-size: 1.3rem;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  z-index: 2;
  transition: 0.2s;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(ScrollLink)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  text-decoration: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s;

  &:hover {
    color: var(--icon-colour);
  }
`

const HomeLink = styled(GatsbyLink)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  text-decoration: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s;

  &:hover {
    color: var(--icon-colour);
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

const Bars = styled(MenuBars)`
  display: none;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(very-dark-grey)"};

  @media screen and (max-width: 768px) {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 35px 0 22px;
    cursor: pointer;
  }
`
