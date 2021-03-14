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
import Tilt from "react-parallax-tilt"

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
        <SpeechBubbleText>
          Hi,
          <br />
          I'm George.
          <br />
          Welcome to
          <br />
          my site!
        </SpeechBubbleText>
        <TiltContainer perspective={500}>
          <MainInfo>
            {/* <MyInfo> */}

            <Name
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              isToggled={isToggled}
            >
              {myInfo.allContentfulHomepage.edges.map(name => {
                return name.node.firstName
              })}{" "}
              <br />
              {myInfo.allContentfulHomepage.edges.map(name => {
                return name.node.lastName
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
            {/* </MyInfo> */}
            <ArrowContainer
              to="aboutme"
              smooth={true}
              duration={1000}
              isToggled={isToggled}
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
  /* overflow: hidden; */
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
    isToggled ? "var(--dark-grey)" : "var(--light-grey)"};
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    align-items: flex-start;
  }
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

const Name = styled.h1`
  margin-bottom: 1.5rem;
  /* padding: 0 1rem; */
  text-align: center;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  font-size: clamp(1.9rem, 5vw, 4rem);
  letter-spacing: 3px;
  /* width: 1px; */
  font-weight: 600;
  color: #669d89;
`

const Title = styled.p`
  margin-bottom: 2rem;
  padding-left: 4px;
  font-size: clamp(0.8rem, 2vw, 1.7rem);
  font-weight: 200;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  letter-spacing: 2px;
`

const ArrowContainer = styled(ScrollLink)`
  display: flex;
  /* width: 50%;
  height: 100%; */
  align-items: center;
  justify-content: center;
  /* padding-left: 100px; */

  transition: 0.7s;
`

const Arrow = styled(ArrowDown)`
  height: 45px;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  z-index: 10000;
  transition: 0.4s;
  cursor: pointer;
  /* transform: rotate(-0.5deg); */

  & :hover {
    color: orange;
    transform: rotate(360deg);
  }
`

const MeImg = styled.img`
  position: absolute;
  bottom: 35px;
  left: -80px;
`

const SpeechBubbleText = styled.p`
  position: absolute;
  bottom: 240px;
  left: 148px;
  text-align: center;
  font-weight: 400;
  color: var(--very-dark-grey);

  letter-spacing: 1px;
`

const TextBubble = styled(SpeechBubble)`
  position: absolute;
  width: 150px;
  bottom: 200px;
  left: 125px;
  fill: #669d89;
`

const MyInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`

const TiltContainer = styled(Tilt)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px;
  border-radius: 50px;
  border: 2px solid grey;
  max-width: 490px;
  margin-top: -35px;

  text-align: center;
  font-weight: bold;
  line-height: 1.1;
  color: var(--very-light-grey);

  background-color: var(--grey);
  transform-style: preserve-3d;
  box-shadow: 0 30px 20px rgb(0 0 0 / 40%);

  @media screen and (max-width: 1000px) {
    margin-top: 35px;
    padding: 45px;
    padding-top: 65px;
  }
`
