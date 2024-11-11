import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  SvgIcon,
  TextField,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CustomInput from "../../register/components/input-field"
import {
  addComment,
  Comment,
  CommentSendBody,
  fetchComments,
  selectCommentList,
  selectCommentListStatus,
} from "../../../../features/blogs/commentSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  selectRefreshToken,
  selectToken,
  selectUsername,
} from "../../../../features/user/userSlice"
import CustomButton from "../../../components/reusable/custom-button"
import UserTag from "../../../components/reusable/user-taglink"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag"

interface CommentItemProps {
  comment: Comment
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="w-full text-white">
      <div className="w-full flex flex-row justify-between">
        <div className="w-24">
          <UserTag username={comment.username} />
          <Divider
            variant="fullWidth"
            sx={{
              borderColor: "white",
            }}
          />
        </div>
        <div>
          <SvgIcon component={OutlinedFlagIcon} />
        </div>
      </div>
      <div className="mt-2 text-md">{comment.content}</div>
      <div className="w-full flex flex-row space-x-4 mt-4">
        <div className="text-white  flex flex-row space-x-1 items-center justify-center cursor-pointer">
          <SvgIcon component={ThumbUpIcon} fontSize="small" />
          <div>{comment.likes}</div>
        </div>
      </div>
      <Divider
        variant="fullWidth"
        sx={{
          borderColor: "white",
          marginTop: "8px",
        }}
      />
    </div>
  )
}

export interface CommentBoxProps {
  blogId: number
}

const CommentBox = ({ blogId }: CommentBoxProps) => {
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const comments = useAppSelector(selectCommentList)
  const dispatch = useAppDispatch()
  const username = useAppSelector(selectUsername) || ""
  const [text, setText] = useState<string>("")
  const listStatus = useAppSelector(selectCommentListStatus)
  useEffect(() => {
    dispatch(fetchComments({ id: blogId, token, refreshToken }))
  }, [])

  const handleAddComment = () => {
    const data: CommentSendBody = {
      username,
      blogId,
      content: text,
    }
    dispatch(
      addComment({
        data,
        token,
        refreshToken,
      }),
    )
  }
  /**TODO: */
  return (
    <div className="flex w-full flex-col justify-start items-start">
      <div className="font-bold bg-transparent text-3xl">
        <div className=" bg-clip-text text-content-dark mt-2">Comments</div>
        <Divider
          variant="fullWidth"
          sx={{
            borderColor: "white",
          }}
        />
      </div>
      <div className="w-full mt-2 hide-scrollbar">
        <TextField
          className="w-full text-justify"
          placeholder="Enter your comment"
          multiline
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          sx={{
            "& .MuiInputBase-input": {
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none", // Internet Explorer 10+
              scrollbarWidth: "none", // Firefox
            },
            "& label.Mui-focused": {
              color: "#ffffff",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#ffffff",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "#ffffff",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
          }}
        />
        <button
          className="ml-2 mt-2 bg-content-dark text-white text-md px-4 py-1 rounded-full border-2 border-content-light hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 ease-in shadow-button2"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
      <div className="mt-2 bg-content-dark p-4 w-full text-white opacity-50 rounded-xl border-2 border-white space-y-4">
        {(listStatus === "LOADING" || listStatus === "ERROR") && (
          <CircularProgress />
        )}
        {listStatus === "IDLE" &&
          comments.length > 0 &&
          comments.map(comment => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        {listStatus === "IDLE" && comments.length === 0 && (
          <div>No comments</div>
        )}
      </div>
    </div>
  )
}

export default CommentBox
