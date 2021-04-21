import React, { useContext } from "react"
import styled from "styled-components"
import "aos/dist/aos.css"
import { Context } from "../Context"

const SidebarRight = () => {
  const { darkMode } = useContext(Context)

  return <Sidebar darkMode={darkMode}></Sidebar>
}

const Sidebar = styled.div`
  display: flex;
  position: fixed;
  width: 35px;
  height: calc(100vh - 35px);
  transition: 0.4s;
  bottom: 0;
  right: 0;
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--very-dark-grey)" : "var(--very-light-grey)"};
  z-index: 7;
`

export default SidebarRight
