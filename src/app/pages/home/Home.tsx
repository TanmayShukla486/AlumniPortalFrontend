import React from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "./components/Event"
import GeneralDesc from "./components/GeneralDesc"

const Home = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-6 h-full mt-6 w-full">
        <div className="col-span-4 mr-12">
          <GeneralDesc />
        </div>{" "}
        <div className="col-span-2 mr-8">
          <EventBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
