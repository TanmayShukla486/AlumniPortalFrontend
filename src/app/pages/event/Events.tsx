import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "../home/components/Event"
import { Posting } from "../jobs/JobPosting"
import { Alert, Divider, Skeleton, Snackbar } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectToken } from "../../../features/user/userSlice"
import { ConfigType } from "../../../features/profile/profileSlice"
import axios from "axios"
import { Link } from "react-router-dom"
import {
  getEvents,
  PortalEvent,
  selectEventList,
  selectEventListStatus,
} from "../../../features/events/eventSlice"

const PostingItem = ({ posting }: { posting: Posting }) => {
  return (
    <Link to={`/job-posting/${posting.id}`}>
      <div className="w-full p-4 border-2 border-white bg-content-dark rounded-xl shadow-custom transition-all duration-300 ease-in-out hover:translate-x-1 cursor-pointer my-2">
        <span className="text-white">{posting.title}</span>
      </div>
    </Link>
  )
}

const JobBoxSkeleton = () => {
  return (
    <div>
      <Skeleton
        className="w-full"
        sx={{
          height: "60px",
        }}
      />
      <Skeleton
        className="w-full"
        sx={{
          height: "60px",
        }}
      />
      <Skeleton
        className="w-full"
        sx={{
          height: "60px",
        }}
      />
    </div>
  )
}

const JobBox = () => {
  const [list, setList] = useState<Posting[]>([])
  const [listStatus, setListStatus] = useState<"LOADING" | "IDLE" | "ERROR">(
    "LOADING",
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
    try {
      setListStatus("LOADING")
      const response = await axios.get("/api/postings?status=APPROVED", config)
      setListStatus("IDLE")
      setList(response.data)
    } catch (error) {
      console.log(error)
      setListStatus("ERROR")
    }
  }
  useEffect(() => {
    fetchPostings()
  }, [])

  return (
    <div className="px-4 pb-8 pt-4 bg-gradient-to-b from-bg-light to-content-light rounded-2xl h-full border-4 border-content-light shadow-default">
      <div className="font-bold bg-transparent text-3xl">
        <span className="bg-gradient-to-br from-white to-content-light bg-clip-text text-transparent">
          Latest Jobs
        </span>
      </div>
      <div className="h-full overflow-y-scroll my-2 hide-scrollbar text-content-dark">
        {listStatus === "ERROR" && (
          <div className="text-white opacity-65">Error While Fetching Jobs</div>
        )}
        {listStatus === "LOADING" && <JobBoxSkeleton />}
        {listStatus === "IDLE" &&
          list.length > 0 &&
          list.map(item => <PostingItem posting={item} />)}
      </div>
    </div>
  )
}

const EventListSkeleton = () => {
  return (
    <div>
      <Skeleton
        className="w-full"
        sx={{ height: "96px", marginTop: "-12px" }}
      />
      <Skeleton
        className="w-full"
        sx={{ height: "96px", marginTop: "-12px" }}
      />
      <Skeleton
        className="w-full"
        sx={{ height: "96px", marginTop: "-12px" }}
      />
    </div>
  )
}

const LargeEventItem = ({ event }: { event: PortalEvent }) => {
  return (
    <div className="w-full bg-content-dark shadow-custom flex flex-col items-start justify-between p-4 rounded-xl border-2 border-white space-y-2">
      <div className="text-white text-xl font-semibold">{event.title}</div>
      <Divider sx={{ borderColor: "white", opacity: "50%", width: "85%" }} />
      <div className="text-white opacity-75">{event.content}</div>
      <div className="text-white opacity-50">{event.date}</div>
    </div>
  )
}

const Events = () => {
  const eventList = useAppSelector(selectEventList)
  const eventListStatus = useAppSelector(selectEventListStatus)
  const [open, setOpen] = useState<boolean>(true)
  const errorMessage = "Error Occurred"
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getEvents(token))
  }, [])
  return (
    <Wrapper>
      <div className="grid grid-cols-10 h-[83.5vh] mt-4 mr-8 gap-x-4">
        <div className="col-span-7 overflow-y-scroll hide-scrollbar space-y-2">
          {eventListStatus === "LOADING" && <EventListSkeleton />}
          {eventListStatus === "ERROR" && (
            <div>
              <div className="w-full h-full text-center mt-16 text-xl ">
                <Link to="/home">
                  <span className="bg-content-dark/60 px-4 py-2 rounded-md text-white">
                    Error Loading Page. Go back
                  </span>
                </Link>
              </div>
              <Snackbar
                open={eventListStatus === "ERROR" && open}
                autoHideDuration={1500}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  severity="error"
                  variant="filled"
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </div>
          )}
          {eventListStatus === "IDLE" && eventList.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-2/5 h-2/5 text-center shadow-custom flex flex-col items-center justify-center rounded-xl bg-content-dark border-2 border-white">
                <img src="/404.png" alt="404" className="rounded-xl" />
                <span className="text-xl font-bold text-white">
                  No events found
                </span>
              </div>
            </div>
          )}
          {eventListStatus === "IDLE" && eventList.length > 0 && (
            <div className="flex flex-col space-y-4">
              {eventList.map(item => (
                <LargeEventItem event={item} />
              ))}
            </div>
          )}
        </div>
        <div className="col-span-3">
          <JobBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default Events
