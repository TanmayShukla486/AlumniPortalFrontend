import { Card, CardContent, CircularProgress } from "@mui/material"
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

interface CommentItemProps {
  comment: Comment
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="w-full h-fit border-2 border-primary-dark comment rounded-lg p-2 flex flex-col items-start justify-center">
      <div>
        <UserTag username={comment.username} />
      </div>
      <div>{comment.content}</div>
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
    <div className="bg-white comment rounded-xl shadow-2xl border-4 h-full block w-full border-primary-dark px-4 py-2 hide-scrollbar">
      <div className="flex w-full flex-col justify-between items-center">
        <div className="font-bold bg-transparent text-3xl">
          <span className="bg-gradient-to-r from-primary-dark to-bg-primary bg-clip-text text-transparent">
            Comments
          </span>
        </div>
        <div className="min-h-[300px] max-h-[350px]  p-4 shadow-custom-inset rounded-xl border-2 border-primary-dark w-full overflow-scroll hide-scrollbar space-y-4 my-2 text-wrap">
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
        <CustomInput
          value={text}
          setValue={setText}
          title="Type your comment here"
          classesPassed
          disabled={false}
          classes="text-white bg-gradient-to-r w-full bg-clip-content rounded-md from-bg-primary to-primary-dark"
        />
        <CustomButton
          customBgColor="#d4a373"
          customColor="#b55e19"
          customBorder="2px solid #b55e19"
          onClick={e => {
            e.preventDefault()
            handleAddComment()
          }}
        >
          Add comment
        </CustomButton>
      </div>
    </div>
  )
}

export default CommentBox
