import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import { CurrentSkillsData } from "../data/CurrentSkillsData"
import { NearFutureSkillsData } from "../data/NearFutureSkills"
import { FutureSkillsData } from "../data/FutureSkills"
import Aos from "aos"
import "aos/dist/aos.css"
import { Context } from "../Context"
import SkillsIcon from "../assets/svgs/skillsIcon.svg"

const Stats = () => {
  const { darkMode } = useContext(Context)

  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <SkillsContainer darkMode={darkMode}>
      <TargetDiv id="skills"></TargetDiv>
      <TitleContainer
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <TitleIcon />
        <Heading>Skills</Heading>
      </TitleContainer>
      <Underline
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="1000"
      />
      <SubTitleContainer
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-duration="1000"
      >
        <SubHeading>Current Skills</SubHeading>
        <p>My current skillset.</p>
      </SubTitleContainer>

      <Wrapper>
        {CurrentSkillsData.map((item, index) => {
          return (
            <Icon
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="1000"
            >
              {item.icon}
              <h4>{item.name}</h4>
            </Icon>
          )
        })}
      </Wrapper>
      <SubTitleContainer
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <SubHeading>Soon Plan To Explore</SubHeading>
        <p>Skills and technologies I plan to explore in the coming months.</p>
      </SubTitleContainer>
      <Wrapper>
        {NearFutureSkillsData.map((item, index) => {
          return (
            <Icon
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="1000"
            >
              {item.icon}
              <h4>{item.name}</h4>
            </Icon>
          )
        })}
      </Wrapper>
      <SubTitleContainer
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <SubHeading>Long Term Skill Goals</SubHeading>
        <p>Skills and technologies I plan to explore in future.</p>
      </SubTitleContainer>
      <Wrapper>
        {FutureSkillsData.map((item, index) => {
          return (
            <Icon
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="1000"
            >
              {item.icon}
              <h4>{item.name}</h4>
            </Icon>
          )
        })}
      </Wrapper>
    </SkillsContainer>
  )
}

export default Stats

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 70px);
  margin: 0 35px;
  padding: 35px calc((100vw - 1300px) / 2);
  margin-left: auto;
  margin-right: auto;
  transition: 0.4s;
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--very-dark-grey)" : "var(--grey)"};
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
`

// This div is the target that the menu links are set to, we can set this div above the element to avoid
// the header overlapping anything.
const TargetDiv = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  top: -70px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.5rem;
`

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 1.5rem;
`

const Heading = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
  padding-left: 0.5rem;
`

const SubHeading = styled.h2``

const Underline = styled.hr`
  margin: 0 2rem 1.5rem 2rem;
  color: var(--very-dark-grey);
  border-radius: 20px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 2rem;
  margin-bottom: 4rem;
`

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  text-align: center;

  & > h4 {
    padding-top: 10px;
  }

  @media screen and (max-width: 693px) {
    width: 33%;
  }

  @media screen and (max-width: 550px) {
    width: 50%;
  }
`

const TitleIcon = styled(SkillsIcon)`
  color: var(--icon-colour);
  font-size: 2rem;
`
