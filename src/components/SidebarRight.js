import React, { useContext } from "react"
import styled from "styled-components"
import "aos/dist/aos.css"
import { Context } from "../Context"

const SidebarRight = () => {
  const { isToggled } = useContext(Context)

  return <Sidebar isToggled={isToggled}></Sidebar>
}

const Sidebar = styled.div`
  display: flex;
  position: fixed;
  width: 35px;
  height: calc(100vh - 35px);
  transition: 0.4s;
  bottom: 0;
  right: 0;
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--very-dark-grey)" : "var(--very-light-grey)"};
  z-index: 7;
`

export default SidebarRight
