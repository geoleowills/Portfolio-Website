import React, { useEffect, useContext } from "react"
import { Link as ScrollLink } from "react-scroll"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Aos from "aos"
import shortid from "shortid"
import { Context } from "../Context"
import "aos/dist/aos.css"
import MePng from "../assets/images/me.png"
import SpeechBubble from "../assets/svgs/speechBubble.svg"
import ArrowDown from "../assets/svgs/arrowDown.svg"

const HomePage = () => {
  const { isToggled } = useContext(Context)

  const getRandomKey = () => {
    return shortid.generate()
  }

  useEffect(() => {
    Aos.init({})
  }, [])

  const myInfo = useStaticQuery(graphql`
    query {
      allContentfulHomepage {
        edges {
          node {
            name
            title
          }
        }
      }
    }
  `)

  return (
    <HomepageContainer>
      <TargetDiv id="home"></TargetDiv>
      <HomePageContent isToggled={isToggled} key={getRandomKey()}>
        <MeImg src={MePng} width={250} />
        <TextBubble />
        <SpeechBubbleText>
          Hi,
          <br />
          I'm George.
          <br />
          Welcome to
          <br />
          my site!
        </SpeechBubbleText>

        <MainInfo>
          <Name
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1000"
            isToggled={isToggled}
          >
            {myInfo.allContentfulHomepage.edges.map(name => {
              return name.node.name
            })}
          </Name>
          <Title
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            isToggled={isToggled}
          >
            {myInfo.allContentfulHomepage.edges.map(name => {
              return name.node.title
            })}
          </Title>
          <ArrowContainer
            to="aboutme"
            smooth={true}
            duration={1000}
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
            isToggled={isToggled}
          >
            <Arrow isToggled={isToggled} />
          </ArrowContainer>
        </MainInfo>
      </HomePageContent>
    </HomepageContainer>
  )
}

export default HomePage

const HomepageContainer = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 35px);
  margin-top: 35px;
  color: var(--very-light-grey);
  transition: 0.4s;
`

const TargetDiv = styled.div`
  position: relative;
  width: 0;
  height: 0;
  top: -35px;
`

const HomePageContent = styled.div`
  width: calc(100% - 70px);
  max-height: 100%;
  margin: 0 35px;
  background: ${({ isToggled }) =>
    isToggled
      ? "linear-gradient(90deg, var(--main-pink) 50%, var(--dark-grey) 50%)"
      : "linear-gradient(90deg, var(--main-pink) 50%, var(--light-grey) 50%)"};
  z-index: 3;
`

const MainInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  max-height: 100%;
  padding: 0;
  text-align: center;
  font-weight: bold;
  line-height: 1.1;
  color: var(--very-light-grey);
`

const Name = styled.h1`
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  font-size: clamp(3rem, 5vw, 6rem);
  letter-spacing: 3px;
  word-spacing: 9999rem;
`

const Title = styled.p`
  margin-bottom: 2rem;
  padding-left: 4px;
  font-size: clamp(1.2rem, 2vw, 2.3rem);
  font-weight: 200;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  letter-spacing: 2px;
`

const ArrowContainer = styled(ScrollLink)`
  display: flex;
  margin-top: 100px;
  cursor: pointer;
  transition: 0.7s;

  &:hover {
    transform: rotate(365deg);
  }
`

const Arrow = styled(ArrowDown)`
  height: 45px;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  z-index: 10000;
`

const MeImg = styled.img`
  position: absolute;
  bottom: 35px;
  left: -80px;
`

const SpeechBubbleText = styled.p`
  position: absolute;
  bottom: 240px;
  left: 150px;
  text-align: center;
  font-weight: 600;
`

const TextBubble = styled(SpeechBubble)`
  position: absolute;
  width: 150px;
  bottom: 200px;
  left: 125px;
  fill: #f8f8f8;
`
