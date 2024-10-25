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
      className="h-[calc(100%-10rem)]  w-full border-4 border-primary-dark px-4 py-2"
      sx={{
        borderRadius: "16px",
      }}
    >
      <div className="font-bold bg-transparent text-3xl">
        <span className="bg-gradient-to-r from-primary-dark to-bg-primary bg-clip-text text-transparent">
          Events
        </span>
      </div>
      <div className="h-full overflow-y-scroll my-2 hide-scrollbar ">
        {events.map(event => (
          <EventItem title={event.title} />
        ))}
      </div>
    </Card>
  )
}

export default EventBox
