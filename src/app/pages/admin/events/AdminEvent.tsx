import React, { useEffect, useState } from "react"
import AdminWrapper2 from "../components/AdminWrapper2"
import { Input, Skeleton, TextField } from "@mui/material"
import EventItem from "../../../components/reusable/event-item"
import EventItemAdmin from "./components/event-item"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  addEvent,
  getEvents,
  removeEvent,
  selectEventList,
  selectEventListStatus,
} from "../../../../features/events/eventSlice"
import { selectToken } from "../../../../features/user/userSlice"

const AdminEvent = () => {
  const inputsx = {}
  const dispatch = useAppDispatch()
  const eventList = useAppSelector(selectEventList)
  const eventListStatus = useAppSelector(selectEventListStatus)
  const [eventTitle, setEventTitle] = useState<string>("")
  const [eventDesc, setEventDesc] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const handleAddEvent = () => {
    if (!eventTitle || !eventDesc || !date) return
    console.log("HERE")
    dispatch(
      addEvent({
        token,
        data: { title: eventTitle, content: eventDesc, date: date },
      }),
    )
    setTimeout(() => {
      getEvents(token)
    }, 3000)
  }
  const handleRemoveEvent = (id: number) => {
    dispatch(removeEvent({ id, token }))
  }
  useEffect(() => {
    dispatch(getEvents(token))
  }, [])
  return (
    <AdminWrapper2>
      <div className="grid grid-cols-10 pr-4 h-[88.5vh] gap-x-2">
        <div className="col-span-7 p-4 overflow-y-scroll hide-scrollbar bg-transparent flex flex-col">
          <div className="text-3xl font-extrabold text-transparent bg-gradient-to-br from-bg-light to-bg-dark bg-clip-text">
            Create Event
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-semibold pt-2 pb-2">Event Title</div>
            <Input
              className="w-full"
              placeholder="Enter appropriate title"
              sx={inputsx}
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
            />
          </div>
          <div className="pt-2 flex flex-col">
            <div className="text-lg font-semibold pt-2 pb-2">
              Event Description
            </div>
            <TextField
              multiline
              rows={5}
              className="w-full"
              placeholder="Write a description for the event"
              sx={inputsx}
              value={eventDesc}
              onChange={e => setEventDesc(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="pt-2 flex flex-col">
              <div className="text-lg font-semibold pt-2 pb-2">Event Date</div>
              <TextField
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="pt-2 flex flex-col">
              <button
                className="mt-4 shadow-button mr-4 bg-content-light p-2 font-bold text-white border-2 border-white rounded-xl"
                onClick={handleAddEvent}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-bg-light to-bg-dark col-span-3 text-white p-4 -mt-4 -mr-4 h-[93vh] border-l-2 border-white">
          <div className="text-2xl font-extrabold">Current Events</div>
          {eventListStatus === "LOADING" && (
            <div className="flex flex-col -space-y-4">
              <Skeleton
                className="w-full p-8 h-16 rounded-full"
                sx={{
                  color: "0f0f0f",
                  borderRadius: "16px",
                }}
              />
              <Skeleton
                className="w-full p-8 h-16 rounded-full"
                sx={{
                  color: "0f0f0f",
                  borderRadius: "16px",
                }}
              />
              <Skeleton
                className="w-full p-8 h-16 rounded-full"
                sx={{
                  color: "0f0f0f",
                  borderRadius: "16px",
                }}
              />
            </div>
          )}
          {eventListStatus === "IDLE" && eventList.length === 0 && (
            <div className="mt-4 opacity-50">No events found</div>
          )}
          {eventListStatus === "IDLE" &&
            eventList.length > 0 &&
            eventList.map((event, index) => (
              <EventItemAdmin
                id={event.id}
                title={event.title}
                date={event.date}
                key={index}
                handleDelete={handleRemoveEvent}
              />
            ))}
        </div>
      </div>
    </AdminWrapper2>
  )
}

export default AdminEvent
