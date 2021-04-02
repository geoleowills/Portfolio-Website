import React, { useContext } from "react"
import styled from "styled-components"
import { Context } from "../Context"
import { Link as GatsbyLink } from "gatsby"

const ErrorSection = () => {
  const { isToggled } = useContext(Context)

  return (
    <Error isToggled={isToggled}>
      <h1>404</h1>
      <p>Oh no! Page not found.</p>
      <Button to="/">GO HOME</Button>
    </Error>
  )
}

export default ErrorSection

const Error = styled.div`
  background: ${({ isToggled }) =>
    isToggled
      ? "linear-gradient(135deg, var(--main-colour) 0, var(--main-colour) 10%, var(--dark-grey) 10%, var(--dark-grey) 90%, var(--main-colour) 90%)"
      : "linear-gradient(135deg, var(--main-colour) 0, var(--main-colour) 10%, var(--light-grey) 10%, var(--light-grey) 90%, var(--main-colour) 90%)"};
  height: calc(100vh - 183px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: clamp(4rem, 10vw, 20rem);
    margin-bottom: 1rem;
  }

  p {
    font-size: clamp(2rem, 3vw, 10rem);
    margin-bottom: 2rem;
  }
`

const Button = styled(GatsbyLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135px;
  height: 35px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.4s;
  font-weight: 600;
  fill: var(--very-dark-grey);
  background-color: var(--main-colour);
  border: 0;
  color: var(--very-light-grey);
  text-decoration: none;

  & :hover {
    background-color: var(--icon-colour);
  }
`