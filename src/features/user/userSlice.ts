import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { LoginDetails } from "../../app/pages/login/Login"
// import { configDotenv } from "dotenv"

// configDotenv()

export interface LoginData {
  username: string
  password: string
}

export interface CredentialWrapper {
  status: number
  message: string
  data: UserCredentials
}

export interface UserCredentials {
  username: string
  token: string | null
  refreshToken: string | null
  role: "STUDENT" | "ALUMNI" | "ADMIN"
  profilePic: string | null
}

export interface UserState {
  credentials: UserCredentials | null
  error: Error | null
  status: "LOGGEDIN" | "LOGGEDOUT" | "LOADING" | "ERROR"
}

const initialState: UserState = {
  credentials: null,
  error: null,
  status: "LOGGEDOUT",
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    logout: create.reducer(state => {
      state.credentials = null
      localStorage.removeItem("token")
    }),
    login: create.asyncThunk<CredentialWrapper, LoginDetails>(
      async data => {
        const response = await axios.post(
          "http://localhost:8080/api/login",
          JSON.stringify(data),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.status = "LOGGEDIN"
          state.credentials = action.payload.data
          if (action.payload.data.token) {
            localStorage.setItem("token", action.payload.data.token)
          }
        },
        rejected: (state, error) => {
          console.log(error)
          state.status = "ERROR"
        },
      },
    ),
  }),
  selectors: {
    selectUserCredentials: user => user.credentials,
    selectStatus: user => user.status,
    selectToken: user => user.credentials?.token,
    selectRefreshToken: user => user.credentials?.refreshToken,
    selectRole: user => user.credentials?.role,
    selectUsername: user => user.credentials?.username,
    selectProfilePic: user => user.credentials?.profilePic,
  },
})

export const { login, logout } = userSlice.actions
export const {
  selectUserCredentials,
  selectRefreshToken,
  selectRole,
  selectStatus,
  selectToken,
  selectUsername,
  selectProfilePic,
} = userSlice.selectors
