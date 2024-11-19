import { Alert, Input, Snackbar, SvgIcon, TextField } from "@mui/material"
import React, { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Paper from "@mui/material/Paper"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import { Navigate, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectCategories } from "../../../features/categories/categorySlice"
import { logout } from "../../../features/user/userSlice"

const menuItems = ["Author", "Title"]

const CompactNavbar = () => {
  const [search, setSearch] = useState<string>("")
  const [searchParam, setSearchParam] = useState<"Author" | "Title">("Title")
  const [categoryParam, setCategoryParam] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [redirect, setRedirect] = useState<boolean>(false)
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false)
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !redirect) setRedirect(true)
  }
  const [logut, setLogout] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation()
  return (
    <div className="w-[84.5vw] h-12 border-b-2 border-white -ml-[18px] bg-gradient-to-tr from-bg-dark to-bg-light flex flex-row justify-start items-center px-4">
      {redirect && (
        <Navigate
          to={`/feed/search?${searchParam.toLowerCase()}=${search}${categoryParam !== "" ? `&category=${categoryParam}` : ""}`}
        />
      )}
      {open && (
        <div>
          <Snackbar
            open
            autoHideDuration={1500}
            onClose={() => setLogout(true)}
          >
            <Alert severity="success">Logout Successful</Alert>
          </Snackbar>
        </div>
      )}
      {logut && <Navigate to="/login" />}
      {location.pathname.match("/feed") && (
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center justify-start space-x-4">
            <div className="flex flex-row items-center justify-end">
              <input
                placeholder="Search"
                className="ml-4 bg-gradient-to-r from-content-light to-content-dark text-white w-96 h-8 rounded-xl p-2 border-2 border-white"
                onKeyDown={e => {
                  handleEnterPress(e)
                }}
                value={search || ""}
                onChange={e => setSearch(e.target.value)}
              />
              <SvgIcon
                component={SearchIcon}
                className="absolute z-10 text-white justify-end mr-2"
                onClick={() => {
                  if (!redirect) setRedirect(true)
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-between">
              <div
                className="flex flex-row items-center justify-end text-white cursor-pointer"
                onClick={e => {
                  setIsOpen(!isOpen)
                  e.stopPropagation()
                }}
              >
                <button
                  type="button"
                  title="Parameter"
                  className="ml-8 bg-gradient-to-br from-content-dark to-content-light px-4 py-[6px] rounded-full border-[1px] border-white w-[110px] pr-8"
                >
                  {searchParam}
                </button>
                <SvgIcon
                  component={ArrowDropDownIcon}
                  className="absolute z-10 justify-end mr-2 mt-1 "
                />
              </div>
              <div
                className={` ${!isOpen && "hidden"} bg-slate-500 mt-12 z-10`}
              >
                <Paper>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setSearchParam("Author")
                        setIsOpen(!isOpen)
                      }}
                    >
                      Author
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSearchParam("Title")
                        setIsOpen(!isOpen)
                      }}
                    >
                      Title
                    </MenuItem>
                  </MenuList>
                </Paper>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
              <div
                className="flex flex-row items-center justify-end text-white cursor-pointer"
                onClick={e => {
                  setIsOpenCategory(!isOpenCategory)
                  e.stopPropagation()
                }}
              >
                <button
                  type="button"
                  title="Parameter"
                  className="ml-8 bg-gradient-to-br from-content-dark to-content-light px-4 py-[6px] rounded-full border-[1px] border-white w-[160px] pr-8"
                >
                  {categoryParam === "" ? "Category" : categoryParam}
                </button>
                <SvgIcon
                  component={ArrowDropDownIcon}
                  className="absolute z-10 justify-end mr-2 mt-1 "
                />
              </div>
              <div
                className={` ${!isOpenCategory && "hidden"} bg-slate-500 mt-12 z-10`}
              >
                <Paper>
                  <MenuList>
                    {categories.map((category, index) => (
                      <MenuItem
                        onClick={() => {
                          setCategoryParam(category.title)
                          setIsOpenCategory(!isOpenCategory)
                        }}
                        key={index}
                      >
                        {category.title}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </div>
            </div>
          </div>
          <div
            className="text-white hover:bg-content-light hover:border-2 cursor-pointer border-white transition-colors duration-300 ease-in-out px-4 py-1 rounded-full"
            onClick={() => {
              dispatch(logout())
              setOpen(true)
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  )
}

export default CompactNavbar
