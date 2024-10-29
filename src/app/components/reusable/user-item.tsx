import { Card, Icon, SvgIcon } from "@mui/material"

import React from "react"
import { Link } from "react-router-dom"

export interface ButtonItemProps {
  Icon: React.ElementType
  username: string
  href: string
}

const UserItem = ({ Icon, username, href }: ButtonItemProps) => {
  return (
    <div className="w-full h-10">
      <Link
        to={href}
        className="flex justify-start rounded-xl items-center space-x-2 color-transition hover:bg-bg-light px-2 py-4"
      >
        <SvgIcon component={Icon} />
        <div>{username}</div>
      </Link>
    </div>
  )
}

export default UserItem
