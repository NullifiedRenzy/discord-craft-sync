import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Play, Square, Settings, Activity } from "lucide-react"

interface BotStatusCardProps {
  botName: string
  status: "online" | "offline" | "idle"
  servers: number
  members: number
  lastActive: string
  onStart: () => void
  onStop: () => void
  onConfigure: () => void
}

export function BotStatusCard({
  botName,
  status,
  servers,
  members,
  lastActive,
  onStart,
  onStop,
  onConfigure
}: BotStatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-accent text-accent-foreground"
      case "offline": return "bg-destructive text-destructive-foreground"
      case "idle": return "bg-yellow-500 text-white"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
      case "offline": return <div className="w-2 h-2 bg-destructive rounded-full" />
      case "idle": return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
      default: return <div className="w-2 h-2 bg-muted rounded-full" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot className="h-4 w-4" />
          {botName}
        </CardTitle>
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <Badge variant="secondary" className={getStatusColor(status)}>
            {status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Servers</p>
            <p className="text-lg font-semibold">{servers}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Members</p>
            <p className="text-lg font-semibold">{members.toLocaleString()}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">Last Active</p>
          <p className="text-sm">{lastActive}</p>
        </div>
        <div className="flex gap-2">
          {status === "offline" ? (
            <Button size="sm" onClick={onStart} className="flex-1">
              <Play className="h-3 w-3 mr-1" />
              Start
            </Button>
          ) : (
            <Button size="sm" variant="destructive" onClick={onStop} className="flex-1">
              <Square className="h-3 w-3 mr-1" />
              Stop
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onConfigure}>
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}