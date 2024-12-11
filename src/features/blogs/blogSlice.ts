import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { useAppSelector } from "../../app/redux/hooks"
import type { ConfigType } from "../profile/profileSlice"
import {
  selectRefreshToken,
  selectStatus,
  selectToken,
  userSlice,
} from "../user/userSlice"

export interface Blog {
  id: number
  title: string
  category: string
  content: string
  color: string
  author: string
  likes: number
  commentsEnabled: boolean
  commentCount: number
  alreadyLiked: boolean
}

interface LikeResponse {
  status: number
  message: string
  data: number
}

export interface BlogState {
  blog: Blog | null
  likes: number
  status: "LOADING" | "IDLE" | "ERROR" | "POSTED"
  errorMessage: string
}

interface BlogPostResponse {
  status: number
  message: string
  data: string
}

const initialState: BlogState = {
  blog: null,
  likes: 0,
  status: "IDLE",
  errorMessage: "",
}

export interface BlogPostDetails {
  token: string
  refreshToken: string
  blog: Blog
}

interface Response {
  status: number
  message: string
  data: Blog
}

export const blogSlice = createAppSlice({
  name: "currBlog",
  initialState,
  reducers: create => ({
    getBlog: create.asyncThunk<
      Response,
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
        const response = await axios.get(`/api/blog/${id}`, config)
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.blog = action.payload.data
          state.likes = action.payload.data.likes
          state.status = "IDLE"
        },
        rejected: (state, error) => {
          state.status = "ERROR"
          state.errorMessage = error.error.message || "Error Occurred"
        },
      },
    ),
    postBlog: create.asyncThunk<BlogPostResponse, BlogPostDetails>(
      async data => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${data.token}`,
            RefreshToken: data.refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.post(
          "/api/blog",
          JSON.stringify(data.blog),
          config,
        )
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.status = "POSTED"
        },
        rejected: (state, error) => {
          state.status = "ERROR"
          state.errorMessage = error.error.message || "Error Occurred"
        },
      },
    ),
    likeBlog: create.asyncThunk<
      LikeResponse,
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
        const response = await axios.post(
          "/api/likes",
          JSON.stringify({
            entity: "blog",
            entityId: id,
          }),
          config,
        )
        return response.data
      },
      {
        pending: () => {},
        fulfilled: (state, action) => {
          state.likes = action.payload.data
        },
        rejected: (state, error) => {
          state.status = "IDLE"
          state.errorMessage = error.error.message || "Error Occurred"
        },
      },
    ),
    removeBlog: create.asyncThunk<
      { id: number },
      { token: string; id: number }
    >(
      async ({ token, id }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: "",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.delete(`/api/blog/${id}`, config)
        return { id }
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: state => {
          ;(state.blog = null), (state.status = "IDLE")
        },
        rejected: (state, error) => {
          state.errorMessage = error.error.message || "Error Occurred"
          state.status = "ERROR"
        },
      },
    ),
    resetBlogStatus: create.reducer(state => {
      state.status = "IDLE"
    }),
  }),
  selectors: {
    selectBlog: state => state.blog,
    selectBlogStatus: state => state.status,
    selectBlogLikes: state => state.likes,
    selectBlogError: state => state.errorMessage,
  },
})

export const { getBlog, postBlog, removeBlog, resetBlogStatus, likeBlog } =
  blogSlice.actions

export const {
  selectBlog,
  selectBlogStatus,
  selectBlogLikes,
  selectBlogError,
} = blogSlice.selectors
