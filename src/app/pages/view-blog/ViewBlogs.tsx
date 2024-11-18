import React, { useEffect, useState } from "react"
import BlogDisplayCompact from "../../components/reusable/blog-display-compact"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  fetchBlogs,
  fetchBlogsWithCategory,
  selectList,
  selectListError,
  selectListStatus,
} from "../../../features/blogs/blogListSlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import {
  Alert,
  CircularProgress,
  Divider,
  Skeleton,
  Snackbar,
} from "@mui/material"
import Wrapper2 from "../../components/wrapper/Wrapper2"
import EmptyBlock from "../../components/reusable/empty-block"
import { Link, useSearchParams } from "react-router-dom"

const ViewBlogs = () => {
  const dispatch = useAppDispatch()
  const [params] = useSearchParams()
  const [open, setOpen] = useState<boolean>(true)
  const category = params.get("category") || ""
  const blogList = useAppSelector(selectList)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const blogListStatus = useAppSelector(selectListStatus)
  const errorMessage = useAppSelector(selectListError)
  const revertBack = () => {
    dispatch(
      fetchBlogs({
        token,
        refreshToken,
      }),
    )
  }

  useEffect(() => {
    if (category === "") dispatch(fetchBlogs({ token, refreshToken }))
    else {
      dispatch(
        fetchBlogsWithCategory({
          category,
          token,
        }),
      )
    }
  }, [params])

  return (
    <Wrapper2>
      <div className="h-[92vh] overflow-scroll hide-scrollbar">
        <div className="flex flex-col space-y-2 mt-4 h-full text-white pr-8 text-justify">
          {blogListStatus === "LOADING" && (
            <div className="flex flex-col items-start h-full w-full p-4">
              <div className="w-full -mt-16">
                <Skeleton
                  className="w-full"
                  sx={{ height: "225px", marginY: "10px" }}
                />
              </div>
              <div className="w-full -mt-16">
                <Skeleton
                  className="w-full"
                  sx={{ height: "225px", marginY: "10px" }}
                />
              </div>
              <div className="w-full -mt-16">
                <Skeleton
                  className="w-full"
                  sx={{ height: "225px", marginY: "10px" }}
                />
              </div>
            </div>
          )}
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
          {blogListStatus === "IDLE" && blogList.length === 0 && (
            <EmptyBlock
              val={"Blog Posts For Category"}
              revertBack={revertBack}
            />
          )}
        </div>
      </div>
    </Wrapper2>
  )
}

export default ViewBlogs
