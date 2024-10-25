import { Button, Card, Modal, TextField } from "@mui/material"
import React from "react"
import CustomInput from "../register/components/input-field"
import CustomButton from "../../components/reusable/custom-button"
import Wrapper from "../../components/wrapper/Wrapper"
import BlogBody from "./components/blog-body"
import CommentBox from "./components/comment-box"

const Blog = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-3 gap-2 h-[calc(100%-4rem)] mr-8 mt-4">
        <div className="col-span-2 min-h-full">
          <BlogBody />
        </div>
        <div className="col-span-1 h-full max-h-full w-full overflow-x-auto overflow-y-scroll hide-scrollbar">
          <CommentBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Blog
