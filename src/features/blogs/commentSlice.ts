import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { useAppSelector } from "../../app/redux/hooks"
import type { ConfigType } from "../profile/profileSlice"
import { selectRefreshToken, selectToken } from "../user/userSlice"

export interface Comment {
  blogId: number
  id: number
  username: string
  content: string
  likes: number
}

export interface CommentSendBody {
  username: string
  blogId: number
  content: string
}

export interface CommentResponse {
  status: number
  message: string
  data: Comment[]
}
export interface CommentPostResponse {
  status: number
  message: string
  data: Comment
}

export interface CommentState {
  comments: Comment[]
  status: "LOADING" | "IDLE" | "ERROR"
}

const initialState: CommentState = {
  comments: [],
  status: "IDLE",
}

export const commentSlice = createAppSlice({
  name: "comments",
  initialState,
  reducers: create => ({
    fetchComments: create.asyncThunk<
      CommentResponse,
      { id: number; token: string; refreshToken: string }
    >(
      async ({ id, token, refreshToken }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.get(
          `http://localhost:8080/api/comment/${id}`,
          config,
        )
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.comments = action.payload.data
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    addComment: create.asyncThunk<
      CommentPostResponse,
      { data: CommentSendBody; token: string; refreshToken: string }
    >(
      async ({ data, token, refreshToken }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.post(
          `http://localhost:8080/api/comment`,
          JSON.stringify(data),
          config,
        )
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.status = "IDLE"
          state.comments = [...state.comments, action.payload.data]
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),

    deleteComment: create.asyncThunk<
      number,
      { id: number; token: string; refreshToken: string }
    >(
      async ({ id, token, refreshToken }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        await axios.delete(`http://localhost:8080/api/comment?id=${id}`, config)
        return id
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.comments.filter(it => it.id !== action.payload)
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
  }),
  selectors: {
    selectCommentList: state => state.comments,
    selectCommentListStatus: state => state.status,
  },
})

export const { fetchComments, addComment } = commentSlice.actions
export const { selectCommentList, selectCommentListStatus } =
  commentSlice.selectors
