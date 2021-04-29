import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Context } from "../Context"
import CloseIcon from "../assets/svgs/closeIcon.svg"

const ModalWindow = () => {
  const { modalDisplay, switchModalDisplay, selectedModal } = useContext(
    Context
  )

  const [id, setId] = useState(selectedModal.toString())
  const [videoUrl, setVideoUrl] = useState(null)

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
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.4s;
  z-index: 8;
  overflow-x: hidden;
`

const ModalWindowContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const Video = styled.iframe`
  width: 100%;
  height: calc(100vw / 1.8);
  border: 0;
  padding: 0;
`

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 60vw;
  max-height: calc(60vw / 1.65);
  margin-top: -50px;
  z-index: 9;

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
  width: 100%;
  height: 100%;
  color: var(--very-light-grey);
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
