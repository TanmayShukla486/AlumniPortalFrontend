import React, { createContext, useContext, useEffect, useState } from "react"
import { ChatMessage } from "../../../../features/chat/chatService"
import { ChatService } from "../../../../features/chat/chatService"

interface ChatContextType {
  messages: ChatMessage[]
  sendMessage: (recipient: string, content: string) => void
  loading: boolean
  error: string | null
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

interface ChatProviderProps {
  token: string
  username: string
  children: React.ReactNode
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  token,
  username,
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const chatService = ChatService.getInstance()

  useEffect(() => {
    const initializeChat = async () => {
      try {
        await chatService.connect(token)

        const unsubscribe = chatService.onMessage(message => {
          setMessages(prev => [...prev, message])
        })

        return () => {
          unsubscribe()
          chatService.disconnect()
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to connect to chat",
        )
      } finally {
        setLoading(false)
      }
    }

    initializeChat()
  }, [token])

  const sendMessage = (recipient: string, content: string) => {
    try {
      const fullMessage: ChatMessage = {
        sender: username,
        receiver: recipient,
        content,
        timestamp: new Date().toISOString(),
      }
      chatService.sendMessage(fullMessage)
      setMessages(state => [...state, fullMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    }
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, error }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
