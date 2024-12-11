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
  likes: Like[]
}

export interface Like {
  id: number
  username: string
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
  singleCommentStatus: "LOADING" | "ERROR" | "IDLE"
  likeCommentStatus: "LOADING" | "ERROR" | "IDLE"
}

const initialState: CommentState = {
  comments: [],
  status: "IDLE",
  singleCommentStatus: "IDLE",
  likeCommentStatus: "IDLE",
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
        const response = await axios.get(`/api/comment/${id}`, config)
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
          `/api/comment`,
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
        await axios.delete(`/api/comment?id=${id}`, config)
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
    likeComment: create.asyncThunk<
      { like: Like; id: number },
      { id: number; token: string; refreshToken: string }
    >(
      async ({ id, refreshToken, token }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.post(
          `/api/likes/comment/${id}`,
          "",
          config,
        )
        return { like: response.data, id }
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          const { id, like } = action.payload
          const comment = state.comments.find(comment => comment.id === id)
          if (comment) comment.likes.push(like)
        },
        rejected: (state, error) => {
          state.likeCommentStatus = "ERROR"
        },
      },
    ),
    dislikeComment: create.asyncThunk<
      { id: number; entityId: number },
      { id: number; token: string; refreshToken: string }
    >(
      async ({ id, refreshToken, token }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.delete(
          `/api/likes?id=${id}&type=COMMENT`,
          config,
        )
        return response.data
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          const { id, entityId } = action.payload
          const comment = state.comments.find(it => it.id === entityId)
          console.log("Comment ID = " + entityId)
          if (comment) comment.likes = comment.likes.filter(it => it.id !== id)
        },
        rejected: (state, error) => {
          state.likeCommentStatus = "ERROR"
        },
      },
    ),
  }),
  selectors: {
    selectCommentList: state => state.comments,
    selectCommentListStatus: state => state.status,
    selectLikeCommentStatus: state => state.likeCommentStatus,
    selectSingleCommentStatus: state => state.singleCommentStatus,
  },
})

export const { fetchComments, addComment, likeComment, dislikeComment } =
  commentSlice.actions
export const {
  selectCommentList,
  selectCommentListStatus,
  selectLikeCommentStatus,
  selectSingleCommentStatus,
} = commentSlice.selectors
