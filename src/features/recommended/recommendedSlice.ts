import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { ConfigType } from "../profile/profileSlice"

export interface RecommendedUser {
  username: string
  graduationYear: number
}

interface Response {
  statusCode: number
  message: string
  data: RecommendedUser[]
}

export interface RecommendList {
  recommended: RecommendedUser[]
  status: "IDLE" | "LOADING" | "ERROR"
}

const initialState: RecommendList = {
  recommended: [],
  status: "IDLE",
}

export const recommendedSlice = createAppSlice({
  name: "recommended",
  initialState,
  reducers: create => ({
    getRecommendedUsers: create.asyncThunk<
      Response,
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
        const response = await axios.get("/api/user/recommended", config)
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          ;(state.status = "IDLE"), (state.recommended = action.payload.data)
        },
        rejected: (state, error) => {
          console.error(error)
          state.status = "ERROR"
        },
      },
    ),
  }),
  selectors: {
    selectRecommended: list => list.recommended,
    selectRecommendedStatus: list => list.status,
  },
})

export const { getRecommendedUsers } = recommendedSlice.actions
export const { selectRecommended, selectRecommendedStatus } =
  recommendedSlice.selectors
