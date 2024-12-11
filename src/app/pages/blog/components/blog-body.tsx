import {
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  SvgIcon,
  TextField,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CustomInput from "../../register/components/input-field"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import CustomButton from "../../../components/reusable/custom-button"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  getBlog,
  likeBlog,
  removeBlog,
  selectBlog,
  selectBlogLikes,
  selectBlogStatus,
} from "../../../../features/blogs/blogSlice"
import {
  selectRefreshToken,
  selectRole,
  selectToken,
  selectUsername,
} from "../../../../features/user/userSlice"
import { Navigate, useParams } from "react-router-dom"
import { Like } from "../../../../features/blogs/commentSlice"
import { ConfigType } from "../../../../features/profile/profileSlice"
import axios from "axios"

const BlogBody = ({ id }: { id: string }) => {
  const role = useAppSelector(selectRole)
  const blog = useAppSelector(selectBlog)
  const username = useAppSelector(selectUsername)
  const [blogLikes, setBlogLikes] = useState<Like[]>([])
  const [redirect, setRedirect] = useState<boolean>(false)
  const blogStatus = useAppSelector(selectBlogStatus)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const config: ConfigType = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      RefreshToken: refreshToken,
      Authorization: `Bearer ${token}`,
    },
  }
  const dispatch = useAppDispatch()
  const addBlogLike = async () => {
    try {
      const like: Like = {
        id: 0,
        username: username || "",
      }
      const response = await axios.post(`/api/likes/blog/${id}`, "", config)
      setBlogLikes(state => [...state, response.data])
    } catch (error) {
      console.log(error)
    }
  }
  const removeBlogLike = async (id: number) => {
    try {
      const response = await axios.delete(
        `/api/likes?id=${id}&type=BLOG`,
        config,
      )
      setBlogLikes(state => state.filter(it => it.id !== response.data.id))
    } catch (error) {
      console.log(error)
    }
  }
  const handleBlogLike = () => {
    if (!blog?.id) return
    const like = blogLikes.find(it => it.username === username)
    if (like) removeBlogLike(like.id)
    else addBlogLike()
  }
  const handleDelete = () => {
    if (!id) return
    dispatch(removeBlog({ token, id: parseInt(id) }))
    setRedirect(true)
  }
  useEffect(() => {
    dispatch(
      getBlog({
        id: parseInt(id),
        token,
        refreshToken,
      }),
    )
    const fetchBlogLikes = async () => {
      try {
        const response = await axios.get(`/api/likes/blog?id=${id}`, config)
        setBlogLikes(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogLikes()
  }, [])
  return (
    <div className="w-full pr-4 text-justify h-full">
      {blogStatus === "IDLE" && (
        <div>
          {redirect && <Navigate to={"/feed"} />}
          <div className="flex flex-row items-center justify-end w-full">
            <div className="text-content-dark text-4xl font-extrabold w-full">
              {blog?.title}
            </div>
            {(role === "ADMIN" || username === blog?.author) && (
              <div className="place-self-end">
                <IconButton onClick={handleDelete}>
                  <SvgIcon component={DeleteIcon} />
                </IconButton>
              </div>
            )}
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
          <div className="flex flex-row w-full items-center justify-start px-4">
            <div
              className="flex items-center flex-row justify-center px-4 mt-2 bg-content-dark text-sm py-1 space-x-2 rounded-full cursor-pointer"
              onClick={handleBlogLike}
            >
              <SvgIcon
                component={ThumbUpIcon}
                fontSize="small"
                sx={{ color: "white" }}
              />
              <div className="text-white">{blogLikes.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogBody
