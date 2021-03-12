import React, { useEffect, useContext, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import styled from "styled-components"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Aos from "aos"
import "aos/dist/aos.css"
import { Context } from "../Context"
import ModalWindow from "./ModalWindow"
import CodingIcon from "../assets/svgs/codingIcon.svg"
import PlayButton from "../assets/svgs/playButton.svg"
import GitHubLogo from "../assets/svgs/gitHubLogo.svg"

const Projects = () => {
  const { isToggled } = useContext(Context)
  const { modalDisplay, setModalDisplay, setSelectedModal } = useContext(
    Context
  )

  const { switchModalDisplay } = useContext(Context)
  useEffect(() => {
    Aos.init({})
  }, [])

  const cardData = useStaticQuery(graphql`
    query MyQuery {
      allContentfulModalWindow {
        edges {
          node {
            id
            heading
            projectid
            githubLink
            technologiesUsed
            description {
              raw
            }
            shortDescription {
              raw
            }
            coverPhoto {
              fluid {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  const handleModalClick = e => {
    setSelectedModal(e.target.id)
    switchModalDisplay()
  }

  function getProjects(cardData) {
    const projectArray = []
    cardData.allContentfulModalWindow.edges.forEach((item, index) => {
      projectArray.push(
        <CardContainer>
          <CardTitle
            isToggled={isToggled}
            data-aos="fade-left"
            data-aos-delay="250"
            data-aos-duration="1000"
          >
            {item.node.heading}
          </CardTitle>
          <ProjectCard
            key={index}
            data-aos="fade-left"
            data-aos-delay="350"
            data-aos-duration="1000"
          >
            <ImgContainer>
              <ProjectImg
                alt={item.node.title}
                fluid={item.node.coverPhoto.fluid}
                objectFit="cover"
                objectPosition="0 0"
              />
            </ImgContainer>{" "}
            <VideoButton id={index} type="button" onClick={handleModalClick}>
              <PlayIcon />
              Video
            </VideoButton>
            <SourceCodeButton
              href={item.node.githubLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GhLogo />
              Source Code
            </SourceCodeButton>
            <CardDescription>
              <h2>Description</h2> <CardUnderline />
              {renderRichText(item.node.description)}
            </CardDescription>
            <TechnologiesContainer>
              <TechnologiesHeading>Technologies Used</TechnologiesHeading>
              <CardUnderline />
              <TechnologiesList>
                {item.node.technologiesUsed.map((tech, index) => (
                  <React.Fragment>
                    <li>{tech}</li>
                  </React.Fragment>
                ))}
              </TechnologiesList>
            </TechnologiesContainer>
          </ProjectCard>
        </CardContainer>
      )
    })
    return projectArray
  }

  return (
    <div>
      {modalDisplay ? <ModalWindow /> : <span></span>}
      <ProjectContainer isToggled={isToggled}>
        <TargetDiv id="portfolio"></TargetDiv>
        <TitleContainer
          data-aos="fade-left"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          <Icon />
          <ProjectsHeading>PROJECT PORTFOLIO</ProjectsHeading>
        </TitleContainer>
        <Underline
          data-aos="fade-left"
          data-aos-delay="150"
          data-aos-duration="1000"
        />
        <ProjectWrapper>{getProjects(cardData)}</ProjectWrapper>
      </ProjectContainer>
    </div>
  )
}

export default Projects

const ProjectContainer = styled.div`
  margin: 0 35px;
  padding: 35px calc((100vw - 1300px) / 2);
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--dark-grey)" : "var(--light-grey)"};
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  transition: 0.4s;
  font-weight: 500;
`
// This div is the target that the menu links are set to, we can set this div above the element to avoid
// the header overlapping anything.
const TargetDiv = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  top: -70px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 2rem;
`

const Icon = styled(CodingIcon)`
  color: orange;
  font-size: 2rem;
`

const ProjectsHeading = styled.h1`
  padding-left: 0.5rem;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
`

const Underline = styled.hr`
  margin: 0 2rem 2rem 2rem;
  color: var(--very-dark-grey);
  border-radius: 20px;
`

const ProjectWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  justify-items: center;
  padding: 0 2rem;

  @media screen and (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`

const ProjectCard = styled.div`
  position: relative;
  width: 100%;
  height: 815px;
  background-color: var(--main-pink);
  color: var(--very-light-grey);
  border-radius: 10px;
  transition: 0.2s ease;
`
const ProjectImg = styled(Img)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

const CardTitle = styled.h1`
  margin-bottom: 15px;

  font-weight: 700;
  font-size: 1.6rem;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  transition: 0.4s;
`

const VideoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 80px;
  height: 35px;

  top: 227px;
  left: 15px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 0.9rem;

  transition: 0.3s;
  font-weight: 600;
  fill: var(--very-light-grey);

  background-color: var(--dark-grey);
  border: 0;
  color: var(--very-light-grey);

  & :hover {
    background-color: var(--main-pink);

    color: var(--very-light-grey);
    fill: var(--very-light-grey);
  }
`
const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  font-weight: 400;
  padding-top: 5px;
  padding-left: 0;
  padding-right: 5px;

  & > h2 {
    padding-bottom: 8px;
    padding-top: 7px;
    text-align: center;
    font-weight: 600;
  }

  & > p {
    padding-left: 1rem;
  }

  & > ul > li {
    padding-left: 1rem;
  }

  @media screen and (max-width: 1150px) {
    font-size: 0.85rem;
  }

  @media screen and (max-width: 868px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 693px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 0.65rem;
  }

  & > ul {
    /* margin-left: 1rem; */
  }
`

const TechnologiesList = styled.ul`
  margin-top: 16px;
  list-style-type: none;
  text-align: center;
  font-weight: 400;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-left: 0;
  align-items: center;
  justify-content: center;

  & > li {
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 1rem;
    /* flex: 1;
    flex-basis: 20%;
    max-width: 25%; */
    border: 0;
    border-radius: 6px;
    padding: 2px 5px;
    background-color: var(--dark-grey);
    color: var(--very-light-grey);
  }
`

const ImgContainer = styled.div`
  width: 100%;
  height: 34%;
  display: flex;
  overflow: hidden;
`

const PlayIcon = styled(PlayButton)`
  width: 13px;
  margin-right: 4px;
`
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const SourceCodeButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 135px;
  height: 35px;

  top: 227px;
  left: 105px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  background-color: var(--dark-grey);
  border: 0;
  color: var(--very-light-grey);
  text-decoration: none;
  transition: 0.3s;
  font-weight: 600;

  & :hover {
    background-color: var(--main-pink);
    color: var(--very-light-grey);
  }
`

const GhLogo = styled(GitHubLogo)`
  width: 25px;

  margin-right: 5px;
`

const TechnologiesContainer = styled.div`
  font-size: 0.85rem;
  text-align: center;
`

const TechnologiesHeading = styled.h2`
  padding-bottom: 12px;
  padding-top: 7px;
  margin-top: 10px;
  font-weight: 600;
`

const CardUnderline = styled.div`
  margin: 0 1rem;
  margin-bottom: 8px;
  height: 1px;
  background-color: white;
`
