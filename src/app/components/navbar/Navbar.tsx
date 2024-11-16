import React from "react"

import SidebarItem, { ButtonItemProps } from "../reusable/siderbar-item"
import NavButton from "../reusable/navbutton"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import EventIcon from "@mui/icons-material/Event"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import AnnouncementIcon from "@mui/icons-material/Announcement"
import SvgIcon from "@mui/icons-material/AppRegistration"
import LogoutIcon from "@mui/icons-material/Logout"

export const navbarItems: ButtonItemProps[] = [
  {
    title: "Job Posting",
    Icon: AppRegistrationIcon,
    href: "/job-posting/create",
  },
  {
    title: "Events",
    Icon: EventIcon,
    href: "/events",
  },
  {
    title: "Contact Us",
    Icon: AnnouncementIcon,
    href: "/contact",
  },
  {
    title: "About Us",
    Icon: PeopleAltIcon,
    href: "/about",
  },
]

const Navbar = () => {
  return (
    <div className="flex space-x-6 pt-4 justify-end mr-16">
      <div className="w-fit border-bg-primary border-2 rounded-2xl p-2 flex flex-row space-x-2">
        {navbarItems.map(item => (
          <NavButton
            Icon={item.Icon}
            title={item.title}
            href={item.href}
            key={item.title}
          />
        ))}
      </div>
      <div className="flex justify-center items-center hover:bg-bg-dark bg-transparent hover:text-white h-14 w-14 mt-2  rounded-full transition-colors duration-500 cursor-pointer">
        <SvgIcon
          component={LogoutIcon}
          fontSize="large"
          sx={{ marginLeft: "8px" }}
        />
      </div>
    </div>
  )
}

export default Navbar
