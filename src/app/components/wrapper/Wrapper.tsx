import React, { PropsWithChildren, ReactElement } from "react"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import { useAppSelector } from "../../redux/hooks"
import { selectStatus } from "../../../features/user/userSlice"
import { Navigate } from "react-router-dom"

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const userStatus = useAppSelector(selectStatus)

  if (userStatus !== "LOGGEDIN") return <Navigate to="/login" />

  return (
    <div className="grid grid-cols-6 gap-1 w-full h-full">
      <div className="col-span-1 text-wrap">
        <Sidebar />
      </div>
      <div className="col-span-5">
        <div className="flex flex-col">
          <div className="flex-1">
            <Navbar />
          </div>
          <div className="flex-auto mt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper
