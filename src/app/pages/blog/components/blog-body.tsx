import {
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  SvgIcon,
  TextField,
} from "@mui/material"
import React, { useEffect } from "react"
import CustomInput from "../../register/components/input-field"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import CustomButton from "../../../components/reusable/custom-button"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  getBlog,
  likeBlog,
  selectBlog,
  selectBlogLikes,
  selectBlogStatus,
} from "../../../../features/blogs/blogSlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../../features/user/userSlice"
import { useParams } from "react-router-dom"

const BlogBody = ({ id }: { id: string }) => {
  const blog = useAppSelector(selectBlog)
  const likes = useAppSelector(selectBlogLikes)
  const blogStatus = useAppSelector(selectBlogStatus)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const dispatch = useAppDispatch()
  const handleLike = () => {
    if (!blog?.id) return
    dispatch(
      likeBlog({
        id: blog?.id,
        token,
        refreshToken,
      }),
    )
  }
  useEffect(() => {
    dispatch(
      getBlog({
        id: parseInt(id),
        token,
        refreshToken,
      }),
    )
  }, [])
  return (
    <div className="w-full pr-4 text-justify h-full">
      {blogStatus === "IDLE" && (
        <div>
          <div className="text-content-dark text-4xl font-extrabold">
            {blog?.title}
          </div>
          <div className="px-2 bg-slate-600 w-40 flex flex-row items-center justify-center rounded-full text-white mt-2 py-1">
            {blog?.category}
          </div>
          <Divider
            variant="fullWidth"
            sx={{
              borderColor: "white",
              marginTop: "8px",
            }}
          />
          <div className="blog-item mt-2 text-transparent bg-gradient-to-b from-white to-slate-300 text-xl bg-clip-text">
            {blog?.content}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogBody
