import React, { createContext, useState } from "react"

export const Context = createContext()

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
