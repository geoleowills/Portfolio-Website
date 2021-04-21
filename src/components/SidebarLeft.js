import React, { useContext } from "react"
import styled from "styled-components"
import "aos/dist/aos.css"
import { Context } from "../Context"
import GithubLogo from "../assets/svgs/gitHubLogo.svg"
import LinkedinLogo from "../assets/svgs/linkedinLogo.svg"
import MailIcon from "../assets/svgs/mailIcon.svg"

const SidebarLeft = () => {
  const { darkMode } = useContext(Context)

  return (
    <Sidebar darkMode={darkMode}>
      <IconContainer
        href="https://www.linkedin.com/in/george-willens-947688b7/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <IconOne darkMode={darkMode} />
      </IconContainer>
      <IconContainer
        href="https://github.com/geoleowills"
        target="_blank"
        rel="noreferrer noopener"
      >
        <IconTwo darkMode={darkMode} />
      </IconContainer>
      <IconContainer
        href="mailto:willensgeorge@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconThree darkMode={darkMode} />
      </IconContainer>
    </Sidebar>
  )
}

const Sidebar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  flex-direction: column;
  width: 35px;
  height: calc(100vh - 35px);
  left: 0;
  bottom: 0;
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--very-dark-grey)" : "var(--very-light-grey)"};
  transition: 0.4s;
  z-index: 6;
`

const IconContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`

const IconOne = styled(LinkedinLogo)`
  width: 22px;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  transition: 0.4s;

  &:hover {
    color: var(--icon-colour);
    transform: translate(0px, -3px);
  }
`
const IconTwo = styled(GithubLogo)`
  width: 22px;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  transition: 0.4s;

  &:hover {
    color: var(--icon-colour);
    transform: translate(0px, -3px);
  }
`

const IconThree = styled(MailIcon)`
  width: 22px;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  transition: 0.4s;

  &:hover {
    color: var(--icon-colour);
    transform: translate(0px, -3px);
  }
`

export default SidebarLeft
