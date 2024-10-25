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
    <Card
      className="w-full bg-bg-primary opacity-100 hover:text-white hover:bg-primary-dark h-14 text-wrap text-center text-amber-950 cursor-pointer"
      raised={true}
      sx={{
        borderRadius: "18px",
        border: "#b55e19 solid 2px",
        padding: "4px",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
        ":hover": {
          border: "2px white solid",
          zIndex: "30px",
        },
      }}
    >
      <Link to={href}>
        <div className="ml-2 space-x-4 flex justify-start items-center h-full">
          <SvgIcon component={Icon} />
          <span>{title}</span>
        </div>
      </Link>
    </Card>
  )
}

export default SidebarItem
