import React from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "./components/Event"
import GeneralDesc from "./components/GeneralDesc"

const Home = () => {
  return (
    <Wrapper>
      <div className="flex min-h-[80vh] mt-6 w-full">
        <div className="flex-auto">
          <GeneralDesc />
        </div>{" "}
        <div className="flex-1 pl-60 pr-16">
          <EventBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
