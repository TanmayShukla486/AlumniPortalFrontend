import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectRole, selectUsername } from "../../../features/user/userSlice"
import PersonIcon from "@mui/icons-material/Person"
import SvgIcon from "@mui/icons-material/Person"

const SidebarUser = () => {
  const username = useAppSelector(selectUsername) || "TanmayShukla497"

  return (
    <div className="w-full flex mt-4 space-x-6 justify-start rounded-2xl items-center bg-gradient-to-b from-content-dark to-content-light hover:bg-gradient-to-tr hover:opacity-100 transition-all duration-300 ease-in-out opacity-50 h-14 text-wrap text-center text-white font-bold cursor-pointer">
      <SvgIcon component={PersonIcon} className="ml-8" />
      <span>{username}</span>
    </div>
  )
}

export default SidebarUser
