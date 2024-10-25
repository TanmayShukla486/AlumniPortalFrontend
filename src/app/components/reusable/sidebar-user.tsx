import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectRole, selectUsername } from "../../../features/user/userSlice"
import PersonIcon from "@mui/icons-material/Person"
import SvgIcon from "@mui/icons-material/Person"

const SidebarUser = () => {
  const username = useAppSelector(selectUsername) || "TanmayShukla497"

  return (
    <div className="w-full flex space-x-6 justify-start rounded-2xl items-center bg-bg-primary opacity-100 hover:text-white hover:bg-primary-dark h-14 text-wrap text-center text-amber-950 font-bold cursor-pointer">
      <SvgIcon component={PersonIcon} className="ml-8" />
      <span>{username}</span>
    </div>
  )
}

export default SidebarUser
