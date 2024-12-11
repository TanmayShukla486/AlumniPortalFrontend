import axios from "axios"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { ConfigType } from "../profile/profileSlice"

export interface PortalEvent {
  title: string
  content: string
  date: string
  id: number
}
export interface EventInput {
  title: string
  content: string
  date: string
}
export interface EventState {
  events: PortalEvent[]
  status: "IDLE" | "LOADING" | "ERROR"
}

const initialState: EventState = {
  events: [],
  status: "IDLE",
}

export const eventSlice = createAppSlice({
  name: "events",
  initialState,
  reducers: create => ({
    getEvents: create.asyncThunk<PortalEvent[], string>(
      async token => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            RefreshToken: "",
          },
        }
        const response = await axios.get("/admin/events", config)
        return response.data
      },
      {
        pending: state => {
          state.status = "LOADING"
        },
        fulfilled: (state, action) => {
          state.events = action.payload
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    addEvent: create.asyncThunk<string, { token: string; data: EventInput }>(
      async ({ token, data }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            RefreshToken: "",
          },
        }
        const response = await axios.post(
          "/admin/events",
          JSON.stringify(data),
          config,
        )
        return response.data
      },
      {
        pending: state => {
          state.status = "IDLE"
        },
        fulfilled: (state, action) => {
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    removeEvent: create.asyncThunk<string, { token: string; id: number }>(
      async ({ token, id }) => {
        const config: ConfigType = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            RefreshToken: "",
          },
        }
        const response = await axios.delete(`/admin/events/${id}`, config)
        return response.data
      },
      {
        pending: state => {
          state.status = "IDLE"
        },
        fulfilled: (state, action) => {
          state.status = "IDLE"
        },
        rejected: state => {
          state.status = "ERROR"
        },
      },
    ),
    filterEvent: create.reducer<{ id: number }>((state, action) => {
      const { id } = action.payload
      state.events = state.events.filter(it => it.id !== id)
    }),
  }),
  selectors: {
    selectEventList: events => events.events,
    selectEventListStatus: events => events.status,
  },
})

export const { getEvents, addEvent, removeEvent, filterEvent } =
  eventSlice.actions
export const { selectEventList, selectEventListStatus } = eventSlice.selectors
