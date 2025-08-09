import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Server, Users, MessageSquare, Settings, ExternalLink } from "lucide-react"

interface ServerCardProps {
  serverName: string
  memberCount: number
  channelCount: number
  roleCount: number
  region: string
  isConnected: boolean
  onConfigure: () => void
  onViewChannels: () => void
}

export function ServerCard({
  serverName,
  memberCount,
  channelCount,
  roleCount,
  region,
  isConnected,
  onConfigure,
  onViewChannels
}: ServerCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Server className="h-4 w-4" />
          {serverName}
        </CardTitle>
        <Badge variant={isConnected ? "default" : "secondary"}>
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Members</p>
            <p className="text-sm font-semibold">{memberCount.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <MessageSquare className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Channels</p>
            <p className="text-sm font-semibold">{channelCount}</p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 mx-auto mb-1 bg-muted-foreground rounded-full"></div>
            <p className="text-xs text-muted-foreground">Roles</p>
            <p className="text-sm font-semibold">{roleCount}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">Region</p>
          <p className="text-sm">{region}</p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onViewChannels} className="flex-1">
            <ExternalLink className="h-3 w-3 mr-1" />
            Channels
          </Button>
          <Button size="sm" onClick={onConfigure}>
            <Settings className="h-3 w-3 mr-1" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}