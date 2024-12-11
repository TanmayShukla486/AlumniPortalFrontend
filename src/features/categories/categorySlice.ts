import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { ConfigType } from "../profile/profileSlice"
import { useAppSelector } from "../../app/redux/hooks"
import { selectRefreshToken, selectToken } from "../user/userSlice"

export interface Category {
  title: string
  color: string
}

export interface CategoryState {
  categories: Category[]
  status: "IDLE" | "LOADING" | "ERROR"
}

interface CategoryResponse {
  status: number
  message: string
  data: Category[]
}

interface AddResponse {
  status: number
  message: string
  data: Category
}

const initialState: CategoryState = {
  categories: [],
  status: "IDLE",
}

export const categorySlice = createAppSlice({
  name: "category",
  initialState,
  reducers: create => ({
    fetchCategories: create.asyncThunk<CategoryResponse, string>(
      async token => {
        const refreshToken = ""
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.get("/api/category", config)
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.categories = action.payload.data
          state.status = "IDLE"
        },
        rejected: (state, error) => {
          state.status = "ERROR"
          console.log(error)
        },
      },
    ),
    addCategory: create.asyncThunk<
      AddResponse,
      { token: string; category: Category }
    >(
      async ({ token, category }) => {
        const refreshToken = ""
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.post(
          "/api/admin/category",
          JSON.stringify(category),
          config,
        )
        return response.data
      },
      {
        rejected: (state, error) => {
          console.log(error)
        },
        fulfilled: (state, action) => {
          state.categories.push(action.payload.data)
        },
        pending: state => {},
      },
    ),
    removeCategory: create.asyncThunk<
      string,
      { token: string; category: string }
    >(
      async ({ token, category }) => {
        const refreshToken = ""
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.delete(
          `/api/admin/category?name=${category}`,
          config,
        )
        return response.data
      },
      {
        rejected: (state, error) => {
          console.log(error)
        },
        fulfilled: (state, action) => {
          state.categories = state.categories.filter(
            item => item.title !== action.payload,
          )
        },
        pending: state => {},
      },
    ),
  }),
  selectors: {
    selectCategories: state => state.categories,
    selectCategoriesStatus: state => state.status,
  },
})

export const { fetchCategories, addCategory, removeCategory } =
  categorySlice.actions
export const { selectCategories, selectCategoriesStatus } =
  categorySlice.selectors
