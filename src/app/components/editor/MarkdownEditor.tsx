import {
  Alert,
  Checkbox,
  Input,
  Snackbar,
  SvgIcon,
  TextField,
} from "@mui/material"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

import SendIcon from "@mui/icons-material/Send"

import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import {
  Blog,
  postBlog,
  resetBlogStatus,
  selectBlogError,
  selectBlogStatus,
} from "../../../features/blogs/blogSlice"

const MarkdownEditor = ({ category }: { category: string }) => {
  const dispatch = useAppDispatch()
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const errorMessage = useAppSelector(selectBlogError)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false)
  const blogStatus = useAppSelector(selectBlogStatus)
  const [categoryToast, setCategoryToast] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(true)
  const handleSubmit = () => {
    if (category === "" || !category) {
      setCategoryToast(true)
      return
    }
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
      alreadyLiked: false,
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
      <Snackbar
        open={categoryToast}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          className="cursor-pointer"
          onClick={() => setCategoryToast(!categoryToast)}
        >
          Select a Category!!
        </Alert>
      </Snackbar>
      <Snackbar
        open={blogStatus === "ERROR" && open}
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
      <Snackbar
        open={blogStatus === "POSTED"}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          className="cursor-pointer"
          onClick={() => {
            handleClearClick()
            dispatch(resetBlogStatus())
          }}
        >
          Blog Posted Successfully
        </Alert>
      </Snackbar>
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
