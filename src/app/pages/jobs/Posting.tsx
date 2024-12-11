import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import { Link, Navigate, useParams } from "react-router-dom"
import EventBox from "../home/components/Event"
import { Alert, Snackbar, SvgIcon } from "@mui/material"
import UserTag from "../../components/reusable/user-taglink"
import type { Posting } from "./JobPosting"
import { useAppSelector } from "../../redux/hooks"
import SendIcon from "@mui/icons-material/Send"
import { selectRole, selectToken } from "../../../features/user/userSlice"
import axios from "axios"
import { ConfigType } from "../../../features/profile/profileSlice"

const Posting = () => {
  const { id } = useParams()
  const [posting, setPosting] = useState<Posting>()
  const [open, setOpen] = useState<boolean>(false)
  const [redirect, setRedirect] = useState<boolean>(false)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const role = useAppSelector(selectRole)
  const config: ConfigType = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      RefreshToken: "",
      Authorization: `Bearer ${token}`,
    },
  }
  const fetchPosting = async () => {
    const response = await axios.get(`/api/posting/${id}`, config)
    setPosting(response.data)
  }
  const handleDelete = async () => {
    const response = await axios.delete(`/api/posting/${id}`, config)
    setOpen(true)
  }
  useEffect(() => {
    fetchPosting()
  }, [id])
  return (
    <Wrapper>
      <div className="grid grid-cols-10 h-[83.5vh] mt-4 mr-6 gap-x-4">
        {redirect && <Navigate to={"/job-posting/all"} />}
        <Snackbar
          open={open}
          autoHideDuration={1500}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="filled"
            className="cursor-pointer"
            onClick={() => {
              setOpen(state => !state)
              setRedirect(true)
            }}
          >
            Posting deleted successfully!!
          </Alert>
        </Snackbar>
        <div className="col-span-7 shadow-custom rounded-xl p-4 bg-gradient-to-b from-content-light/40 to-white/50 border-4 border-content-dark">
          <div className="h-12 ml-2 mr-4 flex flex-row justify-between">
            <div className="text-4xl font-extrabold bg-gradient-to-br from-content-dark to-bg-dark bg-clip-text text-transparent">
              {posting?.company || "Carwale"}
            </div>
            <div className="opacity-75">
              <UserTag username={posting?.postedBy || ""} />
            </div>
          </div>
          {posting && (
            <div className="w-full flex flex-col justify-start gap-y-4 p-4 rounded-xl -mt-4">
              <div className="rounded-xl">
                <div className="text-xl text-white font-bold">Job Title</div>
                <div className="bg-content-dark text-white px-4 py-2 rounded-full w-fit -ml-2 mt-2">
                  {posting.title}
                </div>
              </div>
              <div className="= w-full bg-clip-content rounded-md ">
                <div className="text-white/80 font-bold">Requirements</div>
                <div className="bg-content-dark text-white px-4 py-2 rounded-full w-fit -ml-2 mt-2">
                  {posting.req}
                </div>
                <div className="flex flex-row w-full space-x-2 mt-1">
                  <div className="w-full">
                    <div className="text-white/80 font-bold">Location</div>
                    <div className="bg-content-dark text-white px-4 py-2 rounded-full w-fit -ml-2 mt-2">
                      {posting.loc}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="text-white/80 font-bold">
                      Salary (In LPA)
                    </div>
                    <div className="bg-content-dark text-white px-8 py-2 rounded-full w-fit -ml-2 mt-2">
                      {posting.sal}
                    </div>
                  </div>
                </div>
                <div className="text-white/80 font-bold mt-2">
                  Job Description
                </div>
                <div className="bg-content-dark text-white px-4 py-2 rounded-full w-fit -ml-2 mt-2">
                  {posting.desc}
                </div>
                <div className="text-white/80 font-bold mt-2">Link</div>
                <div className="bg-content-dark text-white px-4 py-2 rounded-full w-fit -ml-2 mt-2">
                  <Link to={posting.link}>{posting.link}</Link>
                </div>
              </div>
              <div
                className={`flex ${role === "ADMIN" ? "justify-between" : "justify-end"} w-full pr-2`}
              >
                <div>
                  {role === "ADMIN" && (
                    <button
                      className="bg-red-700 px-4 py-2 rounded-full border-2 border-content-dark  shadow-custom"
                      onClick={e => {
                        e.stopPropagation()
                        handleDelete()
                      }}
                    >
                      <span className="text-white">Delete Posting</span>
                    </button>
                  )}
                </div>
                <a href={posting.link} target="_blank">
                  <div className="mr-4 text-white py-2 bg-content-dark px-4 flex flex-row items-center justify-center space-x-1 border-2 border-white rounded-full transition-all shadow-default hover:-translate-x-0.5 hover:-translate-y-0.5 duration-300 ease-in-out">
                    <div>Apply</div>
                    <SvgIcon component={SendIcon} />
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-3 w-full h-full">
          <EventBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Posting
