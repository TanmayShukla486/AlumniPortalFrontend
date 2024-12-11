import React from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import { Divider } from "@mui/material"

interface Details {
  image: string
  name: string
  department: string
  batch: string
  email: string
  linkedin: string
}

const peopleDetails: Details[] = [
  {
    image: "/tanmay.jpg",
    name: "Tanmay Shukla",
    department: "Computer Engineering",
    batch: "2025 Batch",
    email: "tanmay.shukla7170@gmail.com",
    linkedin: "https://www.linkedin.com/in/tanmay-shukla-a76764226",
  },
  {
    image: "/umang.jpeg",
    name: "Umang Gupta",
    department: "Computer Engineering",
    batch: "2025 Batch",
    email: "umangg307@gmail.com",
    linkedin: "",
  },
  {
    image: "/sanjog.JPG",
    name: "Sanjog Singh Bhatia",
    department: "Computer Engineering",
    batch: "2025 Batch",
    email: "sanjogsinghbhatia2003@gmail.com",
    linkedin: "https://www.linkedin.com/in/sanjog-bhatia-22b347225/",
  },
]

export const DetailElement = ({ detail }: { detail: Details }) => {
  return (
    <div className="col-span-3 shadow-custom h-full flex flex-col p-4 justify-around items-center rounded-md bg-content-dark/20 border-4 border-content-dark">
      <div className="w-32 rounded-full h-36 border-2 border-content-dark content-clip">
        <img
          src={detail.image}
          alt="pfp"
          className="h-full w-full rounded-full bg-clip-border"
        />
      </div>
      <div className="text-white text-2xl">{detail.name}</div>
      <div className=" bg-content-dark/60 w-full text-center py-2 rounded-md border-2 border-content-dark shadow-custom-inset text-xl opacity-50 ">
        <span className="px-4 text-white ">{detail.department}</span>
      </div>
      <div className=" bg-content-dark/60 w-full text-center py-2 rounded-md border-2 border-content-dark shadow-custom-inset text-xl opacity-50 ">
        <span className="px-4 text-white ">{detail.batch}</span>
      </div>
      <div className=" bg-content-dark/60 w-full text-center py-2 rounded-md border-2 border-content-dark shadow-custom-inset text-xl opacity-50 ">
        <span className="px-4 text-white ">{detail.email}</span>
      </div>
      <a
        className=" bg-content-dark/60 w-full text-center py-2 rounded-md border-2 border-content-dark shadow-custom-inset text-xl opacity-50 "
        href={detail.linkedin}
        target="_blank"
      >
        <span className="px-4 text-white ">LinkedIn</span>
      </a>
    </div>
  )
}

const Contact = () => {
  return (
    <Wrapper>
      <div className="w-full h-[84.5vh] px-8 py-6">
        <div className="text-xl font-bold w-full text-center">
          Developer Team
        </div>
        <div className="bg-gradient-to-b from-content-light/60 to-white h-full w-full border-2 border-content-dark rounded-md grid grid-cols-9 gap-x-4 p-4">
          {peopleDetails.map((item, index) => (
            <DetailElement detail={item} key={index} />
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default Contact
