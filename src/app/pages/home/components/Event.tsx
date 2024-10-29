import { Card } from "@mui/material"

import React from "react"
import EventItem from "../../../components/reusable/event-item"

export interface NewsEvent {
  title: string
}

const events: NewsEvent[] = [
  {
    title: "Admissions open",
  },
  {
    title: "Test even open",
  },
  {
    title: "Raas festival",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
  {
    title: "Placement season begins",
  },
]

const EventBox = () => {
  return (
    <Card
      className="h-3/4 px-4 pb-8 pt-4"
      sx={{
        borderRadius: "16px",
        backgroundColor: "#232d3f",
      }}
    >
      <div className="font-bold bg-transparent text-3xl">
        <span className="bg-gradient-to-br from-white to-content-light bg-clip-text text-transparent">
          Events
        </span>
      </div>
      <div className="h-full overflow-y-scroll my-2 hide-scrollbar ">
        {events.map((event, index) => (
          <EventItem title={event.title} key={index} />
        ))}
      </div>
    </Card>
  )
}

export default EventBox
