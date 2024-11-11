import React, { PropsWithChildren, ReactElement } from "react"

import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../../redux/hooks"
import { selectRole, selectStatus } from "../../../../features/user/userSlice"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"

const AdminWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const userStatus = useAppSelector(selectStatus)
  const userRole = useAppSelector(selectRole)
  if (userStatus !== "LOGGEDIN" && userRole !== "ADMIN")
    return <Navigate to="/login" />

  return (
    <div className="grid grid-cols-6 gap-1 w-full h-full">
      <div className="col-span-1 text-wrap">
        <AdminSidebar />
      </div>
      <div className="col-span-5">
        <div className="flex flex-col">
          <div className="flex-1">
            <AdminNavbar />
          </div>
          <div className="flex-auto mt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminWrapper
