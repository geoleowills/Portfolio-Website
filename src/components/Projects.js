import React, { useEffect, useContext, Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Aos from "aos"
import "aos/dist/aos.css"
import { Context } from "../Context"
import ModalWindow from "./ModalWindow"
import CodingIcon from "../assets/svgs/codingIcon.svg"
import PlayButton from "../assets/svgs/playButton.svg"
import GitHubLogo from "../assets/svgs/gitHubLogo.svg"
import BackgroundImage from "gatsby-background-image"

const Projects = () => {
  const { darkMode } = useContext(Context)
  const { modalDisplay, setSelectedModal } = useContext(Context)

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
          <ProjectCard
            key={index}
            data-aos="fade-left"
            data-aos-delay="350"
            data-aos-duration="1000"
          >
            <CoverImage fluid={item.node.coverPhoto.fluid}>
              <BlackOverlay>
                <CardTitle darkMode={darkMode}>{item.node.heading}</CardTitle>
                <VideoButton
                  id={index}
                  type="button"
                  onClick={handleModalClick}
                >
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
              </BlackOverlay>
            </CoverImage>

            <CardDescription>
              <h2>Description</h2>
              <CardUnderline />
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
    <Fragment>
      {modalDisplay ? <ModalWindow /> : <span></span>}
      <ProjectContainer darkMode={darkMode}>
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
          darkMode={darkMode}
          data-aos="fade-left"
          data-aos-delay="150"
          data-aos-duration="1000"
        />
        <ProjectWrapper>{getProjects(cardData)}</ProjectWrapper>
      </ProjectContainer>
    </Fragment>
  )
}

export default Projects

const ProjectContainer = styled.div`
  margin: 0 35px;
  padding: 35px calc((100vw - 1300px) / 2);
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--dark-grey)" : "var(--light-grey)"};
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
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
  padding: 0 35px;
`

const Icon = styled(CodingIcon)`
  color: var(--icon-colour);
  font-size: 2rem;
`

const ProjectsHeading = styled.h1`
  padding-left: 8px;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
`

const Underline = styled.div`
  width: calc(100% - 70px);
  height: 1px;
  margin: 2rem 35px;
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
`

const ProjectWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  justify-items: center;
  padding: 0 35px;

  @media screen and (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--very-light-grey);
  color: var(--very-dark-grey);
  border-radius: 10px;
  transition: 0.2s ease;
  box-shadow: 3px 3px 10px #999999;
  overflow: hidden;
  padding-bottom: 20px;
`

const CardTitle = styled.h1`
  margin-bottom: 15px;
  margin-top: 15px;
  font-weight: 600;
  font-size: 2rem;
  transition: 0.4s;
  color: var(--very-light-grey);
`

const VideoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2.2rem;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.4s;
  font-weight: 600;
  fill: var(--very-dark-grey);
  background-color: var(--main-colour);
  border: 0;
  color: var(--very-light-grey);

  & :hover {
    background-color: var(--icon-colour);
  }
`
const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  font-weight: 400;
  padding: 5px 20px 0 20px;

  & > h2 {
    padding-bottom: 8px;
    padding-top: 7px;
    text-align: center;
    font-weight: 600;
  }

  & > ul {
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
`

const TechnologiesList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding-left: 0;
  font-weight: 400;
  text-align: center;
  flex-wrap: wrap;
  list-style-type: none;

  & > li {
    margin: 0 5px 10px 5px;
    padding: 2px 5px;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    background-color: var(--dark-grey);
    color: var(--very-light-grey);
  }
`

const PlayIcon = styled(PlayButton)`
  width: 13px;
  margin-right: 4px;
  fill: var(--very-light-grey);
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
`

const SourceCodeButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 2.2rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  background-color: var(--main-colour);
  border: 0;
  color: var(--very-light-grey);
  text-decoration: none;
  transition: 0.4s;
  font-weight: 600;

  & :hover {
    background-color: var(--icon-colour);
  }
`

const GhLogo = styled(GitHubLogo)`
  width: 25px;
  margin-right: 5px;
`

const TechnologiesContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  font-size: 0.85rem;
  text-align: center;
`

const TechnologiesHeading = styled.h2`
  margin-top: 10px;
  padding-bottom: 12px;
  padding-top: 7px;
  font-weight: 600;
`

const CardUnderline = styled.div`
  margin: 0 1rem;
  margin-bottom: 8px;
  height: 1px;
  background-color: var(--grey);
`

const CoverImage = styled(BackgroundImage)`
  width: 100%;
  height: 250px;
  background-size: cover;
  overflow: hidden;
  border-radius: 10px;
  background-position: top center;
`

const BlackOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 5px 20px 20px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
`
