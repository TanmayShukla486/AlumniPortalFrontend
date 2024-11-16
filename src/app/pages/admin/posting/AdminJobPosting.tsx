import React, { useEffect, useState } from "react"
import AdminWrapper2 from "../components/AdminWrapper2"
import { Posting } from "../../jobs/JobPosting"
import { ConfigType } from "../../../../features/profile/profileSlice"
import { useAppSelector } from "../../../redux/hooks"
import { selectToken } from "../../../../features/user/userSlice"
import axios from "axios"
import { Divider } from "@mui/material"
import { Navigate } from "react-router-dom"

const JobPosting = ({ posting }: { posting: Posting }) => {
  const [redirect, setRedirect] = useState<boolean>(false)

  return (
    <div
      className="col-span-1 bg-content-dark border-2 border-white rounded-xl p-4 text-white flex flex-col justify-between cursor-pointer"
      onClick={() => setRedirect(true)}
    >
      {redirect && <Navigate to={`/admin/job-posting/${posting.id}`} />}
      <div className="text-xl font-bold">{posting.title}</div>
      <div className="text-sm overflow-hidden">
        {posting.desc.substring(0, 40)}...
      </div>
      <div className="font-bold opacity-50">{posting.loc}</div>
    </div>
  )
}

const AdminJobPosting = () => {
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const [postingList, setPostingList] = useState<Posting[]>([])
  const config: ConfigType = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      RefreshToken: "",
    },
  }
  useEffect(() => {
    const fetchList = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/postings",
        config,
      )
      setPostingList(response.data)
    }
    fetchList()
  }, [])
  const rejected = postingList.filter(item => item.status === "REJECTED")
  const accepted = postingList.filter(item => item.status === "APPROVED")
  const pending = postingList.filter(item => item.status === "PENDING")
  return (
    <AdminWrapper2>
      <div className="grid grid-cols-10 h-[88.5vh] w-full gap-x-4 pr-4">
        <div className="col-span-7 border-2 border-white p-4 bg-gradient-to-b from-white/50 to-content-dark/50 rounded-xl">
          <div className="text-content-dark text-2xl font-bold">
            Pending Postings
          </div>
          <Divider
            sx={{
              borderColor: "#052238",
              marginTop: "4px",
            }}
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {pending.length > 0 &&
              pending.map(posting => <JobPosting posting={posting} />)}
            {pending.length === 0 && <div>No rejected postings</div>}
          </div>
        </div>
        <div className="col-span-3 border-2 border-white shadow-custom rounded-xl bg-gradient-to-b from-bg-dark to-bg-light p-4 ">
          <div className="text-white text-xl font-bold">Rejected Postings</div>
          <Divider sx={{ borderColor: "white", opacity: "50%" }} />
          <div>
            {rejected.length > 0 &&
              rejected.map(item => (
                <div
                  className="text-content-dark bg-white/80 rounded-md p-2 m-2"
                  key={item.id}
                >
                  <div className="text-lg">Carwale</div>
                  <div className="text-md opacity-80">
                    Associate Software Engineer
                  </div>
                  <div className="text-sm opacity-50">Pune, Maharashtra</div>
                </div>
              ))}
            {rejected.length === 0 && (
              <div className="text-sm text-white opacity-50 mt-2">
                No rejected job postings
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminWrapper2>
  )
}

export default AdminJobPosting
