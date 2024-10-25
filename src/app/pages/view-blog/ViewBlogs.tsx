import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import BlogDisplayCompact from "../../components/reusable/blog-display-compact"
import CustomInput from "../register/components/input-field"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  fetchBlogs,
  selectList,
  selectListStatus,
} from "../../../features/blogs/blogListSlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import { CircularProgress } from "@mui/material"

const ViewBlogs = () => {
  const [search, setSearch] = useState<string>("")
  const dispatch = useAppDispatch()
  const blogList = useAppSelector(selectList)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const blogListStatus = useAppSelector(selectListStatus)
  useEffect(() => {
    dispatch(
      fetchBlogs({
        token,
        refreshToken,
      }),
    )
  }, [])
  return (
    <Wrapper>
      <div className="flex flex-col ml-40">
        <div className="w-[calc(100vw-32rem)] mt-2 ml-40 h-12 bg-gradient-to-br from-bg-primary to-primary-dark rounded-xl bor border-4 border-primary-dark">
          {/*TODO:*/}
        </div>
        <div className="w-[calc(100vw-32rem)] h-[calc(100vh-12rem)] mt-4 p-8 border-4 border-primary-dark overflow-scroll grid grid-cols-3 gap-4 hide-scrollbar ml-40 -mr-44 bg-white rounded-xl shadow-custom-inset">
          {(blogListStatus === "LOADING" || blogListStatus === "ERROR") && (
            <div className="h-full w-full flex flex-col space-y-8 justify-center items-center ml-80">
              <div className="text-4xl font-extrabold text-transparent p-2 bg-clip-text bg-gradient-to-br from-orange-300 to-orange-800">
                Loading
              </div>
              <CircularProgress
                sx={{
                  color: "orangered",
                }}
              />
            </div>
          )}
          {blogListStatus === "IDLE" &&
            blogList.map(blog => (
              <div className="h-fit">
                <BlogDisplayCompact blog={blog} />
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default ViewBlogs
