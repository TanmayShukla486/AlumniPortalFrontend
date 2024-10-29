import { Card } from "@mui/material"
import React from "react"

const GeneralDesc = () => {
  return (
    <div className="h-3/4 w-full">
      <div className="w-full h-full bg-gradient-to-br from-bg-light to-bg-dark shadow-custom border-4 border-white rounded-xl">
        <div className="bg-gradient-to-b from from-white to-content-light bg-clip-text p-8 flex flex-col items-center justify-center">
          <div className="text-3xl text-transparent">
            Welcome to the College Alumni Portal!
          </div>
          <div className="text-xl text-transparent mt-8 text-justify leading-loose">
            Reconnect, engage, and thrive in our vibrant community designed for
            students and alumni alike. This platform serves as a bridge between
            past and present, fostering relationships that extend beyond
            graduation. Explore a wealth of resources tailored just for
            you—whether you're looking to share your journey through blogs,
            connect with fellow alumni, or seek mentorship opportunities. Our
            user-friendly interface allows you to effortlessly navigate through
            posts, discover events, and participate in discussions that matter
            to you. Students can interact with alumni for guidance and
            inspiration, while alumni can share their experiences and insights,
            helping the next generation achieve their goals. Join us in
            celebrating our shared history and building a brighter future
            together. Your story matters—let’s connect!
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralDesc
