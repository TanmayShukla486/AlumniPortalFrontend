import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import BlogDisplayCompact from "../../components/reusable/blog-display-compact"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  fetchBlogs,
  selectList,
  selectListStatus,
} from "../../../features/blogs/blogListSlice"
import {
  selectRefreshToken,
  selectToken,
} from "../../../features/user/userSlice"
import { CircularProgress, Divider } from "@mui/material"
import Wrapper2 from "../../components/wrapper/Wrapper2"
import EmptyBlock from "../../components/reusable/empty-block"
import { useSearchParams } from "react-router-dom"
import { Blog } from "../../../features/blogs/blogSlice"
import axios from "axios"
import { ConfigType } from "../../../features/profile/profileSlice"

const SearchPage = () => {
  const [params] = useSearchParams()
  const dispatch = useAppDispatch()
  const [redirect, setRedirect] = useState<boolean>(false)
  const author = params.get("author") || ""
  const title = params.get("title") || ""
  const category = params.get("category") || ""
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const [searchedList, setSearchedList] = useState<Blog[]>([])
  const [listStatus, setListStatus] = useState<
    "LOADING" | "LOADED" | "ERROR" | "IDLE"
  >("IDLE")

  const createQuery = () => {
    let query = ""
    if (author !== "") query += `author=${author}&`
    if (category !== "") query += `category=${category}&`
    if (title !== "") query += `title=${title}`
    if (query.endsWith("&")) query = query.substring(0, query.lastIndexOf("&"))
    return query
  }

  const fetchList = async () => {
    setListStatus("LOADING")
    const config: ConfigType = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        RefreshToken: "",
      },
    }
    try {
      const query = createQuery()
      const res = await axios.get(
        `http://localhost:8080/api/blog?${query}`,
        config,
      )
      setSearchedList(res.data.data)
      setListStatus("LOADED")
    } catch (error) {
      console.error(error)
      setListStatus("ERROR")
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => fetchList(), 500)
    return () => clearTimeout(handler)
  }, [params])
  return (
    <Wrapper2>
      <div className="h-[92vh] overflow-scroll hide-scrollbar">
        <div className="flex flex-col space-y-2 mt-4 h-full text-white pr-8 text-justify">
          {(listStatus === "LOADING" || listStatus === "ERROR") && (
            <div className="">
              <div className="">Loading</div>
              <CircularProgress
                sx={{
                  color: "",
                }}
              />
            </div>
          )}
          {listStatus === "LOADED" &&
            searchedList.length > 0 &&
            searchedList.map((blog, index) => (
              <div className="mt-2" key={index}>
                <BlogDisplayCompact blog={blog} />
                <Divider
                  variant="fullWidth"
                  sx={{
                    height: "8px",
                    width: "100%",
                    borderBottomWidth: "2px",
                    borderColor: "white",
                    opacity: "40%",
                  }}
                />
              </div>
            ))}
          {listStatus === "IDLE" && searchedList.length === 0 && (
            <EmptyBlock val={"Blog Posts For Category"} revertBack={() => {}} />
          )}
        </div>
      </div>
    </Wrapper2>
  )
}

export default SearchPage
