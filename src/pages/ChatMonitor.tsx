import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "@/components/ChatMessage"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MessageSquare, Eye, EyeOff } from "lucide-react"

const mockMessages = [
  {
    username: "Alice_Gaming",
    avatar: "/placeholder.svg",
    message: "Hey everyone! Who's up for a game of Valorant tonight?",
    timestamp: "2 minutes ago",
    serverName: "Gaming Hub",
    channelName: "general",
    isBot: false,
    isAdmin: false,
    isModerator: true
  },
  {
    username: "ModBot",
    message: "Auto-moderation: Removed message containing inappropriate content from @ToxicUser",
    timestamp: "5 minutes ago",
    serverName: "Gaming Hub", 
    channelName: "general",
    isBot: true,
    isAdmin: false,
    isModerator: false
  },
  {
    username: "TechGuru",
    message: "Just pushed a new update to the React documentation. Check it out in #announcements!",
    timestamp: "8 minutes ago",
    serverName: "Tech Community",
    channelName: "development",
    isBot: false,
    isAdmin: true,
    isModerator: false
  },
  {
    username: "DesignPro",
    message: "Working on some new UI concepts. Would love feedback from the community!",
    timestamp: "12 minutes ago",
    serverName: "Art & Design",
    channelName: "showcase",
    isBot: false,
    isAdmin: false,
    isModerator: false
  },
  {
    username: "MusicBot",
    message: "🎵 Now playing: Bohemian Rhapsody by Queen",
    timestamp: "15 minutes ago",
    serverName: "Music Lovers",
    channelName: "music-bot",
    isBot: true,
    isAdmin: false,
    isModerator: false
  }
]

export default function ChatMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedServer, setSelectedServer] = useState("all")
  const [selectedChannel, setSelectedChannel] = useState("all")
  const [isLiveMode, setIsLiveMode] = useState(true)

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesServer = selectedServer === "all" || message.serverName === selectedServer
    const matchesChannel = selectedChannel === "all" || message.channelName === selectedChannel
    
    return matchesSearch && matchesServer && matchesChannel
  })

  const servers = ["all", ...Array.from(new Set(mockMessages.map(m => m.serverName)))]
  const channels = selectedServer === "all" 
    ? ["all", ...Array.from(new Set(mockMessages.map(m => m.channelName)))]
    : ["all", ...Array.from(new Set(mockMessages.filter(m => m.serverName === selectedServer).map(m => m.channelName)))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chat Monitor</h1>
          <p className="text-muted-foreground">Real-time monitoring of Discord chat across all servers</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isLiveMode ? "default" : "secondary"} className="cursor-pointer" onClick={() => setIsLiveMode(!isLiveMode)}>
            {isLiveMode ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
            {isLiveMode ? "Live" : "Paused"}
          </Badge>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedServer} onValueChange={setSelectedServer}>
              <SelectTrigger>
                <SelectValue placeholder="Select server" />
              </SelectTrigger>
              <SelectContent>
                {servers.map(server => (
                  <SelectItem key={server} value={server}>
                    {server === "all" ? "All Servers" : server}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.map(channel => (
                  <SelectItem key={channel} value={channel}>
                    {channel === "all" ? "All Channels" : `#${channel}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,247</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Channels</CardTitle>
            <div className="h-4 w-4 bg-muted-foreground rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground">Across all servers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moderation Actions</CardTitle>
            <div className="h-4 w-4 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Auto-mod interventions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bot Messages</CardTitle>
            <div className="h-4 w-4 bg-primary rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,432</div>
            <p className="text-xs text-muted-foreground">17% of total messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Live Chat Feed
            {isLiveMode && <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <ChatMessage
                  key={index}
                  username={message.username}
                  avatar={message.avatar}
                  message={message.message}
                  timestamp={message.timestamp}
                  isBot={message.isBot}
                  isAdmin={message.isAdmin}
                  isModerator={message.isModerator}
                  serverName={message.serverName}
                  channelName={message.channelName}
                />
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No messages match your current filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}