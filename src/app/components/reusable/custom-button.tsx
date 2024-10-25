import { Button, ButtonProps, darken, styled } from "@mui/material"
import React from "react"

export interface CustomButtonProps extends ButtonProps {
  customBgColor: string
  customColor: string
  customBorder: string
}

const CustomButton = styled(
  ({
    customBgColor,
    customColor,
    customBorder,
    ...props
  }: CustomButtonProps) => <Button {...props} />,
)(({ customBgColor, customColor, customBorder }) => ({
  backgroundColor: customBgColor || "#b55e19",
  color: customColor || "#ffffff",
  border: customBorder,
  borderRadius: "12.5px",
  padding: "8px",
  ":hover": {
    backgroundColor: customColor
      ? darken(customColor, 0.2)
      : darken("#b55e19", 0.2),
  },
}))

export default CustomButton
