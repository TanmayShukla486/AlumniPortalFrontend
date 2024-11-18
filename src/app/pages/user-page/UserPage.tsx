import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import { Link, useParams } from "react-router-dom"
import {
  selectRefreshToken,
  selectRole,
  selectToken,
  selectUsername,
} from "../../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  addProfileFollows,
  Company,
  ConfigType,
  fetchProfile,
  Follower,
  removeProfileFollows,
  selectProfile,
  selectProfileStatus,
} from "../../../features/profile/profileSlice"
import { Divider, Skeleton, SvgIcon } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {
  addFollow,
  getCompleteFollowing,
  removeFollow,
  selectFollowingList,
} from "../../../features/following/followingSlice"
import CompanyBox from "../register/components/company-box"
import { Comment } from "../../../features/blogs/commentSlice"
import { Blog } from "../../../features/blogs/blogSlice"
import axios from "axios"
import SearchIcon from "@mui/icons-material/Search"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"

const CompanyItem = ({ company }: { company: Company }) => {
  return (
    <li
      className={`w-full px-4 bg-content-dark rounded-md my-2 flex flex-row justify-between py-2 items-start ${company.currentlyWorking ? "border-4 border-red-800" : ""}`}
    >
      <div className="text-white/80">{company.company}</div>
      <div className="text-white/80 text-sm opacity-50">
        Years: {company.timeSpent}
      </div>
    </li>
  )
}

const CommentDisplay = ({ comments }: { comments: Comment[] }) => {
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
    <ul>
      {comments.map(comment => (
        <li>
          <Link to={`/feed/${comment.blogId}`}>
            <div className="hover:bg-content-dark/60 transition-all duration-300 ease-in-out rounded-md flex flex-col items-start justify-start space-y-2 p-2">
              <div>
                {comment.content.substring(0, 200)}
                {comment.content.length > 200 ? ". . . . . . ." : ""}
              </div>
              <div className="flex flex-row items-center space-x-2 opacity-75 bg-content-dark px-3 rounded-full">
                <SvgIcon
                  component={ThumbUpIcon}
                  sx={{ color: "white" }}
                  fontSize="small"
                />
                <div className="text-white">{comment.likes.length}</div>
              </div>
              <Divider
                sx={{ borderColor: "#052238", opacity: "50%", width: "100%" }}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const FollowerDisplay = ({ followers }: { followers: Follower[] }) => {
  if (followers.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/404.png" alt="404" className="rounded-lg" />
        <div className="text-xl text-content-dark font-bold">
          No Follower Found
        </div>
      </div>
    )
  let tempList = followers
  const [search, setSearch] = useState<string>("")
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    tempList = followers.filter(item =>
      item.followedBy.includes(e.currentTarget.value),
    )
  }
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-row justify-end items-center">
        <input
          placeholder="Enter username"
          value={search}
          onChange={handleChange}
          className="w-full h-10 rounded-xl px-4 border-2 border-content-dark"
        />
        <div className="fixed mr-2">
          <SvgIcon component={SearchIcon} />
        </div>
      </div>
      <div className="grid grid-cols-4 h-5/6 overflow-scroll hide-scrollbar mt-4 gap-4">
        {tempList.map(item => (
          <Link to={`/user/${item.followedBy}`}>
            <div className="col-span-1 bg-content-dark h-12 rounded-md flex flex-row items-center justify-between px-4 shadow-custom border-2 border-content-light">
              <div className="text-white/80 font-semibold">
                {item.followedBy}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
const FollowingDisplay = ({ followers }: { followers: Follower[] }) => {
  if (followers.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src="/404.png" alt="404" className="rounded-lg" />
        <div className="text-xl text-content-dark font-bold">
          No Follower Found
        </div>
      </div>
    )
  let tempList = followers
  const [search, setSearch] = useState<string>("")
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    tempList = followers.filter(item =>
      item.followedBy.includes(e.currentTarget.value),
    )
  }
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-row justify-end items-center">
        <input
          placeholder="Enter username"
          value={search}
          onChange={handleChange}
          className="w-full h-10 rounded-xl px-4 border-2 border-content-dark"
        />
        <div className="fixed mr-2">
          <SvgIcon component={SearchIcon} />
        </div>
      </div>
      <div className="grid grid-cols-4 h-5/6 overflow-scroll hide-scrollbar mt-4 gap-4">
        {tempList.map(item => (
          <Link to={`/user/${item.followed}`}>
            <div className="col-span-1 bg-content-dark h-12 rounded-md flex flex-row items-center justify-between px-4 shadow-custom border-2 border-content-light">
              <div className="text-white/80 font-semibold">{item.followed}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const BlogDisplay = ({ blogs }: { blogs: Blog[] }) => {
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
    <ul className="w-full border-2 h-full">
      {blogs.map(blog => (
        <li key={blog.id}>
          <Link to={`/feed/${blog.id}`}>
            <div className="hover:bg-content-dark/60 transition-all duration-300 ease-in-out rounded-md flex flex-col items-start justify-start space-y-2 p-2">
              <div className="text-content-dark text-xl">{blog.title}</div>
              <div className="text-white bg-content-dark px-4 rounded-full text-sm opacity-75 py-1">
                {blog.category}
              </div>
              <Divider
                sx={{ borderColor: "white", opacity: "50%", width: "36%" }}
              />
              <div className="text-black text-md opacity-50">
                {blog.content.substring(0, 95)}...
              </div>
              <div className="flex flex-row items-center justify-start space-x-6">
                <div className="flex flex-row items-center space-x-2 opacity-50 bg-content-dark px-3 rounded-full">
                  <SvgIcon
                    component={ThumbUpIcon}
                    sx={{ color: "white" }}
                    fontSize="small"
                  />
                  <div className="text-white">{blog.likes}</div>
                </div>
                <div className="flex flex-row items-center space-x-2 opacity-50 bg-content-dark px-3 rounded-full">
                  <SvgIcon
                    component={ChatBubbleIcon}
                    sx={{ color: "white" }}
                    fontSize="small"
                  />
                  <div className="text-white">{blog.commentCount}</div>
                </div>
              </div>
              <Divider
                sx={{ borderColor: "white", opacity: "50%", width: "100%" }}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const CompanyDetails = ({ companies }: { companies: Company[] }) => {
  return (
    <div className="h-full p-2">
      {/* <div className="text-xl font-semibold text-content-dark">Companies</div>
      <Divider sx={{ borderColor: "#052238", opacity: "50%" }} /> */}
      <ul className="h-1/2 oveflow-scroll hide-scrollbar">
        {companies.map((company, index) => (
          <CompanyItem company={company} key={index} />
        ))}
      </ul>
    </div>
  )
}

const UserPage = () => {
  const [selectSideMenuItem, setSelectedSideMenuItem] = useState<
    "Details" | "Companies"
  >("Details")
  const [comments, setComments] = useState<Comment[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedItem, setSelectedItem] = useState<
    "Followers" | "Following" | "Comments" | "Blogs"
  >("Followers")
  const { username } = useParams()
  const currentUser = useAppSelector(selectUsername)
  const profile = useAppSelector(selectProfile)
  const role = useAppSelector(selectRole)
  const followingList = useAppSelector(selectFollowingList)
  const profileStatus = useAppSelector(selectProfileStatus)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const refreshToken = useAppSelector(selectRefreshToken) || ""
  const dispatch = useAppDispatch()
  const config: ConfigType = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      RefreshToken: "",
    },
  }
  const followUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/${username}/follow`,
        "",
        config,
      )
      dispatch(addFollow({ follow: response.data }))
      dispatch(addProfileFollows({ follow: response.data }))
    } catch (error) {
      console.log(error)
    }
  }
  const unFollowUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/${username}/unfollow`,
        config,
      )
      dispatch(removeFollow({ id: response.data }))
      dispatch(removeProfileFollows({ id: response.data }))
    } catch (error) {
      console.log(error)
    }
  }
  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/comment/username/${username}`,
      config,
    )
    setComments(response.data)
  }
  const fetchBlogs = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/blog?author=${username}`,
      config,
    )
    setBlogs(response.data.data)
  }
  useEffect(() => {
    dispatch(fetchProfile({ username, token, refreshToken }))
    dispatch(
      getCompleteFollowing({
        username: currentUser || "",
        token,
        refreshToken,
      }),
    )
    fetchComments()
    fetchBlogs()
  }, [username])
  const middleName = profile?.middleName === "" ? profile?.middleName + " " : ""
  return (
    <Wrapper>
      {profileStatus === "ERROR" && (
        <div className="h-[70vh] w-full flex items-center justify-center">
          <Link to="/home">
            <span className="px-4 text-white/80 text-xl bg-content-dark py-2 rounded-md">
              Error occurred while loading Profile. Go Back
            </span>
          </Link>
        </div>
      )}
      {profileStatus === "LOADING" && (
        <div>
          <div className="w-full h-[10vh] mt-6 flex flex-row justify-between items-center">
            <Skeleton sx={{ height: "120px", width: "40%" }} />
            <Skeleton
              sx={{
                height: "80px",
                width: "10%",
                marginRight: "20px",
                marginTop: "10px",
              }}
            />
          </div>
          <div className="w-full mt-4">
            <Skeleton sx={{ height: "70px", width: "75%" }} />
          </div>
          <div className="grid grid-cols-10 h-[90vh] gap-4 mr-4 -mt-36">
            <div className="col-span-3">
              <Skeleton sx={{ height: "100%" }} />
            </div>
            <div className="col-span-7">
              <Skeleton sx={{ height: "100%" }} />
            </div>
          </div>
        </div>
      )}
      {profileStatus === "IDLE" && profile !== null && (
        <div className="mr-4 h-[83.5vh] mt-4 flex flex-col items-start justify-start p-4">
          <div className="w-full flex flex-row items-center justify-between pr-4">
            <div className="flex flex-row space-x-2">
              <SvgIcon component={AccountCircleIcon} fontSize="large" />
              <div className="font-extrabold text-2xl">
                {currentUser === profile?.username ? "Welcome" : ""}{" "}
                {profile?.username}
              </div>
            </div>
            <div>
              <button
                className={`bg-content-dark px-4 py-2 rounded-xl border-2 border-white shadow-custom ${currentUser === profile?.username ? "opacity-50" : "transition-all duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5"}`}
                disabled={currentUser === profile?.username}
                onClick={() => {
                  if (
                    followingList.some(follow => follow.followed === username)
                  )
                    unFollowUser()
                  else followUser()
                }}
              >
                <span className="text-white">
                  {followingList.some(follow => follow.followed === username)
                    ? "UnFollow"
                    : "Follow"}
                </span>
              </button>
            </div>
          </div>
          <div className="text-lg font-semibold opacity-50 ml-12">
            {profile?.bio}
          </div>
          <div className="grid grid-cols-10 space-x-3 w-full h-[85%] mt-4">
            <div className="col-span-3 border-4 border-content-dark overflow-y-scroll hide-scrollbar shadow-custom rounded-lg bg-gradient-to-b from-white/20 to-white">
              <div>
                <div className="flex w-full flex-row justify-center border-b-2 border-content-dark text-white text-md ">
                  <button
                    className={`${selectSideMenuItem === "Details" ? "bg-content-dark/60" : "bg-transparent"} transition-all duration-300 ease-in-out px-4 py-2 w-full h-full`}
                    onClick={() => setSelectedSideMenuItem("Details")}
                  >
                    Details
                  </button>
                  <button
                    className={`${selectSideMenuItem === "Companies" ? "bg-content-dark/60" : "bg-transparent"} transition-all duration-300 ease-in-out px-4 py-2 rounded-e-sm w-full h-full`}
                    onClick={() => setSelectedSideMenuItem("Companies")}
                  >
                    Companies
                  </button>
                </div>
                <div>
                  {selectSideMenuItem === "Companies" &&
                    profile?.alumniDetails !== null && (
                      <CompanyDetails
                        companies={profile?.alumniDetails.companies || []}
                      />
                    )}
                  {selectSideMenuItem === "Companies" &&
                    (profile?.alumniDetails === null ||
                      profile?.alumniDetails.companies === null ||
                      profile.alumniDetails.companies.length === 0) && (
                      <div className="opacity-50 p-4">No companies found</div>
                    )}
                  {selectSideMenuItem === "Details" && (
                    <div className="p-2 flex flex-col space-y-2">
                      <div className="text-justify w-full bg-content-dark/60 p-2 rounded-md shadow-custom-inset">
                        <span className="text-white/80">
                          Name:{" "}
                          {profile?.firstName + middleName + profile?.lastName}
                        </span>
                      </div>
                      <div className="text-justify w-full bg-content-dark/60 p-2 rounded-md shadow-custom-inset">
                        <span className="text-white/80">
                          Followers : {profile?.followers.length}
                        </span>
                      </div>
                      <div className="text-justify w-full bg-content-dark/60 p-2 rounded-md shadow-custom-inset">
                        <span className="text-white/80">
                          Following : {profile?.following.length}
                        </span>
                      </div>
                      <div className="text-justify w-full bg-content-dark/60 p-2 rounded-md shadow-custom-inset">
                        <span className="text-white/80">
                          Department : "Generic"
                        </span>
                      </div>
                      <div className="text-justify w-full bg-content-dark/60 p-2 rounded-md shadow-custom-inset">
                        <span className="text-white/80">
                          Graduation Year : {profile?.graduationYear}
                        </span>
                      </div>
                      <div className="text-justify w-full bg-content-dark/60 p-2 rounded-md shadow-custom-inset">
                        <span className="text-white/80">
                          Status : {profile?.role}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-7 border-4 border-content-dark overflow-y-scroll hide-scrollbar shadow-custom rounded-lg bg-gradient-to-b from-white/20 to-white">
              <div className="flex w-full flex-row justify-center border-b-2 border-content-dark text-white text-md h-fit">
                <button
                  className={`${selectedItem === "Followers" ? "bg-content-dark/60" : "bg-transparent"} transition-all duration-300 ease-in-out px-4 py-2 w-full h-full`}
                  onClick={() => setSelectedItem("Followers")}
                >
                  Followers
                </button>
                <button
                  className={`${selectedItem === "Following" ? "bg-content-dark/60" : "bg-transparent"} transition-all duration-300 ease-in-out px-4 py-2 rounded-e-sm w-full h-full`}
                  onClick={() => setSelectedItem("Following")}
                >
                  Following
                </button>
                <button
                  className={`${selectedItem === "Blogs" ? "bg-content-dark/60" : "bg-transparent"} transition-all duration-300 ease-in-out px-4 py-2 rounded-e-sm w-full h-full`}
                  onClick={() => setSelectedItem("Blogs")}
                >
                  Blogs
                </button>
                <button
                  className={`${selectedItem === "Comments" ? "bg-content-dark/60" : "bg-transparent"} transition-all duration-300 ease-in-out px-4 py-2 rounded-e-sm w-full h-full`}
                  onClick={() => setSelectedItem("Comments")}
                >
                  Comments
                </button>
              </div>
              <div className="px-4 h-[92%] py-4 overflow-y-scroll hide-scrollbar">
                {selectedItem === "Followers" && (
                  <FollowerDisplay followers={profile.followers} />
                )}
                {selectedItem === "Following" && (
                  <FollowingDisplay followers={profile.following} />
                )}
                {selectedItem === "Blogs" && <BlogDisplay blogs={blogs} />}
                {selectedItem === "Comments" && (
                  <CommentDisplay comments={comments} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default UserPage
