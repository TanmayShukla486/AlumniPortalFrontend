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
}

export interface BlogState {
  blog: Blog | null
  status: "LOADING" | "IDLE" | "ERROR" | "POSTED"
}

interface BlogPostResponse {
  status: number
  message: string
  data: string
}

const initialState: BlogState = {
  blog: null,
  status: "IDLE",
}

export interface BlogPostDetails {
  token: string
  refreshToken: string
  blog: Blog
}

export const blogSlice = createAppSlice({
  name: "currBlog",
  initialState,
  reducers: create => ({
    getBlog: create.asyncThunk<Blog, number>(
      async id => {
        const token =
          useAppSelector(selectToken) || localStorage.getItem("token") || ""
        const refreshToken = useAppSelector(selectRefreshToken) || ""
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.get(
          `http://localhost:8080/api/blog/${id}`,
          config,
        )
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.blog = action.payload
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
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
          "http://localhost:8080/api/blog",
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
          console.log(error)
        },
      },
    ),
    removeBlog: create.reducer(state => {
      state.status = "IDLE"
      state.blog = null
    }),
    resetBlogStatus: create.reducer(state => {
      state.status = "IDLE"
    }),
  }),
  selectors: {
    selectBlog: state => state.blog,
    selectBlogStatus: state => state.status,
  },
})

export const { getBlog, postBlog, removeBlog, resetBlogStatus } =
  blogSlice.actions

export const { selectBlog, selectBlogStatus } = blogSlice.selectors
