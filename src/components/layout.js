import React from "react"
import { GlobalStyle } from "./styles/GlobalStyles"
import Dropdown from "./Dropdown"
import Footer from "./Footer"
import Header from "./Header"
import SidebarLeft from "./SidebarLeft"
import SidebarRight from "./SidebarRight"

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Dropdown />
      <SidebarLeft />
      <SidebarRight />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
