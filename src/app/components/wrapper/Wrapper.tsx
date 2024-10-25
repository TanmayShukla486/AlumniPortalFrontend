import React, { PropsWithChildren, ReactElement } from "react"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-auto">
        <div className="flex-col">
          <div className="flex-1">
            <Navbar />
          </div>
          <div className="flex-auto h-full">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper
