import React, { useState } from "react"
import Divider from "@mui/material/Divider"
import { Link } from "react-router-dom"

export interface EventItemProps {
  title: string
}

const EventItem = ({ title }: EventItemProps) => {
  return (
    <>
      <div className="h-8 mt-4">
        <Link to="/events">
          <div className="h-fit group shadow-inner rounded-md font-bold cursor-pointer relative bg-gradient-to-l from-primary-dark to-bg-primary rounded-">
            <div className="bg-white shadow-md h-8 flex items-center rounded-md group-hover:translate-x-12 transition-all ease-linear duration-300">
              <span className="ml-4 event-item">{title}</span>
            </div>
          </div>
        </Link>
      </div>
      <Divider variant={"fullWidth"} />
    </>
  )
}

export default EventItem
