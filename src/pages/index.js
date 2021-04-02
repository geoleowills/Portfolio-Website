import React from "react"
import Email from "../components/Email"
import HomePage from "../components/HomePage"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Skills from "../components/Skills"
import AboutMe from "../components/AboutMe"
import Projects from "../components/Projects"
import Provider from "../Context"
import { Helmet } from "react-helmet"

const IndexPage = () => (
  <Provider>
    <Helmet>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <Layout>
      <SEO title="George Willens" />
      <HomePage />
      <AboutMe />
      <Projects />
      <Skills />
      <Email />
    </Layout>
  </Provider>
)

export default IndexPage
