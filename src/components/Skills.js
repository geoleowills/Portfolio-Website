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
  const { isToggled } = useContext(Context)

  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <StatsContainer isToggled={isToggled}>
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
      <SubTitleContainer>
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
      <SubTitleContainer>
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
    </StatsContainer>
  )
}

export default Stats

const StatsContainer = styled.div`
  transition: 0.4s;
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--very-dark-grey)" : "var(--grey)"};
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 35px calc((100vw - 1300px) / 2);
  margin: 0 35px;
  width: calc(100% - 70px);
  margin-left: auto;
  margin-right: auto;
  /* Stops header scrolling over content when you click link to that element. */
  /* margin-top: -35px; */
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
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 2rem;
  margin-bottom: 4rem;
`

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  width: 25%;
  text-align: center;

  & > h4 {
    padding-top: 10px;
  }
`

const TitleIcon = styled(SkillsIcon)`
  color: var(--title-icon);
  font-size: 2rem;
`
