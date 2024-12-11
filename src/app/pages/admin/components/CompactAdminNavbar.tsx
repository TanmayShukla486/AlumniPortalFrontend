import { Input, SvgIcon, TextField } from "@mui/material"
import React, { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Paper from "@mui/material/Paper"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import { Navigate, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { selectCategories } from "../../../../features/categories/categorySlice"
import { logout } from "../../../../features/user/userSlice"

const CompactAdminNavbar = () => {
  const [categoryParam, setCategoryParam] = useState<string>("")
  const categories = useAppSelector(selectCategories)
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false)
  const [viewFlaggedContent, setViewFlaggedContent] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="w-[84.5vw] h-12 border-b-2 border-white -ml-[18px] bg-gradient-to-tr from-bg-dark to-bg-light flex justify-end flex-row items-center space-x-4 px-4">
      {viewFlaggedContent && <Navigate to="/admin/flagged" />}
      {/* <div className="text-white hover:bg-content-light px-4 rounded-full hover:text-content-dark transition-colors duration-300 ease-in cursor-pointer">
        <button onClick={() => setViewFlaggedContent(true)}>
          Flagged Content
        </button>
      </div> */}
      <div className="text-white hover:bg-content-light px-4 rounded-full hover:text-content-dark transition-colors duration-300 ease-in cursor-pointer">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default CompactAdminNavbar
