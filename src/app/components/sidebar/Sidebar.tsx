import React from "react"
import SidebarItem, { ButtonItemProps } from "../reusable/siderbar-item"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import GroupIcon from "@mui/icons-material/Group"
import FeedIcon from "@mui/icons-material/Feed"
import SidebarUser from "../reusable/sidebar-user"
import ChatIcon from "@mui/icons-material/Chat"
import HomeIcon from "@mui/icons-material/Home"
import CreateIcon from "@mui/icons-material/Create"
import { useAppSelector } from "../../redux/hooks"
import { selectRole } from "../../../features/user/userSlice"
import { Divider } from "@mui/material"
import UserItem from "../reusable/user-item"

const sidebarItems: ButtonItemProps[] = [
  {
    title: "Home",
    Icon: HomeIcon,
    href: "/home",
  },
  {
    title: "Alumni",
    Icon: GroupIcon,
    href: "/feed/favorite",
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
]

const Sidebar = () => {
  // const role = useAppSelector(selectRole) || "ALUMNI"
  // if (role === "ALUMNI")
  //   sidebarItems.push({
  //     title: "Create Blog",
  //     Icon: CreateIcon,
  //     href: "/",
  //   })
  return (
    <div className="w-64 h-full fixed bg-gradient-to-r from-bg-light to-bg-dark border-r-2 border-white flex flex-col items-center space-y-2 pl-4 pr-8 justify-start py-2 text-white">
      <SidebarUser />
      {sidebarItems.map(item => (
        <SidebarItem
          Icon={item.Icon}
          href={item.href}
          title={item.title}
          key={item.title}
        />
      ))}
      <SidebarItem Icon={CreateIcon} href="/create-blog" title="Create Blog" />
      <Divider
        className="w-full pt-5 mt-6"
        variant="middle"
        sx={{
          borderColor: "white",
        }}
      />
      <div className="w-full pl-4">Following</div>
      <div className="flex flex-col overflow-scroll hide-scrollbar w-full h-auto pb-4">
        {sidebarItems.map(item => (
          <UserItem
            Icon={item.Icon}
            href={item.href}
            username={item.title}
            key={item.title}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
