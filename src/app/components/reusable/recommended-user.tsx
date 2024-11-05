import { SvgIcon } from "@mui/material"
import { Link } from "react-router-dom"
import { ButtonItemProps } from "./user-item"

const RecommendedUser = ({ Icon, username, href }: ButtonItemProps) => {
  return (
    <div className="w-full h-10 ">
      <Link
        to={href}
        className="flex justify-start rounded-xl hover:bg-slate-700 items-center space-x-2 color-transition px-2 py-2"
      >
        <SvgIcon component={Icon} />
        <div>{username}</div>
      </Link>
    </div>
  )
}

export default RecommendedUser
