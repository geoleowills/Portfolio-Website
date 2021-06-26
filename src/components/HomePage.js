import React, { useEffect, useContext } from "react"
import { Link as ScrollLink } from "react-scroll"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Aos from "aos"
import shortid from "shortid"
import { Context } from "../Context"
import "aos/dist/aos.css"
import Tilt from "react-parallax-tilt"
import Typewriter from "typewriter-effect"
import MePng from "../assets/images/me.png"
import SpeechBubble from "../assets/svgs/speechBubble.svg"
import ArrowDown from "../assets/svgs/arrowDown.svg"

const HomePage = () => {
  const { darkMode } = useContext(Context)

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
      <HomePageContent darkMode={darkMode} key={getRandomKey()}>
        <MeImg src={MePng} width={250} />
        {darkMode ? (
          <TypingContainer>
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString(
                    "<span style='color: var(--very-light-grey)'>Hi, I'm George. Welcome to my site!</span>"
                  )
                  .callFunction(() => {
                    console.log("String typed out!")
                  })
                  .start()
              }}
            />
          </TypingContainer>
        ) : (
          <TypingContainer>
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString(
                    "<span style='color: var(--very-dark-grey)'>Hi, I'm George. Welcome to my site!</span>"
                  )
                  .callFunction(() => {
                    console.log("String typed out!")
                  })
                  .start()
              }}
            />
          </TypingContainer>
        )}

        <TiltContainer perspective={500} darkMode={darkMode}>
          <MainInfo>
            <Name darkMode={darkMode}>
              {myInfo.allContentfulHomepage.edges.map(name => {
                return name.node.firstName
              })}
              <br />
              {myInfo.allContentfulHomepage.edges.map(name => {
                return name.node.lastName
              })}
            </Name>

            <Title darkMode={darkMode}>
              {myInfo.allContentfulHomepage.edges.map(name => {
                return name.node.title
              })}
            </Title>

            <ArrowContainer
              to="aboutme"
              smooth={true}
              duration={1000}
              darkMode={darkMode}
            >
              <Arrow darkMode={darkMode} />
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
  /* Minus stops header scrolling over content when you click link to that element. */
  top: -35px;
`

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 70px);
  max-height: 100%;
  margin: 0 35px;
  background: ${({ darkMode }) =>
    darkMode
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
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--main-colour)" : "var(--grey)"};
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
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--main-colour)"};
  font-size: clamp(1.9rem, 3vw, 3rem);
  font-weight: 600;
  text-align: center;
  letter-spacing: 3px;
`

const Title = styled.p`
  margin-bottom: 2rem;
  padding-left: 4px;
  font-size: clamp(0.9rem, 1.41vw, 1.37rem);
  font-weight: 200;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  letter-spacing: 2px;
`

const ArrowContainer = styled(ScrollLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
`

const Arrow = styled(ArrowDown)`
  height: 100%;
  width: 100%;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  z-index: 5;
  transition: 0.4s;
  cursor: pointer;

  & :hover {
    color: var(--icon-colour);
    transform: rotate(360deg);
  }
`

const MeImg = styled.img`
  position: absolute;
  bottom: 55px;
  left: 5px;

  @media screen and (max-width: 1000px) {
    bottom: -45px;
  }
`

const TypingContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 60px;
  /* text-align: center; */
  font-weight: 500;
  font-size: 16px;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  letter-spacing: 1px;

  @media screen and (max-width: 1000px) {
    bottom: 135px;
  }
`
