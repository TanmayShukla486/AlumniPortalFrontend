import React from "react"
import { Link } from "react-router-dom"

export interface TagProps {
  username: string
}

const UserTag = ({ username }: TagProps) => {
  return <Link to={`/user/${username}`}>{username}</Link>
}

export default UserTag
