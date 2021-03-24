import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { Link as ScrollLink } from "react-scroll"
import { Context } from "../Context"
import { menuData } from "../data/MenuData"
import CloseIcon from "../assets/svgs/closeIcon.svg"

const Dropdown = () => {
  const { isOpen, toggle, isToggled } = useContext(Context)
  const [currentLocation, setCurrentLocation] = useState("/")

  useEffect(() => {
    setCurrentLocation(window.location.pathname)
  }, [])

  return (
    <DropdownContainer isOpen={isOpen} onClick={toggle} isToggled={isToggled}>
      <Icon onClick={toggle} />
      {currentLocation === "/" ? (
        <DropdownMenu>
          {menuData.map((item, index) => (
            <DropdownLink
              to={item.link}
              key={index}
              smooth={true}
              duration={1000}
              onClick={toggle}
            >
              {item.title}
            </DropdownLink>
          ))}
        </DropdownMenu>
      ) : (
        <DropdownLink>
          <HomeLink to="/">.home()</HomeLink>
        </DropdownLink>
      )}
    </DropdownContainer>
  )
}

export default Dropdown

const DropdownContainer = styled.aside`
  position: fixed;
  display: flex;
  top: ${({ isOpen }) => (isOpen ? "35px" : "-100%")};
  left: 35px;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 70px);
  height: calc(100vh - 35px);
  background: ${({ isToggled }) =>
    isToggled ? "var(--dark-grey)" : "var(--very-dark-grey)"};
  transition: 0.4s ease-in-out;
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
`

const Icon = styled(CloseIcon)`
  color: var(--very-light-grey);
  position: absolute;
  width: 35px;
  height: 35px;
  top: 15px;
  right: 20px;
  background: transparent;
  cursor: pointer;
`

const DropdownMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 80px);
  text-align: center;
  margin-bottom: 35px;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(4, 60px);
  }
`

const DropdownLink = styled(ScrollLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--very-light-grey);
  transition: 0.4s ease-in-out;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  cursor: pointer;

  &:hover {
    color: var(--icon-colour);
  }
`

const HomeLink = styled(GatsbyLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--very-light-grey);
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: var(--icon-colour);
  }
`
