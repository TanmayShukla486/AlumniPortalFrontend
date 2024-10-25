import React from "react"
import { useState } from "react"
import type { RegisterForm } from "./registerScript"
import { redirect } from "react-router-dom"
import {
  Button,
  Card,
  Icon,
  IconButton,
  SvgIcon,
  TextField,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import CustomInput from "./components/input-field"
import Checkbox from "@mui/material/Checkbox"
import { Company } from "../../../features/profile/profileSlice"
import CompanyBubble from "./components/company-bubble"
import CompanyBox from "./components/company-box"
import axios from "axios"
import ConfirmationModal from "./components/confirmation-modal"

export interface RegisterResponse {
  username: string
  role: "STUDENT" | "ALUMNI" | "ADMIN"
  email: string
}

// TODO: WORK ON THE THEME
const Register = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [middleName, setMiddleName] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [companyName, setCompanyName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [companies, setCompanies] = useState<Company[]>([])
  const [years, setYears] = useState<number>(0)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [graduationYear, setGraduationYear] = useState<number>(2025)
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [responseData, setResponseData] = useState<RegisterResponse>()

  const isValidPassword = (password: string) => {
    const minLength = /.{8,}/ // At least 8 characters
    const hasLowerCase = /[a-z]/ // At least one lowercase letter
    const hasUpperCase = /[A-Z]/ // At least one uppercase letter
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/ // At least one special character

    // Check if all conditions are met
    return (
      minLength.test(password) &&
      hasLowerCase.test(password) &&
      hasUpperCase.test(password) &&
      hasSpecialChar.test(password)
    )
  }

  const handleModalClose = () => {
    console.log("reached modal close")
    redirect("/login")
  }

  const onSubmit = async () => {
    // TODO: implement proper mechanisms to deal with wrong input
    if (!firstName || !username || !email || !password) {
      if (!firstName) alert("Enter a valid first name")
      else if (!username) alert("Enter a valid username")
      else if (!email) alert("Enter a valid email")
      else if (!password) alert("Enter a password to proceed")
      return
    }
    if (companies.length === 0) {
      alert("You need to add atleast one company to proceed")
      return
    }
    if (!isValidPassword(password)) {
      alert(
        "Enter a valid password containing atleast 8 characters and min one lowercase, uppercase and special character each",
      )
      return
    }
    const formData: RegisterForm = {
      firstName,
      email,
      password,
      username,
      middleName,
      bio,
      lastName,
      role: "ALUMNI",
      graduationYear,
      companies,
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      )
      const credentials: RegisterResponse = {
        username: response.data.data.username,
        email: response.data.data.email,
        role: response.data.data.role,
      }
      setResponseData(credentials)
      setViewModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const addCompany = () => {
    if (!companyName || years === 0) return
    if (isChecked && companies.some(company => company.currentlyWorking)) {
      alert("You cannot work simultaneously in two companies")
      return
    }
    if (
      companies.some(
        company => company.company.toLowerCase() === companyName.toLowerCase(),
      )
    )
      return
    const company: Company = {
      company: companyName,
      timeSpent: years,
      currentlyWorking: isChecked,
    }
    setCompanies(state => [...state, company])

    setCompanyName("")
    setYears(0)
    setIsChecked(!isChecked)
  }

  const removeCompany = (val: string) => {
    if (!val) return
    setCompanies(state => state.filter(company => company.company !== val))
  }

  return (
    <div className="flex-col items-center">
      <ConfirmationModal
        open={viewModal}
        handleClose={handleModalClose}
        setOpen={() => setViewModal(!viewModal)}
        data={responseData}
      />
      <div className="flex w-full justify-center items-center bg-gradient-to-r from-bg-primary to-primary-dark bg-clip-text">
        <div className="mb-2 text-4xl font-extrabold text-transparent flex gap-x-2">
          Registration{" "}
          <button
            className="bg-gradient-to-br from-bg-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-lg p-2 border-4 border-primary-dark "
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {/* Left Side */}
      <div className="w-[90vw] h-[90vh] self-center grid grid-cols-2 gap-8">
        <Card
          className="w-full"
          raised={true}
          sx={{
            borderRadius: "14px",
            border: "solid 4px white",
          }}
        >
          <div className="bg-gradient-to-br from-bg-primary to-primary-dark h-full w-full flex flex-col gap-y-4 p-4 items-center">
            <div className="text-2xl font-bold text-white">User Details</div>
            <div className="flex space-x-4 w-full">
              <CustomInput
                value={firstName}
                setValue={setFirstName}
                title="First Name"
                classesPassed={false}
                classes=""
              />
              <CustomInput
                value={middleName}
                setValue={setMiddleName}
                title="Middle Name"
                classesPassed={false}
                classes=""
              />
            </div>
            <div className="flex space-x-4 w-full">
              <CustomInput
                value={lastName}
                setValue={setLastName}
                title="Last Name"
                classesPassed={false}
                classes=""
              />
              <TextField
                className="bg-gradient-to-r w-full bg-clip-content rounded-md from-bg-grad-start to-bg-grad-end shadow-lg"
                label="Graduation Year"
                type="number"
                value={graduationYear}
                onChange={e => setGraduationYear(parseInt(e.target.value))}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "black", // Text color
                    boxShadow: "1px 2px 4px",
                    borderRadius: "6px",
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: "bold",
                  },
                  "& label.Mui-focused": {
                    color: "black",
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
            </div>
            <CustomInput
              value={username}
              setValue={setUsername}
              title="Username"
              classesPassed={false}
              classes=""
            />
            <CustomInput
              value={email}
              setValue={setEmail}
              title="Email"
              classesPassed={false}
              classes=""
            />
            <div className="bg-gradient-to-r w-full flex justify-end items-center shadow-lg bg-clip-content rounded-md from-bg-grad-start to-bg-grad-end">
              <TextField
                className="w-[90vw]"
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
            <div className="bg-gradient-to-br w-full bg-clip-content rounded-md from-bg-grad-start to-bg-grad-end bio">
              <TextField
                className="w-full h-full"
                size="medium"
                rows={3}
                multiline
                placeholder="Bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "black", // Text color
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
            </div>
          </div>
        </Card>
        {/* Right Side */}
        <Card
          className="w-full"
          raised={true}
          sx={{
            borderRadius: "14px",
            border: "solid 4px #b55e19",
          }}
        >
          <div className="bg-gradient-to-r from-bg-grad-start to-bg-grad-end h-full w-full">
            <div className=" h-full w-full flex flex-col gap-y-4 p-4 items-center ">
              <div className="text-2xl font-bold bg-gradient-to-br from-bg-primary to-primary-dark bg-clip-text">
                <span className="text-transparent">Company Details</span>
              </div>
              <div className="w-full">
                <CustomInput
                  value={companyName}
                  setValue={setCompanyName}
                  title="Company Title"
                  classesPassed
                  classes="text-white bg-gradient-to-r w-full bg-clip-content rounded-md from-bg-primary to-primary-dark"
                />
              </div>
              <div className="flex w-full px-4">
                <div className="flex-1 flex items-center">
                  <div className="text-primary-dark">Currently Working</div>
                  <Checkbox
                    value={isChecked}
                    onClick={() => setIsChecked(!isChecked)}
                  />
                </div>
                <div className="flex items-center justify-center gap-x-4">
                  <div className="flex items-center text-primary-dark">
                    Years Worked:
                  </div>
                  <div className="flex-auto flex flex-end -mr-2">
                    <TextField
                      value={years}
                      onChange={e => setYears(parseInt(e.target.value))}
                      type={"number"}
                      sx={{
                        "& .MuiInputBase-input": {
                          color: "#b55e19", // Text color
                          boxShadow: "2px 4px 5px",
                          borderRadius: "6px",
                        },
                        "& label.Mui-focused": {
                          color: "#bb5e19",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#bb5e19",
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
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <Button
                  className="bg-gradient-to-br from-bg-primary to-bg-grad-end"
                  onClick={addCompany}
                  sx={{
                    borderRadius: "12.5px",
                    width: "25%",
                    border: "solid 4px #b55e19",
                    transition: "translate 0.5s, shadow 0.5s",
                    ":hover": {
                      boxShadow: "4px 2px 4px #bb5e19",
                      translate: "-1px -2px 10px",
                    },
                  }}
                >
                  <span className="text-white font-extrabold font-sans">
                    Add Company
                  </span>
                </Button>
              </div>
              <div className="h-full w-full p-8">
                <CompanyBox>
                  {companies.map(company => (
                    <CompanyBubble
                      title={company.company}
                      currentlyWorking={company.currentlyWorking}
                      remove={removeCompany}
                      key={company.company}
                    />
                  ))}
                </CompanyBox>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Register
