import React from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import { Divider } from "@mui/material"

interface Details {
  image: string
  name: string
  department: string
  bio: string
}

const details: Details[] = [
  {
    image: "/tanmay.jpg",
    name: "Tanmay Shukla",
    department: "Computer Engineering",
    bio: "I am a passionate and dedicated software developer with a strong interest in backend development. Currently pursuing my Bachelor's degree and set to graduate in May 2025, I enjoy building scalable and efficient systems that solve real-world problems.",
  },
  {
    image: "/sanjog.JPG",
    name: "Sanjog Singh Bhatia",
    department: "Computer Engineering",
    bio: "I am a passionate and dedicated software developer with a strong interest in backend development. Currently pursuing my Bachelor's degree and set to graduate in May 2025, I enjoy building scalable and efficient systems that solve real-world problems.",
  },
  {
    image: "/sanjog.JPG",
    name: "Umang Gupta",
    department: "Computer Engineering",
    bio: "I am a passionate and dedicated software developer with a strong interest in backend development. Currently pursuing my Bachelor's degree and set to graduate in May 2025, I enjoy building scalable and efficient systems that solve real-world problems.",
  },
]

export const AboutElement = ({ detail }: { detail: Details }) => {
  return (
    <div className="row-span-3 shadow-custom h-full p-4 flex flex-row items-center justify-start rounded-md bg-content-dark/20 border-4 border-content-dark space-x-8">
      <div className="w-32 rounded-full h-36 border-2 border-content-dark content-clip">
        <img
          src={detail.image}
          alt="pfp"
          className="h-full w-full rounded-full bg-clip-border"
        />
      </div>
      <div className="w-[80%]">
        <div className="flex flex-col items-start justify-between -mt-4">
          <div className="text-2xl text-content-dark">{detail.name}</div>
          <div className="text-sm opacity-50">{detail.department}</div>
        </div>
        <Divider sx={{ borderColor: "#052238", width: "250px" }} />
        <div className=" ">
          <span className="text-lg text-content-dark opacity-90">
            {detail.bio}
          </span>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <Wrapper>
      <div className="w-full h-[84.5vh] px-8 py-6">
        <div className="bg-gradient-to-b from-content-light/60 to-white h-full w-full border-2 border-content-dark rounded-md grid grid-rows-9 gap-y-4 p-4">
          {details.map(item => (
            <AboutElement detail={item} />
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default About
