import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { ConfigType, Follower } from "../profile/profileSlice"

interface Response {
  statusCode: number
  message: string
  data: Follower[]
}

export interface FollowingState {
  following: Follower[]
  completeFollowing: Follower[]
  status: "IDLE" | "LOADING" | "ERROR"
  errorMessage: string
}

const initialState: FollowingState = {
  following: [],
  completeFollowing: [],
  status: "IDLE",
  errorMessage: "",
}

export const followingSlice = createAppSlice({
  name: "following",
  initialState,
  reducers: create => ({
    getInitialFollowing: create.asyncThunk<
      Response,
      { username: string; token: string; refreshToken: string }
    >(
      async ({ username, token, refreshToken }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const resposne = await axios.get(
          `http://localhost:8080/api/${username}/following?page=1`,
          config,
        )
        return resposne.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.following = action.payload.data
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    getCompleteFollowing: create.asyncThunk<
      Response,
      { username: string; token: string; refreshToken: string }
    >(
      async ({ username, token, refreshToken }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const resposne = await axios.get(
          `http://localhost:8080/api/${username}/following`,
          config,
        )
        return resposne.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.completeFollowing = action.payload.data
          state.status = "IDLE"
        },
        rejected: (state, error) => {
          state.status = "ERROR"
          if (error instanceof Error) state.errorMessage = error.message
        },
      },
    ),
    getRemainingFollowing: create.asyncThunk<
      Response,
      { username: string; token: string; refreshToken: string }
    >(
      async ({ username, token, refreshToken }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        const response = await axios.get(
          `http://localhost:8080/api/${username}/following?skip=1`,
          config,
        )
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          action.payload.data.forEach(item => state.following.push(item))
          state.status = "IDLE"
        },
        rejected: (state, error) => {
          state.status = "ERROR"
          if (error instanceof Error) state.errorMessage = error.message
        },
      },
    ),
    addFollow: create.reducer<{ follow: Follower }>((state, action) => {
      state.following = [...state.following, action.payload.follow]
    }),
    removeFollow: create.reducer<{ id: number }>((state, action) => {
      state.following = state.following.filter(
        it => it.id !== action.payload.id,
      )
    }),
  }),
  selectors: {
    selectFollowingList: following => following.following,
    selectFollowingListStatus: following => following.status,
    selectFollowingListError: following => following.errorMessage,
  },
})

export const {
  selectFollowingList,
  selectFollowingListStatus,
  selectFollowingListError,
} = followingSlice.selectors
export const {
  getInitialFollowing,
  getCompleteFollowing,
  getRemainingFollowing,
  addFollow,
  removeFollow,
} = followingSlice.actions
