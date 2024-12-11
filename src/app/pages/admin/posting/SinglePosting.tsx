import React, { useEffect, useState } from "react"
import AdminWrapper from "../components/AdminWrapper"
import { Link, Navigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../../redux/hooks"
import { selectToken } from "../../../../features/user/userSlice"
import { ConfigType } from "../../../../features/profile/profileSlice"
import axios from "axios"
import { Posting } from "../../jobs/JobPosting"
import SendIcon from "@mui/icons-material/Send"
import { Divider, Input, SvgIcon, TextField } from "@mui/material"
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt"
import UserTag from "../../../components/reusable/user-taglink"

const SinglePosting = () => {
  const { id } = useParams()
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const config: ConfigType = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      RefreshToken: "",
    },
  }
  const fetchPosting = async () => {
    const response = await axios.get(`/api/posting/${id}`, config)
    setPosting(response.data)
  }
  const fetchList = async () => {
    const response = await axios.get("/api/postings", config)
    setPostingList(response.data)
  }
  const [posting, setPosting] = useState<Posting>()
  const [list, setPostingList] = useState<Posting[]>([])
  const [redirect, setRedirect] = useState<boolean>(false)
  useEffect(() => {
    fetchList()
    fetchPosting()
  }, [])
  const handleEvent = async (val: string) => {
    const response = await axios.put(
      `/api/posting/${posting?.id}/${val}`,
      "",
      config,
    )
    if (val === "REJECTED") fetchList()
    setRedirect(true)
  }
  const rejected = list.filter(item => item.status === "REJECTED")
  return (
    <AdminWrapper>
      <div className="w-full grid grid-cols-10 h-[83.5vh] gap-x-4 pr-4">
        {redirect && <Navigate to={"/admin/job-posting"} />}
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
              <div className="flex justify-between w-full pr-2">
                <button
                  className="mr-4 text-white py-2 bg-content-dark px-4 flex flex-row items-center justify-center space-x-1 border-2 border-white rounded-full transition-all shadow-default hover:-translate-x-0.5 hover:-translate-y-0.5 duration-300 ease-in-out"
                  onClick={e => {
                    e.preventDefault()
                    handleEvent("REJECTED")
                  }}
                >
                  <div>Reject</div>
                  <SvgIcon component={DoDisturbAltIcon} />
                </button>
                <button
                  className="mr-4 text-white py-2 bg-content-dark px-4 flex flex-row items-center justify-center space-x-1 border-2 border-white rounded-full transition-all shadow-default hover:-translate-x-0.5 hover:-translate-y-0.5 duration-300 ease-in-out"
                  onClick={e => {
                    e.preventDefault()
                    handleEvent("APPROVE")
                  }}
                >
                  <div>Approve</div>
                  <SvgIcon component={SendIcon} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-3 shadow-custom rounded-xl bg-gradient-to-b from-bg-dark to-bg-light p-4">
          <div className="text-white text-xl font-bold">Rejected Postings</div>
          <Divider sx={{ borderColor: "white", opacity: "50%" }} />
          <div>
            {rejected.length > 0 &&
              rejected.map(item => (
                <div
                  className="text-content-dark bg-white/80 rounded-md p-2 m-2"
                  key={item.id}
                >
                  <div className="text-lg">Carwale</div>
                  <div className="text-md opacity-80">
                    Associate Software Engineer
                  </div>
                  <div className="text-sm opacity-50">Pune, Maharashtra</div>
                </div>
              ))}
            {rejected.length === 0 && (
              <div className="text-sm text-white opacity-50 mt-2">
                No rejected job postings
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminWrapper>
  )
}

export default SinglePosting
