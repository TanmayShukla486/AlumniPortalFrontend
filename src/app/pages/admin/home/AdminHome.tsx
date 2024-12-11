import React, { useEffect, useState } from "react"
import AdminWrapper from "../components/AdminWrapper"
import { Divider, Skeleton } from "@mui/material"
import { useAppSelector } from "../../../redux/hooks"
import { selectToken } from "../../../../features/user/userSlice"
import { ConfigType } from "../../../../features/profile/profileSlice"
import axios from "axios"
import { Link } from "react-router-dom"
import UserTag from "../../../components/reusable/user-taglink"

interface Stats {
  numberOfUsers: number
  numberOfStudents: number
  numberOfAlumni: number
  numberOfBlogs: number
  numberOfComments: number
  numberOfCategories: number
  numberOfEvents: number
  numberOfPostings: number
  rejectedPostings: number
  acceptedPostings: number
  pendingPostings: number
}

const StatsSkeleton = () => {
  return (
    <div className="flex flex-col w-full px-4 h-full">
      <Skeleton className="w-full rounded-md" sx={{ height: "56px" }} />
      <Skeleton className="w-full rounded-md" sx={{ height: "56px" }} />
      <Skeleton className="w-full rounded-md" sx={{ height: "56px" }} />
    </div>
  )
}

interface CompactUser {
  username: string
  email: string
  role: string
}

interface People {
  students: CompactUser[]
  alumni: CompactUser[]
}

interface CompactContent {
  id: number
  username: string
  title: string
  createdAt: string
  content: string
}

interface Content {
  blogs: CompactContent[]
  comments: CompactContent[]
}

interface CompactInfo {
  id: number
  title: string
  info: string
}

interface Info {
  events: CompactInfo[]
  jobs: CompactInfo[]
}

const PeopleDisplay = ({ users }: { users: CompactUser[] }) => {
  if (users.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/404.png" alt="404" className="rounded-lg" />
        <div className="text-xl text-content-dark font-bold">
          No Users Found
        </div>
      </div>
    )
  return (
    <div className="grid grid-cols-4 overflow-y-scroll hide-scrollbar gap-4 p-6">
      {users.map((item, index) => (
        <Link to={`/user/${item.username}`} key={index}>
          <div className="bg-content-dark/60 shadow-custom-inset col-span-1 p-3 rounded-md border-2 border-white/80">
            <span className="text-white">{item.username}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

const BlogDisplay = ({ blogs }: { blogs: CompactContent[] }) => {
  if (blogs.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/404.png" alt="404" className="rounded-lg" />
        <div className="text-xl text-content-dark font-bold">
          No Blogs Found
        </div>
      </div>
    )
  return (
    <div className="grid grid-cols-3 overflow-y-scroll hide-scrollbar gap-4 p-6">
      {blogs.map((item, index) => (
        <Link to={`/feed/${item.id}}`} key={index}>
          <div className="bg-content-dark/60 shadow-custom-inset col-span-1 p-3 rounded-md border-2 border-white/80 flex flex-col justify-between space-y-2 h-fit">
            <div className="text-white event-item">{item.title}</div>
            <Divider sx={{ borderColor: "white", opacity: "50%" }} />
            <div className="text-white opacity-50 event-item">
              {item.content}
            </div>
            <Divider sx={{ borderColor: "white", opacity: "50%" }} />
            <div className="text-white opacity-50">
              <Link to={`/user/${item.username}`}>@{item.username}</Link>
            </div>
            <div className="text-white opacity-25">{item.createdAt}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
const CommentDisplay = ({ comments }: { comments: CompactContent[] }) => {
  if (comments.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/404.png" alt="404" className="rounded-lg" />
        <div className="text-xl text-content-dark font-bold">
          No Comments Found
        </div>
      </div>
    )
  return (
    <div className="grid grid-cols-4 overflow-y-scroll hide-scrollbar gap-4 p-6">
      {comments.map((item, index) => (
        <Link to={`/feed/${item.id}}`} key={index}>
          <div className="bg-content-dark/60 shadow-custom-inset col-span-1 p-3 rounded-md border-2 border-white/80 flex flex-col justify-between space-y-2 h-fit">
            <div className="text-white event-item">{item.title}</div>
            <Divider sx={{ borderColor: "white", opacity: "50%" }} />
            <div className="text-white opacity-50 event-item">
              {item.content}
            </div>
            <Divider sx={{ borderColor: "white", opacity: "50%" }} />
            <div className="text-white opacity-50">
              <Link to={`/user/${item.username}`}>@{item.username}</Link>
            </div>
            <div className="text-white opacity-25">{item.createdAt}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
const InfoDisplay = ({ info }: { info: CompactInfo[] }) => {
  if (info.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/404.png" alt="404" className="rounded-lg" />
        <div className="text-xl text-content-dark font-bold">
          No Comments Found
        </div>
      </div>
    )
  return (
    <div className="grid grid-cols-4 overflow-y-scroll hide-scrollbar gap-4 p-6">
      {info.map((item, index) => (
        <Link to={`/job-posting/all`} key={index}>
          <div
            className={` ${item.info === "APPROVED" ? "bg-green-600" : item.info === "REJECTED" ? "bg-red-700" : "bg-content-dark/60"} shadow-custom-inset col-span-1 p-3 rounded-md border-2 border-white/80 h-24 overflow-hidden flex flex-col justify-between items-start`}
          >
            <div className="text-white font-bold">{item.title}</div>
            <div>
              <Divider
                sx={{ borderColor: "#052238", opacity: "50%", width: "100%" }}
              />
            </div>
            <div className="text-sm opacity-50">Id: {item.id}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
const EventDisplay = ({ info }: { info: CompactInfo[] }) => {
  if (info.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/404.png" alt="404" className="rounded-lg" />
        <div className="text-xl text-content-dark font-bold">
          No Events Found
        </div>
      </div>
    )
  return (
    <div className="grid grid-cols-4 overflow-y-scroll hide-scrollbar gap-4 p-6">
      {info.map((item, index) => (
        <Link to={`/events`} key={index}>
          <div className="bg-content-dark/60 shadow-custom-inset col-span-1 p-3 rounded-md border-2 border-white/80">
            <div className="text-white">{item.title}</div>
            <Divider sx={{ borderColor: "white", opacity: "50%" }} />
          </div>
        </Link>
      ))}
    </div>
  )
}

const AdminHome = () => {
  const [selectedSide, setSelectedSide] = useState<"Stats" | "Other">("Stats")
  const [selectedMain, setSelectedMain] = useState<
    "Students" | "Alumni" | "Blogs" | "Comments" | "Postings" | "Events"
  >("Students")
  const [stats, setStats] = useState<Stats>()
  const [statStatus, setStatStatus] = useState<"IDLE" | "LOADING" | "ERROR">(
    "IDLE",
  )
  const [peopleList, setPeopleList] = useState<People>()
  const [peopleStatus, setPeopleStatus] = useState<
    "IDLE" | "LOADING" | "ERROR"
  >("LOADING")
  const [contentList, setContentList] = useState<Content>()
  const [contentStatus, setContentStatus] = useState<
    "IDLE" | "LOADING" | "ERROR"
  >("LOADING")
  const [infoList, setInfoList] = useState<Info>()
  const [infoStatus, setInfoStatus] = useState<"IDLE" | "LOADING" | "ERROR">(
    "LOADING",
  )
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
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatStatus("LOADING")
        const response = await axios.get("/admin/stats", config)
        setStatStatus("IDLE")
        setStats(response.data)
      } catch (error) {
        setStatStatus("ERROR")
      }
    }
    const fetchPeople = async () => {
      try {
        setPeopleStatus("LOADING")
        const response = await axios.get("/admin/users", config)
        setPeopleStatus("IDLE")
        setPeopleList(response.data)
      } catch (error) {
        setPeopleStatus("ERROR")
      }
    }
    const fetchContent = async () => {
      try {
        setContentStatus("LOADING")
        const response = await axios.get("/admin/content", config)
        setContentStatus("IDLE")
        setContentList(response.data)
      } catch (error) {
        setContentStatus("ERROR")
      }
    }
    const fetchInfo = async () => {
      try {
        setInfoStatus("LOADING")
        const response = await axios.get("/admin/important", config)
        setInfoStatus("IDLE")
        setInfoList(response.data)
      } catch (error) {
        setInfoStatus("ERROR")
      }
    }
    fetchInfo()
    fetchContent()
    fetchPeople()
    fetchStats()
  }, [])
  return (
    <AdminWrapper>
      <div className="w-full py-4 pl-4 px-8 h-[83.5vh]">
        <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-black to-blue-600 bg-clip-text">
          Welcome Administrator
          <Divider sx={{ borderColor: "#052238" }} />
        </div>
        <div className="grid grid-cols-10 h-full w-full pt-4 pb-10 gap-x-4">
          <div className="col-span-3 border-4 border-content-dark w-full h-full shadow-custom rounded-md bg-gradient-to-b from-content-light/60 to-white">
            <div className="flex flex-row items-center justify-around text-lg border-b-2 border-content-dark">
              <button
                className={`${selectedSide === "Stats" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedSide("Stats")
                }}
              >
                Stats
              </button>
              <button
                className={`${selectedSide === "Other" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedSide("Other")
                }}
              >
                Other
              </button>
            </div>
            <div className="w-full overflow-y-scroll hide-scrollbar h-full flex flex-col items-start justify-start px-4 py-2 space-y-2">
              {statStatus === "LOADING" && <StatsSkeleton />}
              {statStatus === "IDLE" && selectedSide === "Stats" && (
                <>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Users : {stats?.numberOfUsers}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Alumni : {stats?.numberOfAlumni}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Students : {stats?.numberOfStudents}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Job Postings : {stats?.acceptedPostings}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Rejected Postings : {stats?.rejectedPostings}
                    </span>
                  </div>
                </>
              )}
              {statStatus === "IDLE" && selectedSide === "Other" && (
                <>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Blogs : {stats?.numberOfBlogs}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Comments : {stats?.numberOfComments}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Categories : {stats?.numberOfCategories}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Events : {stats?.numberOfEvents}
                    </span>
                  </div>
                  <div className="bg-content-dark/60 w-full p-2 rounded-md shadow-custom-inset border-2 border-white/80">
                    <span className="text-white/80">
                      Number Of Postings(Acc+Rej): {stats?.numberOfPostings}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-span-7 border-4 border-content-dark w-full shadow-custom rounded-md bg-gradient-to-b from-content-light/60 to-white">
            <div className="flex flex-row items-center justify-around text-lg border-b-2 border-content-dark">
              <button
                className={`${selectedMain === "Students" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedMain("Students")
                }}
              >
                Students
              </button>
              <button
                className={`${selectedMain === "Alumni" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedMain("Alumni")
                }}
              >
                Alumni
              </button>
              <button
                className={`${selectedMain === "Blogs" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedMain("Blogs")
                }}
              >
                Blogs
              </button>
              <button
                className={`${selectedMain === "Comments" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedMain("Comments")
                }}
              >
                Comments
              </button>
              <button
                className={`${selectedMain === "Events" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedMain("Events")
                }}
              >
                Events
              </button>
              <button
                className={`${selectedMain === "Postings" ? "bg-content-dark/60" : ""} text-white font-bold w-full py-2`}
                onClick={() => {
                  setSelectedMain("Postings")
                }}
              >
                Postings
              </button>
            </div>
            {selectedMain === "Students" && peopleList && (
              <PeopleDisplay users={peopleList?.students} />
            )}
            {selectedMain === "Alumni" && peopleList && (
              <PeopleDisplay users={peopleList?.alumni} />
            )}
            {selectedMain === "Blogs" && contentList && (
              <BlogDisplay blogs={contentList?.blogs} />
            )}
            {selectedMain === "Comments" && contentList && (
              <CommentDisplay comments={contentList?.comments} />
            )}
            {selectedMain === "Events" && infoList && (
              <EventDisplay info={infoList?.events} />
            )}
            {selectedMain === "Postings" && infoList && (
              <InfoDisplay info={infoList?.jobs} />
            )}
          </div>
        </div>
      </div>
    </AdminWrapper>
  )
}

export default AdminHome
