import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  darken,
  Input,
  Modal,
  SvgIcon,
  TextField,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import React, { useEffect, useState } from "react"
import CustomInput from "../../pages/register/components/input-field"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import Paper from "@mui/material/Paper"
import MenuList from "@mui/material/MenuList"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import SendIcon from "@mui/icons-material/Send"

import {
  Category,
  fetchCategories,
  selectCategories,
  selectCategoriesStatus,
} from "../../../features/categories/categorySlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import CategoryItem from "./category-item"
import {
  Blog,
  postBlog,
  resetBlogStatus,
  selectBlogStatus,
} from "../../../features/blogs/blogSlice"
import CustomButton from "../reusable/custom-button"

const MarkdownEditor = ({ category }: { category: string }) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const categoryStatus = useAppSelector(selectCategoriesStatus)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  useEffect(() => {
    if (categoryStatus === "EMPTY") dispatch(fetchCategories(token))
  }, [])

  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [categoriesVisible, setCategoriesVisible] = useState<boolean>(false)
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false)
  const blogStatus = useAppSelector(selectBlogStatus)

  const handleSubmit = () => {
    if (category === "" || !category) return
    const blog: Blog = {
      id: 0,
      title,
      category,
      color: "trans",
      content,
      author: "",
      likes: 0,
      commentsEnabled,
      commentCount: 0,
    }
    dispatch(
      postBlog({
        token,
        refreshToken,
        blog,
      }),
    )
  }

  const handleClearClick = () => {
    dispatch(resetBlogStatus())
    setTitle("")
    setContent("")
    setCommentsEnabled(false)
  }

  return (
    <div className="w-full h-full">
      <Modal className="fixed" open={blogStatus === "POSTED"}>
        <div className="w-1/2 h-1/2 bg-primary-dark opacity-50">
          <div className="text-2xl text-white font-bold">
            Successfully posted
          </div>
          <Button startIcon={<CloseIcon />} onClick={handleClearClick}>
            Close
          </Button>
        </div>
      </Modal>
      <div className="w-full h-full">
        <div className="text-4xl font-extrabold bg-gradient-to-br from-content-dark to-bg-dark bg-clip-text text-transparent h-12 ml-2">
          Create Blog Post
        </div>
        <div className="w-full flex flex-col justify-start gap-y-4 p-4 rounded-xl">
          <div className="rounded-xl ml-2">
            <div className="text-xl">Title</div>
            <Input
              title="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter a title for the post"
              className="w-1/2"
              sx={{
                color: "white",
              }}
            />
          </div>
          <div className="= w-full bg-clip-content rounded-md ">
            <TextField
              className="w-full h-full p-4"
              size="medium"
              rows={12}
              value={content}
              placeholder="Type your content here"
              multiline
              onChange={e => setContent(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  color: "white", // Text color
                  borderRadius: "6px",
                },
                "& label.Mui-focused": {
                  color: "#0f0f0f",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0f0f0f",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0f0f0f",
                  },
                },
              }}
            />
          </div>
          <div className="flex justify-between w-full pr-2">
            <div className="flex  flex-row items-center bg-content-dark text-white pl-4 pr-3 rounded-full border-2 border-white">
              <div>Comments Enabled</div>
              <Checkbox
                sx={{
                  color: "white",
                }}
                value={commentsEnabled}
                onChange={() => setCommentsEnabled(!commentsEnabled)}
              />
            </div>
            <button
              className="mr-4 text-white bg-content-dark px-4 flex flex-row items-center justify-center space-x-1 border-2 border-white rounded-full transition-all shadow-default hover:-translate-x-0.5 hover:-translate-y-0.5 duration-300 ease-in-out"
              onClick={handleSubmit}
            >
              <div>Submit</div>
              <SvgIcon component={SendIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor
