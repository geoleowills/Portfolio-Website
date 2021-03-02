import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import Provider from "../Context"
import { Link as GatsbyLink } from "gatsby"

const NotFoundPage = () => (
  <Provider>
    <Layout>
      <SEO title="404: Not found" />
      <Error>
        <h1>404</h1>
        <p>Oh no! Page not found.</p>
        <Button to="/">HOME</Button>
      </Error>
    </Layout>
  </Provider>
)

export default NotFoundPage

const Error = styled.div`
  background: #e98074;
  height: calc(100vh - 200px);
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
  width: 95px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  background-color: #ebebeb;
  text-decoration: none;
  color: black;
`
