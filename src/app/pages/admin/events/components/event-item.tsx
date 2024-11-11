import { IconButton, SvgIcon } from "@mui/material"
import React from "react"
import DeleteIcon from "@mui/icons-material/Delete"

export interface AdminEventItemProps {
  id: number
  title: string
  date: string
  handleDelete: (id: number) => void
}

const EventItemAdmin = ({
  title,
  id,
  date,
  handleDelete,
}: AdminEventItemProps) => {
  return (
    <div className="w-full h-16 flex justify-between bg-gradient-to-r from-content-dark to-content-light my-2 px-4 py-1 items-center rounded-2xl">
      <div>{title}</div>
      <div>{date}</div>
      <div className="text-white">
        <IconButton onClick={() => handleDelete(id)}>
          <SvgIcon component={DeleteIcon} />
        </IconButton>
      </div>
    </div>
  )
}

export default EventItemAdmin
