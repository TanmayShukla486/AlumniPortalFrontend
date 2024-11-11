import { Divider } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

export interface TagProps {
  username: string
}

const UserTag = ({ username }: TagProps) => {
  return (
    <Link to={`/user/${username}`} className="font-bold text-lg">
      @{username}
    </Link>
  )
}

export default UserTag
