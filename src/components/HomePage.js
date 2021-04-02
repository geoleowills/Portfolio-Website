import React, { useEffect, useContext } from "react"
import { Link as ScrollLink } from "react-scroll"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Aos from "aos"
import shortid from "shortid"
import { Context } from "../Context"
import "aos/dist/aos.css"
import Tilt from "react-parallax-tilt"
import { Pace, WindupChildren } from "windups"
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
            firstName
            lastName
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
        <SpeechBubbleText isToggled={isToggled}>
          <WindupChildren>
            <Pace ms={75}>
              Hi,
              <br />
              I'm George.
              <br />
              Welcome to
              <br />
              my site!
            </Pace>
          </WindupChildren>
        </SpeechBubbleText>
        <TiltContainer perspective={500} isToggled={isToggled}>
          <MainInfo>
            <Name
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              isToggled={isToggled}
            >
              {myInfo.allContentfulHomepage.edges.map(name => {
                return name.node.firstName
              })}
              <br />
              {myInfo.allContentfulHomepage.edges.map(name => {
                return name.node.lastName
              })}
            </Name>

            <Title
              data-aos="fade-up"
              data-aos-delay="150"
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
              isToggled={isToggled}
              data-aos="fade-up"
              data-aos-delay="250"
              data-aos-duration="1000"
            >
              <Arrow isToggled={isToggled} />
            </ArrowContainer>
          </MainInfo>
        </TiltContainer>
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
  overflow: hidden;
`

const TargetDiv = styled.div`
  position: relative;
  width: 0;
  height: 0;
  top: -35px;
`

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 70px);
  max-height: 100%;
  margin: 0 35px;
  background: ${({ isToggled }) =>
    isToggled
      ? "linear-gradient(135deg, var(--main-colour) 0, var(--main-colour) 10%, var(--dark-grey) 10%, var(--dark-grey) 90%, var(--main-colour) 90%)"
      : "linear-gradient(135deg, var(--main-colour) 0, var(--main-colour) 10%, var(--light-grey) 10%, var(--light-grey) 90%, var(--main-colour) 90%)"};
  z-index: 1;
`

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  transform: translateZ(70px);
`

const TiltContainer = styled(Tilt)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 450px;
  padding: 60px;
  border-radius: 50px;
  margin-top: -35px;
  text-align: center;
  font-weight: bold;
  line-height: 1.1;
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--main-colour)" : "var(--grey)"};
  transform-style: preserve-3d;
  box-shadow: 0 30px 20px rgb(0 0 0 / 40%);

  @media screen and (max-width: 1000px) {
    padding: 45px;
    padding-top: 50px;
    margin-top: -100px;
  }
`

const Name = styled.h1`
  margin-bottom: 1.5rem;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--main-colour)"};
  font-size: clamp(1.9rem, 3.5vw, 3.5rem);
  font-weight: 600;
  text-align: center;
  letter-spacing: 3px;
`

const Title = styled.p`
  margin-bottom: 2rem;
  padding-left: 4px;
  font-size: clamp(0.8rem, 1.65vw, 1.6rem);
  font-weight: 200;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  letter-spacing: 2px;
`

const ArrowContainer = styled(ScrollLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  transition: 0.7s;
`

const Arrow = styled(ArrowDown)`
  height: 100%;
  width: 100%;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  z-index: 5;
  transition: 0.4s;
  cursor: pointer;

  & :hover {
    color: orange;
    transform: rotate(360deg);
  }
`

const MeImg = styled.img`
  position: absolute;
  bottom: 35px;
  left: -80px;

  @media screen and (max-width: 1000px) {
    bottom: -45px;
  }
`

const SpeechBubbleText = styled.p`
  position: absolute;
  bottom: 240px;
  left: 148px;
  text-align: center;
  font-weight: 500;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  letter-spacing: 1px;

  @media screen and (max-width: 1000px) {
    bottom: 135px;
  }
`

const TextBubble = styled(SpeechBubble)`
  position: absolute;
  width: 150px;
  bottom: 200px;
  left: 125px;
  fill: orange;

  @media screen and (max-width: 1000px) {
    bottom: 98px;
  }
`
