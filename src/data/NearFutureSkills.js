import React from "react"
import AwsSvg from "../assets/svgs/aws.svg"
import DockerSvg from "../assets/svgs/docker.svg"
import MongoDbSvg from "../assets/svgs/mongodb.svg"
import JestSvg from "../assets/svgs/jest.svg"

const width = 100
const height = 100

export const NearFutureSkillsData = [
  {
    icon: <AwsSvg height={height} width={width} />,
    name: "AWS",
  },
  {
    icon: <DockerSvg height={height} width={width} />,
    name: "Docker",
  },
  {
    icon: <MongoDbSvg height={height} width={width} />,
    name: "MongoDB",
  },
  {
    icon: <JestSvg height={height} width={width} />,
    name: "Jest",
  },
]
