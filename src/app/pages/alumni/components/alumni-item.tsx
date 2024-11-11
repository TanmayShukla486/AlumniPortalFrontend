import React, { useState } from "react"
import { CompactAlumniDetails } from "../AlumniDisplay"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Divider, SvgIcon } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import LoyaltyIcon from "@mui/icons-material/Loyalty"
import { Navigate } from "react-router-dom"

const AlumniItem = ({ alumni }: { alumni: CompactAlumniDetails }) => {
  const [redirect, setRedirect] = useState<boolean>(false)

  return (
    <div
      className="w-full bg-content-dark col-span-1 h-28 flex flex-col justify-between items-start p-4 rounded-xl border-2 border-white text-white cursor-pointer"
      onClick={() => setRedirect(true)}
    >
      {redirect && <Navigate to={`/user/${alumni.username}`} />}
      <div className="text-white flex flex-row items-center justify-between space-x-2 text-xl">
        <SvgIcon component={AccountCircleIcon} />
        <div>{alumni.name}</div>
      </div>
      <div className="bg-white w-[90%] mt-2">
        <Divider
          className="bg-white"
          variant="middle"
          sx={{
            borderColor: "white",
          }}
        />
      </div>
      <div className="mt-2 w-full flex flex-row items-center justify-between">
        <div className="w-20 bg-slate-500 rounded-xl flex flex-row items-center justify-around p-1">
          <SvgIcon component={SchoolIcon} />
          {alumni.graduationYear}
        </div>
        <div className="w-20 bg-slate-500 rounded-xl flex flex-row items-center justify-around p-1">
          <SvgIcon component={LoyaltyIcon} />
          {alumni.followers}
        </div>
      </div>
    </div>
  )
}

export default AlumniItem
