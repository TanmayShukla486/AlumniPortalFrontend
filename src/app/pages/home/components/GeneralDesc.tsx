import { Card } from "@mui/material"
import React from "react"

const GeneralDesc = () => {
  return (
    <Card
      className="h-[calc(100%-10rem)] w-[calc(100%+12rem)]"
      sx={{
        borderRadius: "14px",
        border: "solid 4px white",
      }}
      raised={true}
    >
      <div className="w-full h-full bg-gradient-to-br from-bg-primary to-primary-dark"></div>
    </Card>
  )
}

export default GeneralDesc
