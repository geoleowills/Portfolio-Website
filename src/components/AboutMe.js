import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Aos from "aos"
import "aos/dist/aos.css"
import { Context } from "../Context"
import ProfileIcon from "../assets/svgs/profileIcon.svg"

const AboutMe = () => {
  const { isToggled } = useContext(Context)

  useEffect(() => {
    Aos.init({})
  }, [])

  const getDescription = useStaticQuery(graphql`
    query {
      allContentfulAboutMe {
        edges {
          node {
            aboutMeDescription {
              raw
            }
          }
        }
      }
    }
  `)

  return (
    <AboutMeContainer id="aboutme" isToggled={isToggled}>
      <TitleContainer
        data-aos="fade-right"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <Icon isToggled={isToggled} />
        <Title>ABOUT ME</Title>
      </TitleContainer>
      <Underline
        isToggled={isToggled}
        data-aos="fade-right"
        data-aos-delay="150"
        data-aos-duration="1000"
      />
      <ContentWrapper
        data-aos="fade-right"
        data-aos-delay="250"
        data-aos-duration="1000"
      >
        {renderRichText(
          getDescription.allContentfulAboutMe.edges[0].node.aboutMeDescription
        )}
      </ContentWrapper>
    </AboutMeContainer>
  )
}

export default AboutMe

const AboutMeContainer = styled.div`
  height: 100%;
  /* Minus stops header scrolling over content when you click link to that element. */
  margin: -35px 35px -35px 35px;
  padding: 70px calc((100vw - 1300px) / 2);
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--very-dark-grey)" : "var(--grey)"};
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  transition: 0.4s;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 35px;
`

const Icon = styled(ProfileIcon)`
  color: var(--icon-colour);
  font-size: 1.85rem;
`

const Title = styled.h1`
  padding-left: 0.5rem;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 700;
`

const Underline = styled.div`
  width: calc(100% - 70px);
  height: 1px;
  margin: 2rem 35px;
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 35px;
  font-size: 0.95rem;

  & > p {
    margin-bottom: 1rem;
  }
`
