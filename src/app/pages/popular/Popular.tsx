import React, { useEffect, useState } from "react"
import Wrapper2 from "../../components/wrapper/Wrapper2"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  fetchPopularBlogs,
  selectList,
  selectListError,
  selectListStatus,
} from "../../../features/blogs/blogListSlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import { Alert, CircularProgress, Divider, Snackbar } from "@mui/material"
import BlogDisplayCompact from "../../components/reusable/blog-display-compact"
import EmptyBlock from "../../components/reusable/empty-block"
import { Link, Navigate } from "react-router-dom"

const Popular = () => {
  const [navigate, setNavigate] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(true)
  const errorMessage = useAppSelector(selectListError)
  const blogList = useAppSelector(selectList)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const blogListStatus = useAppSelector(selectListStatus)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPopularBlogs({ token }))
  }, [])

  return (
    <Wrapper2>
      <div className="h-[92vh] overflow-scroll hide-scrollbar">
        {navigate && <Navigate to={"/feed"} />}
        <div className="flex flex-col space-y-2 mt-4 h-full text-white pr-8 text-justify">
          {blogListStatus === "LOADING" && (
            <div className="">
              <div className="">Loading</div>
              <CircularProgress
                sx={{
                  color: "",
                }}
              />
            </div>
          )}
          {blogListStatus === "IDLE" &&
            blogList.length > 0 &&
            blogList.map(blog => (
              <div className="mt-2" key={blog.id}>
                <BlogDisplayCompact blog={blog} />
                <Divider
                  variant="fullWidth"
                  sx={{
                    height: "8px",
                    width: "100%",
                    borderBottomWidth: "2px",
                    borderColor: "white",
                    opacity: "40%",
                  }}
                />
              </div>
            ))}
          {blogListStatus === "ERROR" && (
            <div>
              <div className="w-full h-full text-center mt-16 text-xl ">
                <Link to="/home">
                  <span className="bg-content-dark/60 px-4 py-2 rounded-md">
                    Error Loading Page. Go back
                  </span>
                </Link>
              </div>
              <Snackbar
                open={blogListStatus === "ERROR" && open}
                autoHideDuration={1500}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  severity="error"
                  variant="filled"
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </div>
          )}
          {blogListStatus === "IDLE" && blogList.length === 0 && (
            <EmptyBlock
              val={"Blog Posts For Category"}
              revertBack={() => setNavigate(true)}
            />
          )}
        </div>
      </div>
    </Wrapper2>
  )
}

export default Popular
