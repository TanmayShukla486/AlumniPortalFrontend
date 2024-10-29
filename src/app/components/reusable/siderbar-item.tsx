import { Card, Icon, SvgIcon } from "@mui/material"

import React from "react"
import { Link } from "react-router-dom"

export interface ButtonItemProps {
  Icon: React.ElementType
  title: string
  href: string
}

const SidebarItem = ({ Icon, title, href }: ButtonItemProps) => {
  return (
    <div className="w-full h-10">
      <Link
        to={href}
        className="flex justify-start rounded-xl items-center space-x-2 color-transition hover:bg-gradient-to-br from-content-light to-content-dark hover:border-2 hover:border-white px-2 py-4"
      >
        <SvgIcon component={Icon} />
        <div>{title}</div>
      </Link>
    </div>
  )
}

export default SidebarItem
