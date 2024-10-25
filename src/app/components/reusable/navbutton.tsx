import React from "react"
import { ButtonItemProps } from "./siderbar-item"
import { Card, SvgIcon } from "@mui/material"

const NavButton = ({ Icon, title, href }: ButtonItemProps) => {
  return (
    <Card
      className="bg-transparent hover:text-white hover:bg-primary-dark h-14 w-36 flex items-center justify-start cursor-pointer"
      sx={{
        borderRadius: "14px",
        border: "solid 2px transparent",
        background: "transparent",
        boxShadow: "none",
        transition:
          "background-color 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease",
        ":hover": {
          boxShadow: "2px 2px rgb(143,76,19,0.90)",
          border: "solid 1px white",
          zIndex: "15px",
        },
      }}
      raised={false}
    >
      <div className="font-bold ml-4 space-x-2">
        <SvgIcon component={Icon} />
        <span>{title}</span>
      </div>
    </Card>
  )
}

export default NavButton
