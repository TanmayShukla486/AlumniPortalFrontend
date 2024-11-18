import React, { PropsWithChildren, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {
  selectRefreshToken,
  selectRole,
  selectStatus,
  selectToken,
  selectUsername,
} from "../../../features/user/userSlice"
import { Navigate, useLocation } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import CompactNavbar from "../navbar/CompactNavbar"
import {
  getRecommendedUsers,
  selectRecommended,
  selectRecommendedStatus,
} from "../../../features/recommended/recommendedSlice"
import UserItem from "../reusable/user-item"
import RecommendedUser from "../reusable/recommended-user"
import { Divider } from "@mui/material"
import {
  fetchCategories,
  selectCategories,
  selectCategoriesStatus,
} from "../../../features/categories/categorySlice"
import {
  fetchBlogs,
  fetchBlogsWithCategory,
} from "../../../features/blogs/blogListSlice"
import { selectFollowingList } from "../../../features/following/followingSlice"

const Wrapper2: React.FC<PropsWithChildren> = ({ children }) => {
  const userStatus = useAppSelector(selectStatus)
  const username = useAppSelector(selectUsername)
  const followingList = useAppSelector(selectFollowingList)
  const categories = useAppSelector(selectCategories)
  const categoriesStatus = useAppSelector(selectCategoriesStatus)
  const dispatch = useAppDispatch()
  if (userStatus !== "LOGGEDIN") return <Navigate to="/login" />
  const location = useLocation()
  const role = useAppSelector(selectRole)
  const recommended = useAppSelector(selectRecommended)
  const recommendedStatus = useAppSelector(selectRecommendedStatus)
  const [query, setQuery] = useState<string>("")
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const [navigation, setNavigation] = useState<boolean>(false)
  const handleCategory = (val: string) => {
    setQuery(`?category=${val}`)
    setNavigation(true)
  }
  useEffect(() => {
    if (categoriesStatus === "IDLE") dispatch(fetchCategories(token))
    dispatch(
      getRecommendedUsers({
        token,
        refreshToken,
      }),
    )
  }, [])

  return (
    <div className="grid grid-cols-6 gap-1 w-full h-full">
      {navigation && <Navigate to={`/feed${query}`} />}
      <div className="col-span-1 text-wrap">
        <Sidebar />
      </div>
      <div className="col-span-5">
        <div className="flex flex-col">
          <div className="flex-1">
            <CompactNavbar />
          </div>
          <div className="flex-auto grid grid-cols-12">
            <div className="col-span-10">{children}</div>
            <div className="col-span-2 flex flex-col px-4 py-2 bg-gradient-to-b from-bg-light to-bg-dark text-white h-full w-full border-l-2 border-white b">
              {role !== "ADMIN" && (
                <>
                  <div className="text-md font-bold">Recommended People</div>
                  <div className="text-sm mt-2 h-[15%] overflow-y-scroll hide-scrollbar">
                    {recommendedStatus === "IDLE" &&
                      recommended
                        .filter(
                          it =>
                            it.username !== username &&
                            !followingList.some(
                              follow => follow.followed === it.username,
                            ),
                        )
                        .map(user => (
                          <RecommendedUser
                            Icon={AccountCircleIcon}
                            username={user.username}
                            href={`/user/${user.username}`}
                            key={user.username}
                          />
                        ))}
                  </div>
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
                </>
              )}
              {categoriesStatus === "IDLE" && (
                <div>
                  <div className="mt-2 text-md font-bold">Explore:</div>
                  <div className="mt-4 text-sm overflow-y-scroll hide-scrollbar pl-2 h-[85%]">
                    <div
                      onClick={() => {
                        dispatch(fetchBlogs({ token, refreshToken }))
                        setNavigation(true)
                        setQuery("")
                      }}
                      className="h-12 -ml-2 flex flex-col items-start pl-4 hover:border-2 border-white rounded-full justify-center cursor-pointer bg-transparent hover:bg-gradient-to-br from-content-light to-content-dark"
                    >
                      All
                    </div>
                    {categories.length > 0 &&
                      categories.map(category => (
                        <div
                          onClick={() => handleCategory(category.title)}
                          className="h-12 flex flex-col -ml-2 items-start pl-4 hover:border-2 border-white rounded-full justify-center cursor-pointer bg-transparent hover:bg-gradient-to-br from-content-light to-content-dark"
                          key={category.title}
                        >
                          {category.title}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper2
