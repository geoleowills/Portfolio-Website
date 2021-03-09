import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import GitHubLogo from "../assets/svgs/gitHubLogo.svg"
import { Context } from "../Context"
import CloseIcon from "../assets/svgs/closeIcon.svg"

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
      <VideoContainer>
        <IconContainer>
          <Icon onClick={switchModalDisplay} />
        </IconContainer>

        <Video
          src={videoUrl}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></Video>
      </VideoContainer>
      {/* <ModalContent>
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
      </ModalContent> */}
    </MainContainer>
  )
}

const MainContainer = styled.div`
  transition: 0.4s;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
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

const Video = styled.iframe`
  width: 100%;
  height: calc(100vw / 1.8);
  border: 0;
  padding: 0;
`

const Underline = styled.hr`
  border: 0;
  border-top: 1px solid black;
  width: 100%;
  border-radius: 20px;
`

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 60vw;
  max-height: calc(60vw / 1.65);
  z-index: 110000000;
  display: flex;
  margin-top: -50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1400px) {
    max-width: 70vw;
    max-height: calc(70vw / 1.65);
  }

  @media screen and (max-width: 1000px) {
    max-width: 80vw;
    max-height: calc(80vw / 1.65);
  }

  @media screen and (max-width: 800px) {
    max-width: 90vw;
    max-height: calc(90vw / 1.65);
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
    max-height: calc(100vw / 1.5);
  }
`

const Icon = styled(CloseIcon)`
  color: white;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`

export default ModalWindow
