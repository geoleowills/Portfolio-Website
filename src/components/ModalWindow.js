import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import GitHubLogo from "../assets/svgs/githublogo.svg"
import { Context } from "../Context"

const ModalWindow = () => {
  const {
    modalDisplay,
    switchModalDisplay,
    selectedModal,
    setSelectedModal,
  } = useContext(Context)

  const [id, setId] = useState(selectedModal.toString())
  const [videoUrl, setVideoUrl] = useState(null)
  const [heading, setHeading] = useState(null)
  const [description, setDescription] = useState(null)
  const [technologies, setTechnologies] = useState([])
  const [gitLink, setGitLink] = useState(null)

  const getVideo = useStaticQuery(graphql`
    query VideoQuery {
      allContentfulModalWindow {
        edges {
          node {
            projectid
            videoId
            githubLink
            heading
            technologiesUsed
            description {
              raw
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    getVideo.allContentfulModalWindow.edges.forEach(video => {
      if (id === video.node.projectid) {
        setVideoUrl(
          `https://player.vimeo.com/video/${video.node.videoId}?loop=1&title=0&byline=0&portrait=0`
        )
        setHeading(video.node.heading)
        setDescription(renderRichText(video.node.description))

        const technologiesList = video.node.technologiesUsed.map(
          (tech, index) => (
            <React.Fragment>
              <li>{tech}</li>
              {video.node.technologiesUsed.length != index + 1 ? (
                <Underline />
              ) : (
                <span
                  css={`
                    display: none;
                  `}
                ></span>
              )}
            </React.Fragment>
          )
        )
        setTechnologies(technologiesList)
        setGitLink(video.node.githubLink)
      }
    })
  }, [])

  return (
    <MainContainer modalDisplay={modalDisplay}>
      <ModalWindowContainer onClick={switchModalDisplay}></ModalWindowContainer>
      <ModalContent>
        <ContentContainer>
          <Video
            src={videoUrl}
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></Video>

          <ProjectContainer>
            <ProjectInfo>
              <Heading>{heading}</Heading>
              <Description>{description}</Description>
            </ProjectInfo>
            <TechnologyContainer>
              <TechnologyList>{technologies}</TechnologyList>
            </TechnologyContainer>
            <Links>
              <Button href={gitLink} target="_blank" rel="noreferrer noopener">
                <h1>SOURCE CODE</h1>
                <GhLogo />
              </Button>
            </Links>
          </ProjectContainer>
        </ContentContainer>
      </ModalContent>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  transition: 0.4s;
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000000;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`
const ModalWindowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--grey);
  width: 725px;
  max-height: 891px;
  height: calc(100vh - 70px);
  border-radius: 10px;
  padding: 2rem;
  z-index: 20000;

  @media screen and (max-width: 838px) {
    width: calc(100vw - 70px);
  }

  @media screen and (max-width: 650px) {
    padding: 1rem;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Video = styled.iframe`
  width: 100%;
  height: calc(100vw / 2.16);
  max-height: 50%;
  border: 0;
  padding: 0;

  @media screen and (max-width: 838px) {
    height: calc(100vw / 2.16);
  }
`

const ProjectContainer = styled.div`
  bottom: 0;
  left: 0;
  padding-left: 1rem;
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 5fr 1fr;
  @media screen and (max-width: 650px) {
    padding-left: 0.5rem;
  }
`
const ProjectInfo = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`

const Heading = styled.h1`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  @media screen and (max-width: 650px) {
    margin-bottom: 0.5rem;
    margin-top: 0rem;
  }
`
const Description = styled.p`
  font-size: clamp(0.7rem, 2.2vw, 0.8rem);
  & > p {
    margin-bottom: 0.75em;
  }
`
const TechnologyContainer = styled.div`
  padding-top: 35px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TechnologyList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  font-weight: 600;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
`

const Underline = styled.hr`
  border: 0;
  border-top: 1px solid black;
  width: 100%;
  border-radius: 20px;
`

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 135px;
  height: 45px;
  background-color: var(--main-pink);
  border-radius: 50px;

  & > h1 {
    font-size: 0.75rem;
    font-weight: 600;
    padding-right: 5px;
    padding-left: 1px;
    color: var(--very-dark-grey);
  }
`

const GhLogo = styled(GitHubLogo)`
  color: var(--very-dark-grey);
  height: 28px;
`

export default ModalWindow
