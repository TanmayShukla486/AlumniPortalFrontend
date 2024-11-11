import { Button, Card, Divider, Modal, TextField } from "@mui/material"
import React, { useEffect } from "react"
import CustomInput from "../register/components/input-field"
import CustomButton from "../../components/reusable/custom-button"
import Wrapper from "../../components/wrapper/Wrapper"
import BlogBody from "./components/blog-body"
import CommentBox from "./components/comment-box"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import { getBlog, selectBlog } from "../../../features/blogs/blogSlice"
import EventBox from "../home/components/Event"

const Blog = () => {
  let { id } = useParams()
  if (!id) id = "1"
  return (
    <Wrapper>
      <div className="grid grid-cols-10 mt-4 pr-2 h-[84vh]">
        <div className="col-span-8 overflow-scroll hide-scrollbar">
          <div className="flex flex-col">
            <BlogBody id={id} />
            <Divider
              variant="fullWidth"
              sx={{
                borderColor: "white",
                marginTop: "8px",
                marginRight: "12px",
              }}
            />
            <div className="pr-4 w-full">
              <CommentBox blogId={parseInt(id)} />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <EventBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Blog
