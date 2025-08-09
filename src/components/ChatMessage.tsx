import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bot, Crown, Shield } from "lucide-react"

interface ChatMessageProps {
  username: string
  avatar?: string
  message: string
  timestamp: string
  isBot?: boolean
  isAdmin?: boolean
  isModerator?: boolean
  serverName: string
  channelName: string
}

export function ChatMessage({
  username,
  avatar,
  message,
  timestamp,
  isBot = false,
  isAdmin = false,
  isModerator = false,
  serverName,
  channelName
}: ChatMessageProps) {
  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getRoleIcon = () => {
    if (isAdmin) return <Crown className="h-3 w-3 text-yellow-500" />
    if (isModerator) return <Shield className="h-3 w-3 text-blue-500" />
    return null
  }

  return (
    <div className="flex gap-3 p-4 hover:bg-muted/50 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>{getUserInitials(username)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground">{username}</span>
          {getRoleIcon()}
          {isBot && (
            <Badge variant="secondary" className="text-xs">
              <Bot className="h-2 w-2 mr-1" />
              BOT
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        
        <div className="text-xs text-muted-foreground mb-1">
          #{channelName} • {serverName}
        </div>
        
        <div className="text-sm text-foreground break-words">
          {message}
        </div>
      </div>
    </div>
  )
}