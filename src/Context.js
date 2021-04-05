import React, { createContext, useState } from "react"

const defaultState = {
  isToggled: false,
  modalDisplay: false,
  selectedModal: null,
  isOpen: false,
  toggle: () => {},
  onToggle: () => {},
  switchModalDisplay: () => {},
}

export const Context = createContext(defaultState)

const Provider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false)
  const [modalDisplay, setModalDisplay] = useState(false)
  const [selectedModal, setSelectedModal] = useState(null)

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const onToggle = () => {
    setIsToggled(!isToggled)
  }

  const switchModalDisplay = () => {
    setModalDisplay(!modalDisplay)
  }

  const value = {
    isToggled,
    setIsToggled,
    onToggle,
    modalDisplay,
    setModalDisplay,
    switchModalDisplay,
    selectedModal,
    setSelectedModal,
    toggle,
    isOpen,
    setIsOpen,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Provider
