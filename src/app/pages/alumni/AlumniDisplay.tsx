import React, { useEffect, useState } from "react"
import Wrapper2 from "../../components/wrapper/Wrapper2"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "../home/components/Event"
import axios from "axios"
import { useAppSelector } from "../../redux/hooks"
import { selectToken, selectUsername } from "../../../features/user/userSlice"
import { ConfigType } from "../../../features/profile/profileSlice"
import AlumniItem from "./components/alumni-item"
import { Divider, TextField } from "@mui/material"

export interface CompactAlumniDetails {
  name: string
  graduationYear: number
  username: string
  yearsOfExp: number
  followers: number
}

const AlumniDisplay = () => {
  const [alumniList, setAlumniList] = useState<CompactAlumniDetails[]>([])
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
    const response = await axios.get("http://localhost:8080/api/alumni", config)
    setAlumniList(response.data)
    setAlumniList(list => list.filter(it => it.username !== username))
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
      const query = createQuery()
      if (query === "") return
      const response = await axios.get(query, config)
      setAlumniList(response.data)
      setAlumniList(list => list.filter(alumni => alumni.username !== username))
    }

    const handler = setTimeout(() => fetchSelectiveAlumni(), 500)

    return () => clearTimeout(handler)
  }, [year, search])
  return (
    <Wrapper>
      <div className="grid grid-cols-10 pr-2 gap-x-4 mt-4 h-[83.5vh]">
        <div className="col-span-7">
          <div className="w-full bg-content-dark h-20 border-2 border-white/80 rounded-xl flex flex-row justify-center items-center px-4 space-x-3">
            <div className="w-1/2 flex flex-row items-center justify-center space-x-8">
              <div className="text-white text-xl">Username:</div>
              <input
                className="p-4 rounded-2xl"
                placeholder="Enter username"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Divider orientation="vertical" sx={{ borderColor: "white" }} />
            <div className="w-1/2 flex flex-row items-center justify-center space-x-8">
              <div className="text-white text-xl">Graduation Year:</div>
              <div className="flex flex-col items-center justify-center">
                <button
                  className="text-content-dark bg-white px-4 py-2 rounded-xl text-xl"
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
            {alumniList.length > 0 &&
              alumniList.map((alumni, index) => (
                <AlumniItem alumni={alumni} key={index} />
              ))}
            {alumniList.length === 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center col-span-3 mt-24 text-2xl font-bold ">
                <div className="shadow-custom p-4 rounded-xl bg-content-dark text-center">
                  <img src="/404.png" alt="404" className="rounded-2xl" />
                  <div className="mt-2 text-white">No Alumni found</div>
                </div>
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
