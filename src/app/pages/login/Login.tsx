import {
  Alert,
  Button,
  Card,
  IconButton,
  Snackbar,
  SvgIcon,
  TextField,
} from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import CustomInput from "../register/components/input-field"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

import {
  login,
  selectStatus,
  UserCredentials,
} from "../../../features/user/userSlice"
import LoadingModal from "../../components/reusable/loading-modal"
import { Link, Navigate } from "react-router-dom"

export interface LoginDetails {
  username: string
  password: string
}

const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)

  const handleLogin = () => {
    if (!username || !password) {
      alert("Invalid credentials")
      return
    }
    const data: LoginDetails = {
      username: username,
      password: password,
    }
    dispatch(login(data))
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <LoadingModal openExp={status === "LOADING"} />
      {status === "ERROR" && (
        <div>
          <Snackbar
            open
            autoHideDuration={1500}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error">Invalid Credentials</Alert>
          </Snackbar>
        </div>
      )}
      {status === "LOGGEDIN" && <Navigate to={"/home"} />}
      <div className="lg:w-1/3 md:w-1/2">
        <Card
          className="w-full"
          raised={true}
          sx={{
            borderRadius: "14px",
            border: "solid 4px white",
          }}
        >
          <div className="bg-gradient-to-br from-bg-light to-bg-dark h-full w-full flex flex-col gap-y-4 p-4 items-center">
            <div className="text-2xl font-bold text-white">Login</div>
            <div className="flex flex-col items-center justify-center space-y-4 w-full">
              <CustomInput
                value={username}
                setValue={setUsername}
                title="Username"
                classesPassed
                classes="w-full bg-clip-content rounded-md bg-content-light"
                disabled={false}
              />
              <div className="w-full flex-row flex items-center justify-end">
                <TextField
                  className="w-full bg-content-light rounded-md"
                  placeholder="Password"
                  type={isHidden ? "password" : "text"}
                  color={"primary"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white", // Text color
                      boxShadow: "1px 2px 4px",
                      borderRadius: "6px",
                    },
                    "& label.Mui-focused": {
                      color: "#232D3F",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#f0f0f0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ffffff",
                        opacity: "100%",
                      },
                    },
                  }}
                />
                <div className="z-10 absolute justify-end flex mr-2 ">
                  <IconButton onClick={() => setIsHidden(!isHidden)}>
                    <SvgIcon
                      component={isHidden ? VisibilityIcon : VisibilityOffIcon}
                      className="transition-transform ease-in-out duration-300 text-white"
                    />
                  </IconButton>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="mt-4 mb-6 bg-gradient-to-br from-content-dark to-content-light transition-all duration-500 hover:-translate-x-[2px] hover:-translate-y-[2px] text-white hover:shadow-xl text-xl font-bold p-2 rounded-xl border-4 border-bg-primary"
              >
                Login
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login
