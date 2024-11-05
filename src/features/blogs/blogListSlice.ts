import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import type { Blog } from "./blogSlice"
import type { ConfigType } from "../profile/profileSlice"
import { useAppSelector } from "../../app/redux/hooks"
import { selectRefreshToken, selectToken } from "../user/userSlice"

export interface BlogsState {
  list: Blog[]
  status: "LOADING" | "IDLE" | "ERROR"
}

const initialState: BlogsState = {
  list: [],
  status: "IDLE",
}

interface BlogResponse {
  status: number
  message: string
  data: Blog[]
}

export const blogListSlice = createAppSlice({
  name: "blogList",
  initialState,
  reducers: create => ({
    fetchBlogs: create.asyncThunk<
      BlogResponse,
      { token: string; refreshToken: string }
    >(
      async ({ token, refreshToken }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.get(
          `http://localhost:8080/api/blog`,
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
          state.list = action.payload.data
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    fetchBlogsWithCategory: create.asyncThunk<
      BlogResponse,
      { category: string; token: string }
    >(
      async ({ category, token }) => {
        const config: ConfigType = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            RefreshToken: "",
          },
        }
        const response = await axios.get(
          `http://localhost:8080/api/blog?category=${category}`,
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
          state.list = action.payload.data
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    fetchPopularBlogs: create.asyncThunk<BlogResponse, { token: string }>(
      async ({ token }) => {
        const config: ConfigType = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            RefreshToken: "",
          },
        }
        const response = await axios.get(
          `http://localhost:8080/api/blog/popular`,
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
          state.list = action.payload.data
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
  }),
  selectors: {
    selectList: state => state.list,
    selectListStatus: state => state.status,
  },
})

export const { fetchBlogs, fetchBlogsWithCategory, fetchPopularBlogs } =
  blogListSlice.actions
export const { selectList, selectListStatus } = blogListSlice.selectors
