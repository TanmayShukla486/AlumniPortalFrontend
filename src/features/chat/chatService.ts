// types.ts
export interface ChatMessage {
  sender: string
  receiver: string
  content: string
  timestamp: string
}

// chatService.ts
export class ChatService {
  private static instance: ChatService
  private ws: WebSocket | null = null
  private messageHandlers: ((message: ChatMessage) => void)[] = []
  private reconnectAttempts = 0
  private readonly MAX_RECONNECT_ATTEMPTS = 5
  private readonly RECONNECT_INTERVAL = 3000

  private constructor() {}

  // singleton pattern
  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`ws://localhost:8080/chat?token=${token}`)

        this.ws.onopen = () => {
          console.log("WebSocket connected")
          this.reconnectAttempts = 0
          resolve()
        }

        this.ws.onmessage = event => {
          const message: ChatMessage = JSON.parse(event.data)
          this.messageHandlers.forEach(handler => handler(message))
        }

        this.ws.onclose = () => {
          console.log("WebSocket disconnected")
          this.attemptReconnect(token)
        }

        this.ws.onerror = error => {
          console.error("WebSocket error:", error)
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private attemptReconnect(token: string) {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        this.reconnectAttempts++
        this.connect(token)
      }, this.RECONNECT_INTERVAL)
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  sendMessage(message: Omit<ChatMessage, "timestamp" | "type">) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      throw new Error("WebSocket is not connected")
    }
  }

  onMessage(handler: (message: ChatMessage) => void) {
    this.messageHandlers.push(handler)
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler)
    }
  }

  async getChatHistory(
    token: string,
    sender: string,
    recipient: string,
  ): Promise<ChatMessage[]> {
    try {
      console.log(sender)
      console.log(recipient)
      const response = await fetch(
        `http://localhost:8080/api/chat/history?sender=${sender}&recipient=${recipient}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            RefreshToken: "",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching chat history:", error)
      throw error
    }
  }
}
