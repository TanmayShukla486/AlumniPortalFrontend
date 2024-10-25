import React from "react"
import { Blog } from "../../../features/blogs/blogSlice"
import { Card, Divider, SvgIcon } from "@mui/material"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
export interface BlogDisplayCompactProps {
  blog: Blog
}

// { blog }: BlogDisplayCompactProps

const BlogDisplayCompact = ({ blog }: BlogDisplayCompactProps) => {
  return (
    <Card
      className="w-[275px] h-[350px]"
      raised
      sx={{
        borderRadius: "12px",
        border: "solid 4px #b55e19",
        width: "100%",
        height: "100%",
        color: "white",
      }}
    >
      <div className="w-full h-full flex flex-col p-4 bg-gradient-to-br from-bg-primary to-primary-dark">
        <div className="text-xl font-extrabold overflow-clip bg-gradient-to-br from-slate-100 to-bg-primary bg-clip-text text-transparent  blog-item">
          {blog.title}
        </div>
        <Divider
          variant="fullWidth"
          sx={{
            height: "8px",
            width: "80%",
            borderBottomWidth: "2px",
            borderColor: "white",
            opacity: "40%",
          }}
        />
        <div className="blog-item mt-4 overflow-clip h-28">{blog.content}</div>
        <Divider
          variant="fullWidth"
          sx={{
            height: "8px",
            width: "80%",
            borderBottomWidth: "2px",
            borderColor: "white",
            opacity: "40%",
          }}
        />
        <div className="flex flex-row justify-between items-center h-auto mt-2">
          <div className="flex flex-row items-center justify-center space-x-2">
            <div className="flex flex-row items-center justify-center">
              <SvgIcon component={ThumbUpOffAltIcon} />
              <div>{blog.likes}</div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <SvgIcon component={ChatBubbleOutlineIcon} />
              <div>123</div>
            </div>
          </div>

          <div>By: {blog.author}</div>
        </div>
      </div>
    </Card>
  )
}

export default BlogDisplayCompact
