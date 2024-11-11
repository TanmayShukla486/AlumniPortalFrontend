import React, { useEffect, useState } from "react"
import Wrapper2 from "../../components/wrapper/Wrapper2"
import Wrapper from "../../components/wrapper/Wrapper"
import EventBox from "../home/components/Event"
import axios from "axios"
import { useAppSelector } from "../../redux/hooks"
import { selectToken, selectUsername } from "../../../features/user/userSlice"
import { ConfigType } from "../../../features/profile/profileSlice"
import AlumniItem from "./components/alumni-item"

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
  const fetchAlumni = async () => {
    const config: ConfigType = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        RefreshToken: "",
      },
    }
    const response = await axios.get("http://localhost:8080/api/alumni", config)
    setAlumniList(response.data)
    setAlumniList(list => list.filter(it => it.username !== username))
  }

  useEffect(() => {
    fetchAlumni()
  }, [])
  return (
    <Wrapper>
      <div className="grid grid-cols-10 pr-2 gap-x-4 mt-4 h-[83.5vh]">
        <div className="col-span-7">
          <div className="grid grid-cols-3 gap-x-2">
            {alumniList.length > 0 &&
              alumniList.map((alumni, index) => (
                <AlumniItem alumni={alumni} key={index} />
              ))}
            {alumniList.length === 0 && <div>No Alumni found</div>}
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
