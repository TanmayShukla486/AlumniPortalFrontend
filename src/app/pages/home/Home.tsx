import React, { useEffect } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "./components/Event"
import GeneralDesc from "./components/GeneralDesc"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  getCompleteFollowing,
  getInitialFollowing,
} from "../../../features/following/followingSlice"
import {
  selectRefreshToken,
  selectToken,
  selectUsername,
} from "../../../features/user/userSlice"
import { fetchBlogs } from "../../../features/blogs/blogListSlice"

const Home = () => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(selectUsername) || ""
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  useEffect(() => {
    dispatch(
      fetchBlogs({
        token,
        refreshToken,
      }),
    )
    dispatch(
      getInitialFollowing({
        username,
        token,
        refreshToken,
      }),
    )
    dispatch(
      getCompleteFollowing({
        username,
        token,
        refreshToken,
      }),
    )
  }, [])

  return (
    <Wrapper>
      <div className="grid grid-cols-6 h-full mt-6 w-full">
        <div className="col-span-4 mr-12">
          <GeneralDesc />
        </div>{" "}
        <div className="col-span-2 mr-8">
          <EventBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
