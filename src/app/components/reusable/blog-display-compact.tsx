import React from "react"
import { Blog } from "../../../features/blogs/blogSlice"
import { Card, Divider, SvgIcon } from "@mui/material"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import { Link } from "react-router-dom"
export interface BlogDisplayCompactProps {
  blog: Blog
}

// { blog }: BlogDisplayCompactProps

const BlogDisplayCompact = ({ blog }: BlogDisplayCompactProps) => {
  return (
    <Link to={`/feed/${blog.id}`} className="w-full h-max">
      <div className="w-full h-full blog-item rounded-xl hover:bg-content-dark p-4 hover:border-1 hover:border-white">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-800 bg-clip-text">
          <span className="text-transparent">{blog.title}</span>
        </div>
        <div className="w-fit px-4 rounded-full bg-slate-500 text-sm py-1">
          {blog.category}
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
        <div className="text-wrap h-fit leading-relaxed text-sm pt-2">
          {blog.content}
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
        <div className="flex flex-row justify-between items-center pt-4">
          <div className="flex flex-row justify-between items-center space-x-8">
            <div className="flex flex-row bg-gradient-to-r from-bg-content-light/100 to-content-light border-2 border-white px-4 rounded-full py-1 space-x-2">
              <SvgIcon component={ThumbUpOffAltIcon} />
              <div>{blog.likes}</div>
            </div>
            <div className="flex flex-row bg-gradient-to-r from-bg-content-light/100 to-content-light border-2 border-white px-4 rounded-full py-1 space-x-2">
              <SvgIcon component={ChatBubbleOutlineIcon} />
              <div>123</div>
            </div>
          </div>

          <div className="flex flex-row bg-gradient-to-r from-bg-content-light/100 to-content-light border-2 border-white px-4 rounded-full py-1 space-x-2 font-bold">
            @{blog.author}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogDisplayCompact
