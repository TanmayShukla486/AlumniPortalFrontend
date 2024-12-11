import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import { ConfigType } from "../../../features/profile/profileSlice"
import { useAppSelector } from "../../redux/hooks"
import SendIcon from "@mui/icons-material/Send"
import {
  selectRole,
  selectToken,
  selectUsername,
} from "../../../features/user/userSlice"
import axios from "axios"
import {
  Alert,
  Checkbox,
  Divider,
  Input,
  Skeleton,
  Snackbar,
  SvgIcon,
  TextField,
} from "@mui/material"
import { Navigate } from "react-router-dom"

export interface Posting {
  id: number
  title: string
  req: string
  desc: string
  loc: string
  sal: number
  link: string
  company: string
  postedBy: string
  status: "PENDING" | "APPROVED" | "REJECTED"
}

const PostingItem = ({ posting }: { posting: Posting }) => {
  return (
    <div
      className={`bg-gradient-to-r ${posting.status === "APPROVED" ? "from-green-900 to-green-500" : posting.status === "REJECTED" ? "from-red-900 to-red-500" : "from-content-dark to-content-light"} w-full px-4 py-2 flex flex-row items-center justify-start border-content-dark border-[5px] rounded-xl`}
    >
      {posting.title}
    </div>
  )
}

const JobPosting = () => {
  const role = useAppSelector(selectRole)
  if (role !== "ALUMNI") return <Navigate to="/home" />
  const username = useAppSelector(selectUsername)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const [postings, setPostings] = useState<Posting[]>([])
  const [title, setTitle] = useState<string>("")
  const [req, setReq] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [loc, setLoc] = useState<string>("")
  const [sal, setSal] = useState<number>(0)
  const [link, setLink] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [status, setStatus] = useState<"LOADING" | "IDLE" | "ERROR" | "POSTED">(
    "IDLE",
  )
  const [open, setOpen] = useState<boolean>(true)
  const [postingStatus, setPostingStatus] = useState<
    "LOADING" | "IDLE" | "ERROR"
  >("IDLE")
  const [error, setError] = useState<string>("Error Occurred")
  const [postingError, setPostingError] = useState<string>("")
  const config: ConfigType = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      RefreshToken: "",
      Authorization: `Bearer ${token}`,
    },
  }
  const fetchPostings = async () => {
    try {
      setPostingStatus("LOADING")
      const response = await axios.get(
        `/api/posting/username/${username}`,
        config,
      )
      setPostings(response.data)
      setPostingStatus("IDLE")
    } catch (error) {
      setPostingStatus("ERROR")
      if (error instanceof Error) setPostingError(error.message)
      setPostings([])
    }
  }
  useEffect(() => {
    fetchPostings()
  }, [])
  const createPosting = async () => {
    const posting: Posting = {
      id: 0,
      title,
      req,
      sal,
      desc,
      loc,
      link,
      company,
      postedBy: username || "",
      status: "PENDING",
    }
    try {
      setStatus("LOADING")
      const response = await axios.post(
        "/api/postings",
        JSON.stringify(posting),
        config,
      )
      setTitle("")
      setReq("")
      setSal(0)
      setLoc("")
      setDesc("")
      setLink("")
      setStatus("POSTED")
    } catch (error) {
      if (error instanceof Error) setError(error.message)
      setStatus("ERROR")
    }
  }

  return (
    <Wrapper>
      <div>
        <Snackbar
          open={status === "ERROR" && open}
          autoHideDuration={1500}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="error"
            variant="filled"
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {error}
          </Alert>
        </Snackbar>
        <Snackbar
          open={status === "POSTED"}
          autoHideDuration={1500}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="filled"
            className="cursor-pointer"
            onClick={() => setStatus("IDLE")}
          >
            Job Posting Successful!
          </Alert>
        </Snackbar>
      </div>
      <div className="grid grid-cols-10 gap-x-4 mt-2 pr-4 h-[83.5vh]">
        <div className="col-span-7 border-2 border-white shadow-custom bg-gradient-to-b from-blue-400/20 to-content-dark rounded-xl pt-2 px-2">
          <div className="w-full h-full">
            <div className="w-full h-full">
              <div className="text-4xl font-extrabold bg-gradient-to-br from-content-dark to-bg-dark bg-clip-text text-transparent h-12 ml-2">
                Create Job Posting
              </div>
              <div className="w-full flex flex-col justify-start gap-y-4 p-4 rounded-xl -mt-4">
                <div className="rounded-xl">
                  <div className="text-xl">Job Title</div>
                  <Input
                    title="Title"
                    placeholder="Enter a title for the job"
                    className="w-1/2"
                    sx={{
                      color: "white",
                    }}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="= w-full bg-clip-content rounded-md ">
                  <div className="text-white/80 font-bold">Requirements</div>
                  <TextField
                    value={req}
                    onChange={e => setReq(e.target.value)}
                    className="w-full h-full p-4"
                    size="medium"
                    rows={3}
                    placeholder="Type your requirements here"
                    multiline
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "white", // Text color
                        borderRadius: "6px",
                      },
                      "& label.Mui-focused": {
                        color: "#0f0f0f",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0f0f0f",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0f0f0f",
                        },
                      },
                    }}
                  />
                  <div className="flex flex-row w-full space-x-2 mt-1">
                    <div className="w-full">
                      <div className="text-white/80 font-bold">Location</div>
                      <TextField
                        value={loc}
                        onChange={e => setLoc(e.target.value)}
                        className="w-full h-full p-4"
                        size="medium"
                        placeholder="Type job location here"
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white", // Text color
                            borderRadius: "6px",
                          },
                          "& label.Mui-focused": {
                            color: "#0f0f0f",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#0f0f0f",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0f0f0f",
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <div className="text-white/80 font-bold">
                        Salary (In LPA)
                      </div>
                      <TextField
                        value={sal}
                        onChange={e => setSal(parseInt(e.target.value))}
                        type="number"
                        className="w-full h-full p-4"
                        size="medium"
                        placeholder="Enter salary in LPA"
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white", // Text color
                            borderRadius: "6px",
                          },
                          "& label.Mui-focused": {
                            color: "#0f0f0f",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#0f0f0f",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0f0f0f",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-white/80 font-bold">Job Description</div>
                  <TextField
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    multiline
                    rows={3}
                    type="number"
                    className="w-full h-full p-4"
                    size="medium"
                    placeholder="Enter Job Description"
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "white", // Text color
                        borderRadius: "6px",
                      },
                      "& label.Mui-focused": {
                        color: "#0f0f0f",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0f0f0f",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0f0f0f",
                        },
                      },
                    }}
                  />
                  <div className="flex flex-row w-full space-x-2 items-center">
                    <div className="w-full">
                      <div className="text-white/80 font-bold">Link</div>
                      <TextField
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        className="w-full h-full p-4"
                        size="medium"
                        placeholder="Enter Link to Apply"
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white", // Text color
                            borderRadius: "6px",
                          },
                          "& label.Mui-focused": {
                            color: "#0f0f0f",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#0f0f0f",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0f0f0f",
                            },
                          },
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <div className="text-white/80 font-bold">Company</div>
                      <TextField
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className="w-full h-full p-4"
                        size="medium"
                        placeholder="Enter Company name"
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white", // Text color
                            borderRadius: "6px",
                          },
                          "& label.Mui-focused": {
                            color: "#0f0f0f",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#0f0f0f",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0f0f0f",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full pr-2">
                  <button
                    className="mr-4 text-white py-2 bg-content-dark px-4 flex flex-row items-center justify-center space-x-1 border-2 border-white rounded-full transition-all shadow-default hover:-translate-x-0.5 hover:-translate-y-0.5 duration-300 ease-in-out"
                    onClick={e => {
                      e.preventDefault()
                      createPosting()
                      fetchPostings()
                    }}
                  >
                    <div>Submit</div>
                    <SvgIcon component={SendIcon} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 border-2 border-white shadow-custom bg-gradient-to-b from-content-light/60 to-white rounded-xl p-4">
          <div className="text-white text-2xl font-bold mb-2">Postings</div>
          <Divider
            sx={{
              borderColor: "white",
              opacity: "50%",
            }}
          />
          {postingStatus === "LOADING" && (
            <div>
              <Skeleton sx={{ height: "56px" }} />
              <Skeleton sx={{ height: "56px" }} />
              <Skeleton sx={{ height: "56px" }} />
            </div>
          )}
          {postingStatus === "ERROR" && (
            <div className="text-sm text-white opacity-50">
              Couldn't fetch postings due to error: {postingError}
            </div>
          )}
          {postingStatus === "IDLE" && postings.length > 0 && (
            <div className="text-white h-full py-2">
              <div className="h-1/3">
                <div className="text-content-dark">Approved</div>
                <Divider
                  sx={{
                    opacity: "50%",
                    borderColor: "#052238",
                    width: "33%",
                    marginBottom: "4px",
                  }}
                />
                <div className="overflow-y-scroll hide-scrollbar space-y-2">
                  {postings?.filter(it => it.status === "APPROVED").length >
                    0 &&
                    postings
                      ?.filter(it => it.status === "APPROVED")
                      .map(it => <PostingItem posting={it} />)}
                  {postings.filter(it => it.status === "APPROVED").length ===
                    0 && (
                    <div className="text-sm opacity-50 text-content-dark">
                      No approved requests
                    </div>
                  )}
                </div>
              </div>
              <div className="h-1/3">
                <div className="text-content-dark">Pending</div>
                <Divider
                  sx={{
                    opacity: "50%",
                    borderColor: "#052238",
                    width: "33%",
                    marginBottom: "4px",
                  }}
                />
                <div className="overflow-y-scroll hide-scrollbar flex flex-col space-y-2">
                  {postings?.filter(it => it.status === "PENDING").length > 0 &&
                    postings
                      ?.filter(it => it.status === "PENDING")
                      .map(it => <PostingItem posting={it} />)}
                  {postings.filter(it => it.status === "PENDING").length ===
                    0 && (
                    <div className="text-sm opacity-50 text-content-dark">
                      No approved requests
                    </div>
                  )}
                </div>
              </div>

              <div className="h-1/3 ">
                <div className="text-content-dark">Rejected</div>
                <Divider
                  sx={{
                    opacity: "50%",
                    borderColor: "#052238",
                    width: "33%",
                    marginBottom: "4px",
                  }}
                />
                <div className="overflow-y-scroll hide-scrollbar space-y-2 h-[60%]">
                  {postings?.filter(it => it.status === "REJECTED").length >
                    0 &&
                    postings
                      ?.filter(it => it.status === "REJECTED")
                      .map(it => <PostingItem posting={it} />)}
                  {postings.filter(it => it.status === "REJECTED").length ===
                    0 && (
                    <div className="text-sm opacity-50 text-content-dark">
                      No rejected requests
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {postingStatus === "IDLE" && postings.length === 0 && (
            <div className="opacity-50 text-content-dark">
              No job postings yet
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default JobPosting
