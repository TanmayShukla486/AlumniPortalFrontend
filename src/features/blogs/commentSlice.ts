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
      Comment[],
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
          state.comments = action.payload
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    addComment: create.asyncThunk<
      Comment,
      { data: Comment; token: string; refreshToken: string }
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
        const response = await axios.put(
          `http://localhost:8080/api/comment`,
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
          state.comments.push(action.payload)
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

export const { fetchComments } = commentSlice.actions
export const { selectCommentList, selectCommentListStatus } =
  commentSlice.selectors
