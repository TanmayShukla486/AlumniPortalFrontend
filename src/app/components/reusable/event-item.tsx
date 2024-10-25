import React, { useState } from "react"
import Divider from "@mui/material/Divider"

export interface EventItemProps {
  title: string
}

const EventItem = ({ title }: EventItemProps) => {
  return (
    <>
      <div className="h-8 mt-4">
        <div className="h-fit group shadow-inner rounded-md font-bold cursor-pointer relative bg-gradient-to-l from-primary-dark to-bg-primary rounded-">
          <div className="bg-white shadow-md h-8 flex items-center rounded-md group-hover:translate-x-12 transition-all ease-linear duration-300">
            <span className="ml-4">{title}</span>
          </div>
        </div>
      </div>
      <Divider variant={"fullWidth"} />
    </>
  )
}

export default EventItem
