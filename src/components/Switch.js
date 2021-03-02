import React, { useContext } from "react"
import styled from "styled-components"
import { Context } from "../Context"
import MoonIcon from "../assets/svgs/moonIcon.svg"
import SunIcon from "../assets/svgs/sunIcon.svg"

const Switch = () => {
  const { isToggled, setIsToggled, onToggle } = useContext(Context)

  return (
    <SwitchContainer>
      <Input
        type="checkbox"
        id="checkbox"
        checked={isToggled}
        onChange={onToggle}
      />
      <SwitchSlider for="checkbox">
        <Moon />
        <Sun />
      </SwitchSlider>
    </SwitchContainer>
  )
}

export default Switch

// Switch
const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
`

// Slider
const SwitchSlider = styled.label`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 50px;
  height: 26px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2px;
  border-radius: 50px;
  background-color: black;
  cursor: pointer;

  &:before {
    position: absolute;
    width: 22px;
    height: 22px;
    content: "";
    border-radius: 50%;
    background-color: var(--very-light-grey);
    transition: 0.4s;
  }
`

const Input = styled.input`
  display: none;

  &:checked + ${SwitchSlider}:before {
    transform: translateX(24px);
  }

  &:checked + ${SwitchSlider} {
  }
`

const Moon = styled(MoonIcon)`
  width: 22px;
  color: lightyellow;
`

const Sun = styled(SunIcon)`
  width: 22px;
  color: orange;
`
