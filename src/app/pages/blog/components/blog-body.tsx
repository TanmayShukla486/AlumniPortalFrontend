import {
  Button,
  Card,
  IconButton,
  Modal,
  SvgIcon,
  TextField,
} from "@mui/material"
import React from "react"
import CustomInput from "../../register/components/input-field"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import CustomButton from "../../../components/reusable/custom-button"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  likeBlog,
  selectBlog,
  selectBlogLikes,
} from "../../../../features/blogs/blogSlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../../features/user/userSlice"

const BlogBody = () => {
  const blog = useAppSelector(selectBlog)
  const likes = useAppSelector(selectBlogLikes)
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
  return (
    <div className="w-full h-full">
      <Card
        className="max-w-[calc(100%-2rem)] h-[calc(100vh-9rem)] p-8 overflow-hidden"
        sx={{
          borderRadius: "25px",
        }}
        raised
      >
        <div className="text-2xl font-extrabold bg-gradient-to-br from-gradient-alt to-primary-dark bg-clip-text text-transparent mb-2">
          {blog?.title}
        </div>
        <div className="w-full h-[calc(100%-5rem)] flex flex-col justify-start gap-y-4 p-4 border-4 border-primary-dark shadow-custom-inset rounded-xl bg-gradient-to-r  from-bg-grad-start to-bg-grad-end shadow-custom">
          <div>Content</div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="text-sm  flex flex-row justify-center items-center">
            <IconButton onClick={handleLike}>
              <SvgIcon component={ThumbUpIcon} />
            </IconButton>
            <div className="text-sm text-gray-600">{likes}</div>
          </div>
          <div className=" ml-4 bg-gradient-to-br from-bg-primary to-primary-dark border-2 border-primary-dark w-fit rounded-xl h-8 px-4">
            CATEGORY: {blog?.category}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BlogBody

/**<TextField
            className="w-full h-full p-4"
            size="medium"
            rows={12}
            value={"CONTENT"}
            placeholder="Type your content here"
            multiline
            disabled
            sx={{
              "& .MuiInputBase-input": {
                color: "black", // Text color
                borderRadius: "6px",
              },
              "& label.Mui-focused": {
                color: "#bb5e19",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#B2BAC2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#bb5e19",
                },
              },
            }}
          /> */
