import { Card } from "@mui/material"
import React, { PropsWithChildren } from "react"

const CompanyBox: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="inset-12 shadow-custom-inset z-10 bg-gradient-to-br from-bg-light to-bg-dark min-h-full overflow-auto hide-scrollbar rounded-[25px] border-4 border-white flex flex-col p-4 gap-y-2">
      {children}
    </div>
  )
}

export default CompanyBox
