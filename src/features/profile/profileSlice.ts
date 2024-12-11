import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { useAppSelector } from "../../app/redux/hooks"
import { selectRefreshToken, selectToken } from "../user/userSlice"

export interface Company {
  company: string
  timeSpent: number
  currentlyWorking: boolean
}

interface Response {
  statusCode: number
  message: string
  data: UserProfile
}

export interface UserProfile {
  username: string
  email: string
  followers: Follower[]
  following: Follower[]
  graduationYear: number
  alumniDetails: AlumniDetails
  role: "STUDENT" | "ALUMNI" | "ADMIN"
  firstName: string
  lastName: string | null
  middleName: string | null
  isAlumni: boolean
  bio: string
}

export interface AlumniDetails {
  companies: Company[] | null
}

export interface Follower {
  id: number
  followed: string
  followedBy: string
}

export interface ProfileState {
  profile: UserProfile | null
  status: "LOADING" | "IDLE" | "ERROR"
}

const initialState: ProfileState = {
  profile: null,
  status: "IDLE",
}

export interface ConfigType {
  headers: {
    Authorization: string
    RefreshToken: string
    "Content-Type": "application/json"
    Accept: "application/json"
  }
}

export const profileSlice = createAppSlice({
  name: "profile",
  initialState,
  reducers: create => ({
    fetchProfile: create.asyncThunk<
      Response,
      { username: string | undefined; token: string; refreshToken: string }
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
          `http://localhost:8080/api/user/${username}`,
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
          state.profile = action.payload.data
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    addProfileFollows: create.reducer<{ follow: Follower }>((state, action) => {
      if (!state.profile || !state.profile?.followers) return
      state.profile?.followers.push(action.payload.follow)
    }),
    removeProfileFollows: create.reducer<{ id: number }>((state, action) => {
      if (!state.profile || !state.profile?.followers) return
      state.profile.followers = state.profile.followers.filter(
        it => it.id !== action.payload.id,
      )
    }),
  }),
  selectors: {
    selectProfile: state => state.profile,
    selectProfileStatus: state => state.status,
  },
})

export const { fetchProfile, addProfileFollows, removeProfileFollows } =
  profileSlice.actions
export const { selectProfile, selectProfileStatus } = profileSlice.selectors
