import React, { createContext, useState } from "react"

const defaultState = {
  darkMode: false,
  modalDisplay: false,
  selectedModal: null,
  isOpen: false,
  toggle: () => {},
  modeToggle: () => {},
  switchModalDisplay: () => {},
}

export const Context = createContext(defaultState)

const Provider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [modalDisplay, setModalDisplay] = useState(false)
  const [selectedModal, setSelectedModal] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const modeToggle = () => {
    setDarkMode(!darkMode)
  }

  const switchModalDisplay = () => {
    setModalDisplay(!modalDisplay)
  }

  const value = {
    darkMode,
    setDarkMode,
    modeToggle,
    modalDisplay,
    setModalDisplay,
    switchModalDisplay,
    selectedModal,
    setSelectedModal,
    dropdownToggle,
    dropdownOpen,
    setDropdownOpen,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Provider
