import React from "react"
import CssSvg from "../assets/svgs/css.svg"
import ExpressSvg from "../assets/svgs/express.svg"
import GatsbySvg from "../assets/svgs/gatsby.svg"
import GraphqlSvg from "../assets/svgs/graphql.svg"
import HtmlSvg from "../assets/svgs/html-5.svg"
import JavascriptSvg from "../assets/svgs/javascript.svg"
import NodejsSvg from "../assets/svgs/nodejs.svg"
import PostgresqlSvg from "../assets/svgs/postgresql.svg"
import ReactSvg from "../assets/svgs/reactLogo.svg"
import ContentfulSvg from "../assets/svgs/contentful.svg"
import GitSvg from "../assets/svgs/gitLogo.svg"

const width = 100
const height = 100

export const CurrentSkillsData = [
  {
    icon: <HtmlSvg height={height} width={width} />,
    name: "HTML",
  },
  {
    icon: <CssSvg height={height} width={width} />,
    name: "CSS",
  },
  {
    icon: <JavascriptSvg height={height} width={width} />,
    name: "Javascript",
  },
  {
    icon: <ReactSvg height={height} width={width} />,
    name: "React | Context API",
  },
  {
    icon: <GatsbySvg height={height} width={width} />,
    name: "Gatsby",
  },
  {
    icon: <NodejsSvg height={height} width={width} />,
    name: "NodeJS",
  },
  {
    icon: <ExpressSvg height={height} width={width} />,
    name: "Express",
  },
  {
    icon: <PostgresqlSvg height={height} width={width} />,
    name: "PostgreSQL",
  },
  {
    icon: <GraphqlSvg height={height} width={width} />,
    name: "GraphQL",
  },
  {
    icon: <ContentfulSvg height={height} width={width} />,
    name: "Contentful",
  },
  {
    icon: <GitSvg height={height} width={width} />,
    name: "Git",
  },
]
