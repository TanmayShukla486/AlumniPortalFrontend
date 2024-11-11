import React, { useEffect, useState } from "react"
import { useChat } from "./ChatContext"
import { ChatMessage, ChatService } from "../../../../features/chat/chatService"

interface ChatComponentProps {
  token: string
  currentUser: string
  recipient: string
}

export const ChatComponent: React.FC<ChatComponentProps> = ({
  token,
  currentUser,
  recipient,
}) => {
  const { messages, sendMessage, loading, error } = useChat()
  const [newMessage, setNewMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await ChatService.getInstance().getChatHistory(
          token,
          currentUser,
          recipient,
        )
        setChatHistory(history)
      } catch (err) {
        console.error("Failed to load chat history:", err)
      } finally {
        setLoadingHistory(false)
      }
    }

    loadChatHistory()
  }, [recipient])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(recipient, newMessage)
      setNewMessage("")
    }
  }

  if (loading || loadingHistory) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const allMessages = [...chatHistory, ...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === currentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="text-sm font-semibold mb-1">
                {message.sender === currentUser ? "You" : message.sender}
              </div>
              <div>{message.content}</div>
              <div className="text-xs mt-1 opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
