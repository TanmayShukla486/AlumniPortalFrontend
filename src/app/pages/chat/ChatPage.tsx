import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import { useAppSelector } from "../../redux/hooks"
import { selectBlog } from "../../../features/blogs/blogSlice"
import { selectToken, selectUsername } from "../../../features/user/userSlice"
import { ChatProvider } from "./components/ChatContext"
import { ChatComponent } from "./components/ChatComponent"
import axios from "axios"
import { ConfigType } from "../../../features/profile/profileSlice"
import { Divider, IconButton, SvgIcon, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

let stompClient = null

export interface ChatRoom {
  sender: string
  receiver: string
}

const SearchUser = ({
  setRecipient,
  closeSearch,
}: {
  setRecipient: (val: string) => void
  closeSearch: () => void
}) => {
  const [search, setSearch] = useState<string>("")
  const [users, setUsers] = useState<string[]>([])
  const username = useAppSelector(selectUsername)
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const handleSearch = async () => {
    if (search === "") return
    const config: ConfigType = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        RefreshToken: "",
      },
    }
    const response = await axios.get(
      `http://localhost:8080/api/chat/users?username=${search}`,
      config,
    )
    setUsers(response.data)
    setUsers(list => list.filter(it => it !== username))
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleSearch()
  }
  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <div className="flex flex-row w-full">
        <TextField
          className="w-full"
          sx={{
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#B2BAC2",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "#052238",
              },
              "&:hover fieldset": {
                borderColor: "#39a0ed",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#052238",
              },
            },
          }}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <div className="w-auto flex items-center justify-center px-2 rounded-r-md bg-content-dark -ml-1 z-10">
          <IconButton onClick={handleSearch}>
            <SvgIcon component={SearchIcon} sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 h-full overflow-y-scroll gap-2 w-full hide-scrollbar">
        {users.length === 0 && <div>No such user</div>}
        {users.length > 0 &&
          users.map((user, index) => (
            <button
              onClick={() => {
                setRecipient(user)
                closeSearch()
              }}
              key={index}
              className=" bg-gradient-to-r from-content-dark to-bg-light rounded-xl border-2 border-white w-full h-16 pl-4 pr-36 flex items-center -py-2 flex-row text-white shadow-button"
            >
              {user}
            </button>
          ))}
      </div>
    </div>
  )
}

const ChatPage = () => {
  const [recipient, setRecipient] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [recentChats, setRecentChats] = useState<ChatRoom[]>([])
  const username = useAppSelector(selectUsername) || ""
  const token =
    useAppSelector(selectToken) || localStorage.getItem("token") || ""
  const handleRecipient = (val: string) => setRecipient(val)
  const toggleSearch = () => setIsSearching(!isSearching)
  useEffect(() => {
    const fetchChatRooms = async () => {
      const config: ConfigType = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          RefreshToken: "",
        },
      }
      const response = await axios.get(
        "http://localhost:8080/api/chat/rooms",
        config,
      )
      setRecentChats(response.data)
    }
    fetchChatRooms()
  }, [])
  return (
    <ChatProvider token={token} username={username}>
      <Wrapper>
        <div className="grid grid-cols-10 h-[83.5vh] gap-x-4 pt-4 pr-4">
          <div className="col-span-7 border-2 border-white p-4 overflow-y-scroll hide-scrollbar">
            {recipient !== "" && !isSearching && (
              <ChatComponent
                token={token}
                currentUser={username}
                recipient={recipient}
              />
            )}
            {(recipient === "" || isSearching) && (
              <SearchUser
                setRecipient={handleRecipient}
                closeSearch={toggleSearch}
              />
            )}
          </div>
          <div className="col-span-3 border-2 text-white border-white rounded-xl bg-gradient-to-b from-content-dark to-content-light p-4 overflow-y-scroll hide-scrollbar ">
            <div className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-white to-bg-light bg-clip-text">
              Recent
            </div>
            <Divider
              sx={{
                borderColor: "white",
                marginTop: "8px",
                width: "85%",
                opacity: "75%",
              }}
            />
            {recentChats.length === 0 && (
              <div className="opacity-50 mt-2">No recent chats</div>
            )}
            <div className="mt-4 flex flex-col space-y-3">
              {recentChats.length !== 0 &&
                recentChats.map((chat, index) => (
                  <button
                    onClick={() => {
                      let temp
                      if (username === chat.sender) temp = chat.receiver
                      else temp = chat.sender
                      setRecipient(temp)
                      toggleSearch()
                    }}
                    key={index}
                    className=" bg-gradient-to-r from-content-dark to-bg-light rounded-xl border-2 border-white w-full h-12 pl-4 pr-36 flex items-center -py-2 flex-row text-white shadow-button"
                  >
                    {chat.receiver !== username && chat.receiver}
                    {chat.sender !== username && chat.sender}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </ChatProvider>
  )
}

export default ChatPage
