import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ServerCard } from "@/components/ServerCard"
import { Plus, Search, Server, Settings } from "lucide-react"

const mockServers = [
  {
    name: "Gaming Hub",
    memberCount: 15420,
    channelCount: 25,
    roleCount: 12,
    region: "US East",
    isConnected: true
  },
  {
    name: "Tech Community",
    memberCount: 8934,
    channelCount: 18,
    roleCount: 8,
    region: "Europe",
    isConnected: true
  },
  {
    name: "Art & Design",
    memberCount: 4521,
    channelCount: 15,
    roleCount: 6,
    region: "US West",
    isConnected: false
  },
  {
    name: "Music Lovers",
    memberCount: 12043,
    channelCount: 20,
    roleCount: 10,
    region: "Asia",
    isConnected: true
  },
  {
    name: "Study Group",
    memberCount: 2341,
    channelCount: 12,
    roleCount: 5,
    region: "US Central",
    isConnected: true
  },
  {
    name: "Dev Workshop",
    memberCount: 6789,
    channelCount: 22,
    roleCount: 9,
    region: "Europe",
    isConnected: true
  }
]

export default function ServerControl() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServers = mockServers.filter(server =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleServerConfigure = (serverName: string) => {
    console.log(`Configuring server: ${serverName}`)
  }

  const handleViewChannels = (serverName: string) => {
    console.log(`Viewing channels for: ${serverName}`)
  }

  const connectedServers = filteredServers.filter(s => s.isConnected).length
  const totalMembers = filteredServers.reduce((sum, s) => sum + s.memberCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Server Control</h1>
          <p className="text-muted-foreground">Manage Discord servers and their configurations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Connect Server
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Servers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedServers}</div>
            <p className="text-xs text-muted-foreground">
              {mockServers.length - connectedServers} disconnected
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all servers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Channels</CardTitle>
            <div className="h-4 w-4 bg-muted-foreground rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(filteredServers.reduce((sum, s) => sum + s.channelCount, 0) / filteredServers.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per server
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Server Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServers.map((server, index) => (
          <ServerCard
            key={index}
            serverName={server.name}
            memberCount={server.memberCount}
            channelCount={server.channelCount}
            roleCount={server.roleCount}
            region={server.region}
            isConnected={server.isConnected}
            onConfigure={() => handleServerConfigure(server.name)}
            onViewChannels={() => handleViewChannels(server.name)}
          />
        ))}
      </div>
    </div>
  )
}