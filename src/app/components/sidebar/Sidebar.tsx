import React from "react"
import SidebarItem, { ButtonItemProps } from "../reusable/siderbar-item"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import GroupIcon from "@mui/icons-material/Group"
import FeedIcon from "@mui/icons-material/Feed"
import SidebarUser from "../reusable/sidebar-user"
import ChatIcon from "@mui/icons-material/Chat"
import HomeIcon from "@mui/icons-material/Home"
import CreateIcon from "@mui/icons-material/Create"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import { useAppSelector } from "../../redux/hooks"
import { selectRole } from "../../../features/user/userSlice"
import { Divider, Skeleton } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import WorkIcon from "@mui/icons-material/Work"
import UserItem from "../reusable/user-item"
import {
  selectFollowingList,
  selectFollowingListStatus,
} from "../../../features/following/followingSlice"

const sidebarItems: ButtonItemProps[] = [
  {
    title: "Home",
    Icon: HomeIcon,
    href: "/home",
  },
  {
    title: "Alumni",
    Icon: GroupIcon,
    href: "/alumni",
  },
  {
    title: "Popular",
    Icon: WhatshotIcon,
    href: "/feed/popular",
  },
  {
    title: "Blogs",
    Icon: FeedIcon,
    href: "/feed",
  },
  {
    title: "Chat",
    Icon: ChatIcon,
    href: "/chat",
  },
  {
    title: "Jobs",
    Icon: WorkIcon,
    href: "/job-posting/all",
  },
]

const Sidebar = () => {
  // const role = useAppSelector(selectRole) || "ALUMNI"
  // if (role === "ALUMNI")
  //   sidebarItems.push({
  //     title: "Create Blog",
  //     Icon: CreateIcon,
  //     href: "/",
  //   })
  const followingList = useAppSelector(selectFollowingList)
  const listStatus = useAppSelector(selectFollowingListStatus)
  const role = useAppSelector(selectRole)
  return (
    <div className="w-60 h-full fixed bg-gradient-to-r from-bg-light to-bg-dark border-r-2 border-white flex flex-col items-center space-y-2 pl-4 pr-8 justify-start py-2 text-white transition-all duration-300 ease-in-out">
      <SidebarUser />
      {sidebarItems.map(item => (
        <SidebarItem
          Icon={item.Icon}
          href={item.href}
          title={item.title}
          key={item.title}
        />
      ))}
      {role === "ALUMNI" && (
        <SidebarItem
          Icon={CreateIcon}
          href="/create-blog"
          title="Create Blog"
        />
      )}
      {role === "ADMIN" && (
        <SidebarItem
          Icon={AdminPanelSettingsIcon}
          href="/admin"
          title="Admin Dashboard"
        />
      )}
      <Divider
        className="w-full pt-5 mt-6"
        variant="middle"
        sx={{
          borderColor: "white",
        }}
      />
      <div className="w-full pl-4">Following</div>
      <div className="flex flex-col overflow-scroll hide-scrollbar w-full h-auto pb-4">
        {listStatus === "IDLE" &&
          followingList.length > 0 &&
          followingList.map(item => (
            <UserItem
              Icon={AccountCircleIcon}
              href={`/user/${item.followed}`}
              username={item.followed}
              key={item.followed}
            />
          ))}
        {(listStatus === "LOADING" || listStatus === "ERROR") && (
          <Skeleton className="flex justify-start rounded-xl items-center space-x-2 color-transition px-2 py-4" />
        )}
        {listStatus === "IDLE" && followingList.length === 0 && (
          <div className="w-full pl-4 pr-8 opacity-50 text-sm">
            You're not following anyone
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
