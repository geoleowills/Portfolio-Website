import React, { useEffect, useContext, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Aos from "aos"
import "aos/dist/aos.css"
import { Context } from "../Context"
import ModalWindow from "./ModalWindow"
import CodingIcon from "../assets/svgs/codingIcon.svg"

const Projects = () => {
  const { isToggled } = useContext(Context)
  const { modalDisplay, setModalDisplay, setSelectedModal } = useContext(
    Context
  )
  const [videoUrl, setVideoUrl] = useState(null)
  const [heading, setHeading] = useState(null)
  const [description, setDescription] = useState(null)
  const [technologies, setTechnologies] = useState([])
  const [gitLink, setGitLink] = useState(null)

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
  // useEffect(() => {
  //   cardData.allContentfulModalWindow.edges.forEach(data => {
  //     if (id === data.node.projectid) {
  //       setVideoUrl(
  //         `https://player.vimeo.com/video/${data.node.videoId}?loop=1&title=0&byline=0&portrait=0`
  //       )
  //       setHeading(data.node.heading)
  //       setDescription(renderRichText(data.node.description))

  //       const technologiesList = data.node.technologiesUsed.map(
  //         (tech, index) => (
  //           <React.Fragment>
  //             <li>{tech}</li>
  //             {data.node.technologiesUsed.length != index + 1 ? (
  //               <Underline />
  //             ) : (
  //               <span
  //                 css={`
  //                   display: none;
  //                 `}
  //               ></span>
  //             )}
  //           </React.Fragment>
  //         )
  //       )
  //       setTechnologies(technologiesList)
  //       setGitLink(data.node.githubLink)
  //     }
  //   })
  // }, [])

  const handleModalClick = e => {
    setSelectedModal(e.target.id)
    switchModalDisplay()
  }

  function getProjects(cardData) {
    const projectArray = []
    cardData.allContentfulModalWindow.edges.forEach((item, index) => {
      projectArray.push(
        <ProjectCard
          key={index}
          data-aos="fade-left"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          <ProjectImg
            alt={item.node.title}
            fluid={item.node.coverPhoto.fluid}
          />

          <CardTitle>{item.node.heading}</CardTitle>
          <Button id={index} onClick={handleModalClick}>
            ▶ Video
          </Button>
          <CardDescription>
            {renderRichText(item.node.description)}{" "}
            <TechnologiesList>
              {item.node.technologiesUsed.map((tech, index) => (
                <React.Fragment>
                  <li>{tech}</li>
                  {/* {item.node.technologiesUsed.length !== index + 1 ? (
                  <Underline />
                ) : (
                  <span
                    css={`
                      display: none;
                    `}
                  ></span>
                )} */}
                </React.Fragment>
              ))}
            </TechnologiesList>
          </CardDescription>
        </ProjectCard>
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
          data-aos-delay="50"
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
  height: 700px;
  background-color: var(--main-pink);
  color: var(--very-light-grey);
  border-radius: 10px;
  transition: 0.2s ease;
`
const ProjectImg = styled(Img)`
  height: 40%;
  max-width: 100%;
  border-radius: 10px;
  filter: brightness(70%);
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    filter: brightness(100%);
  }
`

const CardTitle = styled.h1`
  display: flex;
  position: absolute;
  top: 20px;
  left: 25px;
  font-weight: 600;
  font-size: 1.6rem;
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100px;
  height: 42px;
  background-color: var(--main-pink);
  top: 220px;
  left: 17px;
  border-radius: 100px;
  cursor: pointer;

  & > p {
  }
`
const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 400;
  padding-top: 5px;
  padding-left: 9px;
  padding-right: 5px;

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
    margin-left: 1rem;
  }
`

const TechnologiesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`
