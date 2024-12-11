import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "../home/components/Event"
import { Posting } from "./JobPosting"
import {
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Snackbar,
  SvgIcon,
} from "@mui/material"
import { ConfigType } from "../../../features/profile/profileSlice"
import { useAppSelector } from "../../redux/hooks"
import { selectRole, selectToken } from "../../../features/user/userSlice"
import axios from "axios"
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom"

const PostingItem = ({
  posting,
  handleDelete,
}: {
  posting: Posting
  handleDelete: (id: number) => void
}) => {
  return (
    <Link to={`/job-posting/${posting.id}`}>
      <div className="w-[95%] h-fit flex flex-col items-start justify-between space-y-2 cursor-pointer bg-content-dark shadow-custom px-4 py-3 mr-8 rounded-md border-2 border-white/80 my-4">
        <div className="text-white text-2xl font-bold w-full">
          <div className="flex flex-row justify-between">
            <div>{posting.company || "Carwale"}</div>
          </div>
          <Divider sx={{ borderColor: "white", opacity: "50%" }} />
        </div>
        <div className="text-white text-lg">{posting.title}</div>
        <div className="text-white opacity-75">{posting.desc}</div>
        <Divider sx={{ borderColor: "white", opacity: "50%", width: "100%" }} />
        <div className="text-white opacity-50">{posting.loc}</div>
      </div>
    </Link>
  )
}

const Postings = () => {
  const [list, setList] = useState<Posting[]>([])
  const [listStatus, setListStatus] = useState<"LOADING" | "IDLE" | "ERROR">(
    "IDLE",
  )
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const config: ConfigType = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      RefreshToken: "",
      "Content-Type": "application/json",
    },
  }
  const fetchPostings = async () => {
    setListStatus("LOADING")
    try {
      const response = await axios.get("/api/postings?status=APPROVED", config)
      setList(response.data)
      setListStatus("IDLE")
    } catch (error) {
      console.log(error)
      setListStatus("ERROR")
    }
  }
  useEffect(() => {
    fetchPostings()
  }, [])
  const handleDelete = async (id: number) => {
    setListStatus("LOADING")
    try {
      const response = await axios.delete(`/api/posting/${id}`, config)
      setList(state => state.filter(it => it.id !== id))
      setListStatus("IDLE")
    } catch (error) {
      console.log(error)
      setListStatus("IDLE")
    }
  }
  return (
    <Wrapper>
      <div className="grid grid-cols-10 h-[83.5vh] mt-4 mr-6">
        <div className="col-span-7">
          <div className="text-3xl font-extrabold text-content-dark mb-4">
            Job Postings
          </div>
          <Divider
            sx={{ borderColor: "#052238", opacity: "50%", width: "80%" }}
          />
          {listStatus === "LOADING" && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-1/3 h-1/3 shadow-custom flex flex-col space-y-4 items-center justify-center rounded-2xl bg-content-dark">
                <div className="text-xl text-white">Loading...</div>
                <CircularProgress className="mr-1" />
              </div>
            </div>
          )}
          {listStatus === "IDLE" && list.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-1/2 h-1/2 shadow-custom flex flex-col space-y-4 items-center justify-center rounded-2xl bg-content-dark border-4 border-white">
                <img src="/404.png" alt="404" className="rounded-xl" />
                <div className="text-xl text-white">No Job Postings found</div>
              </div>
            </div>
          )}
          {listStatus === "IDLE" && list.length > 0 && (
            <div>
              {list.map(posting => (
                <PostingItem
                  posting={posting}
                  key={posting.id}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
          {listStatus === "ERROR" && (
            <div className="w-full h-full flex items-center justify-center text-xl text-white ">
              <Link to="/home">
                <span className="bg-content-dark/60 px-4 py-2 rounded-md">
                  Oops! Some error occurred. Go back
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-3">
          <EventBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Postings
