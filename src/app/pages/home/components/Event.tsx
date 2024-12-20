import { Card, Skeleton } from "@mui/material"

import React, { useEffect } from "react"
import EventItem from "../../../components/reusable/event-item"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  getEvents,
  selectEventList,
  selectEventListStatus,
} from "../../../../features/events/eventSlice"
import { selectToken } from "../../../../features/user/userSlice"

const EventBox = () => {
  const events = useAppSelector(selectEventList)
  const eventListStatus = useAppSelector(selectEventListStatus)
  const errorMessage = "Error Occurred"
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getEvents(token))
  }, [])
  return (
    <div className="px-4 pb-8 pt-4 bg-gradient-to-b from-bg-light to-content-light rounded-2xl h-full border-4 border-content-light shadow-default">
      <div className="font-bold bg-transparent text-3xl">
        <span className="bg-gradient-to-br from-white to-content-light bg-clip-text text-transparent">
          Events
        </span>
      </div>
      <div className="h-full overflow-y-scroll my-2 hide-scrollbar text-content-dark">
        {eventListStatus === "ERROR" && (
          <div className="text-white opacity-65">Couldn't fetch events</div>
        )}
        {eventListStatus === "LOADING" && (
          <div>
            <div>
              <Skeleton className="w-full" sx={{ height: "56px" }} />
              <Skeleton className="w-full" sx={{ height: "56px" }} />
              <Skeleton className="w-full" sx={{ height: "56px" }} />
            </div>
          </div>
        )}
        {eventListStatus === "IDLE" &&
          events.length > 0 &&
          events.map((event, index) => (
            <EventItem title={event.title} key={index} />
          ))}
        {eventListStatus === "IDLE" && events.length === 0 && (
          <div className="text-white opacity-70">No upcoming events</div>
        )}
      </div>
    </div>
  )
}

export default EventBox
