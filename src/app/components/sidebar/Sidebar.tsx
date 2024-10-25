import React from "react"
import SidebarItem, { ButtonItemProps } from "../reusable/siderbar-item"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import BookmarksIcon from "@mui/icons-material/Bookmarks"
import LoyaltyIcon from "@mui/icons-material/Loyalty"
import FeedIcon from "@mui/icons-material/Feed"
import SidebarUser from "../reusable/sidebar-user"
import ChatIcon from "@mui/icons-material/Chat"
import CreateIcon from "@mui/icons-material/Create"
import { useAppSelector } from "../../redux/hooks"
import { selectRole } from "../../../features/user/userSlice"

const sidebarItems: ButtonItemProps[] = [
  {
    title: "Favorites",
    Icon: BookmarksIcon,
    href: "/feed/favorite",
  },
  {
    title: "Following",
    Icon: LoyaltyIcon,
    href: "/feed/following",
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
    <div className="w-1/5 bg-bg-primary max-h-screen fixed top-4 left-4 space-y-4   bottom-4 z-20 rounded-2xl shadow-sidebar opacity-50 flex-col p-4">
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
    </div>
  )
}

export default Sidebar
