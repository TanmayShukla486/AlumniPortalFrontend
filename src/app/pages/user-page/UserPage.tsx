import React from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import { useParams } from "react-router-dom"

const UserPage = () => {
  const { username } = useParams()
  return <Wrapper>{username}</Wrapper>
}

export default UserPage
