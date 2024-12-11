import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "../home/components/Event"
import axios from "axios"
import { useAppSelector } from "../../redux/hooks"
import { selectToken, selectUsername } from "../../../features/user/userSlice"
import { ConfigType } from "../../../features/profile/profileSlice"
import AlumniItem from "./components/alumni-item"
import { Alert, Divider, Skeleton, Snackbar } from "@mui/material"
import { Link } from "react-router-dom"

export interface CompactAlumniDetails {
  name: string
  graduationYear: number
  username: string
  yearsOfExp: number
  followers: number
}

const AlumniSkeleton = () => {
  return (
    <div className="grid grid-cols-3 w-full h-36 gap-4">
      <Skeleton className="col-span-1" />
      <Skeleton className="col-span-1" />
      <Skeleton className="col-span-1" />
    </div>
  )
}

const AlumniDisplay = () => {
  const [alumniList, setAlumniList] = useState<CompactAlumniDetails[]>([])
  const [alumniStatus, setAlumniStatus] = useState<
    "LOADING" | "IDLE" | "ERROR"
  >("IDLE")
  const [error, setError] = useState<string>("")
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const username = useAppSelector(selectUsername)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const config: ConfigType = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      RefreshToken: "",
    },
  }
  const fetchAlumni = async () => {
    try {
      setAlumniStatus("LOADING")
      const response = await axios.get(
        "http://localhost:8080/api/alumni",
        config,
      )
      setAlumniStatus("IDLE")
      setAlumniList(response.data)
      setAlumniList(list => list.filter(it => it.username !== username))
    } catch (error) {
      setAlumniStatus("ERROR")
      setAlertOpen(true)
      if (error instanceof Error) setError(error.message)
    }
  }

  const [year, setYear] = useState<number>()
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const years = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => new Date().getFullYear() - i,
  )
  useEffect(() => {
    fetchAlumni()
  }, [])

  const createQuery = () => {
    if (!search && !year) return "http://localhost:8080/api/alumni"
    if (search && year)
      return `http://localhost:8080/api/alumni?name=${search}&year=${year}`
    else if (year) return `http://localhost:8080/api/alumni?year=${year}`
    return `http://localhost:8080/api/alumni?name=${search}`
  }

  useEffect(() => {
    const fetchSelectiveAlumni = async () => {
      try {
        const query = createQuery()
        if (query === "") return
        setAlumniStatus("LOADING")
        const response = await axios.get(query, config)
        setAlumniList(response.data)
        setAlumniList(list =>
          list.filter(alumni => alumni.username !== username),
        )
        setAlumniStatus("IDLE")
      } catch (error) {
        setAlumniStatus("ERROR")
        setAlertOpen(true)
        if (error instanceof Error) setError(error.message)
      }
    }

    const handler = setTimeout(() => fetchSelectiveAlumni(), 500)

    return () => clearTimeout(handler)
  }, [year, search])
  return (
    <Wrapper>
      <div className="grid grid-cols-10 pr-2 gap-x-4 mt-4 h-[83.5vh]">
        <div className="col-span-7">
          <div className="w-full bg-content-dark h-16 border-2 border-white/80 rounded-xl flex flex-row justify-center items-center px-4 space-x-3">
            <div className="w-1/2 flex flex-row items-center justify-center space-x-8">
              <div className="text-white text-md">Username:</div>
              <input
                className="p-4 rounded-2xl h-10"
                placeholder="Enter username"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Divider orientation="vertical" sx={{ borderColor: "white" }} />
            <div className="w-1/2 flex flex-row items-center justify-center space-x-8">
              <div className="text-white text-md">Graduation Year:</div>
              <div className="flex flex-col items-center justify-center">
                <button
                  className="text-content-dark bg-white px-4 py-2 rounded-xl text-md"
                  onClick={() => setIsHidden(!isHidden)}
                >
                  {year !== undefined && year}
                  {year === undefined && "All Years"}
                </button>
                <ul
                  className={`${isHidden ? "hidden" : "block"} absolute overflow-scroll hide-scrollbar h-20 bg-content-light mt-28 py-2 rounded-md w-16 flex flex-col items-center border-2 border-white/80`}
                >
                  <li
                    className="text-center cursor-pointer py-2"
                    onClick={() => {
                      setYear(undefined)
                      setIsHidden(!isHidden)
                    }}
                  >
                    All
                    <Divider
                      sx={{
                        borderColor: "white",
                        opacity: "50%",
                        width: "3.5rem",
                      }}
                    />
                  </li>
                  {years.map(year => (
                    <li
                      key={year}
                      onClick={() => {
                        setYear(year)
                        setIsHidden(!isHidden)
                      }}
                      className="text-center cursor-pointer py-2"
                    >
                      {year}
                      <Divider
                        sx={{
                          borderColor: "white",
                          opacity: "50%",
                          width: "3.5rem",
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2 mt-4">
            {alumniStatus === "LOADING" && (
              <div className="w-full col-span-3">
                <AlumniSkeleton />
              </div>
            )}
            {alumniStatus === "IDLE" &&
              alumniList.length > 0 &&
              alumniList.map((alumni, index) => (
                <AlumniItem alumni={alumni} key={index} />
              ))}
            {alumniStatus === "IDLE" && alumniList.length === 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center col-span-3 mt-24 text-2xl font-bold ">
                <div className="shadow-custom p-4 rounded-xl bg-content-dark text-center">
                  <img src="/404.png" alt="404" className="rounded-2xl" />
                  <div className="mt-2 text-white">No Alumni found</div>
                </div>
              </div>
            )}
            {alumniStatus === "ERROR" && (
              <div className="w-full h-full col-span-3 flex items-center justify-center">
                <Snackbar
                  open={alertOpen}
                  autoHideDuration={1500}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    severity="error"
                    variant="filled"
                    className="cursor-pointer"
                    onClick={() => setAlertOpen(!alertOpen)}
                  >
                    {error === "" ? "Error Occurred" : error}
                  </Alert>
                </Snackbar>
                <Link to="/home">
                  <span className="bg-content-dark px-4 py-2 rounded-md text-white">
                    Some Error Occurred. Go back
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className=" col-span-3 text-white">
          <EventBox />
        </div>
      </div>
    </Wrapper>
  )
}

export default AlumniDisplay
