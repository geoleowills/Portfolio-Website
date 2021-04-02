import React from "react"
import JavaSvg from "../assets/svgs/java.svg"
import PythonSvg from "../assets/svgs/python.svg"

const width = 90
const height = 90

export const FutureSkillsData = [
  {
    icon: <JavaSvg height={height} width={width} />,
    name: "Java",
  },
  {
    icon: <PythonSvg height={height} width={width} />,
    name: "Python",
  },
]
