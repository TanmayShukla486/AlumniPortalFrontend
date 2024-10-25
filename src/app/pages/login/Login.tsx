import { Button, Card, IconButton, SvgIcon, TextField } from "@mui/material"
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
import { Link } from "react-router-dom"

export interface LoginDetails {
  username: string
  password: string
}

const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLAnchorElement>(null)
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

  useEffect(() => {
    if (status === "LOGGEDIN") ref.current?.click()
  }, [status])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Link to="/create-blog" className="hidden" ref={ref} />
      <LoadingModal openExp={status === "LOADING"} />
      <div className="lg:w-1/3 md:w-1/2">
        <Card
          className="w-full"
          raised={true}
          sx={{
            borderRadius: "14px",
            border: "solid 4px white",
          }}
        >
          <div className="bg-gradient-to-br from-bg-primary to-primary-dark h-full w-full flex flex-col gap-y-4 p-4 items-center">
            <div className="text-2xl font-bold text-white">Login</div>
            <div className="flex flex-col items-center justify-center space-y-4 w-full">
              <CustomInput
                value={username}
                setValue={setUsername}
                title="Username"
                classesPassed={false}
                classes=""
              />
              <div className="w-full flex-row flex items-center justify-end">
                <TextField
                  className="w-full bg-gradient-to-br from-bg-grad-start to-bg-grad-end rounded-md"
                  placeholder="Password"
                  type={isHidden ? "password" : "text"}
                  color={"primary"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "black", // Text color
                      boxShadow: "1px 2px 4px",
                      borderRadius: "6px",
                    },
                    "& label.Mui-focused": {
                      color: "#bb5e19",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#bb5e19",
                      },
                    },
                  }}
                />
                <div className="z-10 absolute justify-end flex mr-2">
                  <IconButton onClick={() => setIsHidden(!isHidden)}>
                    <SvgIcon
                      component={isHidden ? VisibilityIcon : VisibilityOffIcon}
                      className="transition-all ease-in-out duration-300"
                    />
                  </IconButton>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="mt-4 mb-6 bg-bg-primary transition-all duration-500 hover:-translate-x-[2px] hover:-translate-y-[2px] text-white hover:shadow-xl text-xl font-bold p-2 rounded-xl border-4 border-bg-primary"
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
