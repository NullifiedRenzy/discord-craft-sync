import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BotStatusCard } from "@/components/BotStatusCard"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Bot, 
  MessageSquare, 
  Server, 
  Users, 
  TrendingUp,
  AlertTriangle
} from "lucide-react"

const mockBots = [
  {
    name: "MainBot",
    status: "online" as const,
    servers: 12,
    members: 45623,
    lastActive: "2 minutes ago"
  },
  {
    name: "ModBot",
    status: "online" as const,
    servers: 8,
    members: 23891,
    lastActive: "5 minutes ago"
  },
  {
    name: "BackupBot",
    status: "offline" as const,
    servers: 0,
    members: 0,
    lastActive: "2 hours ago"
  }
]

const mockStats = [
  {
    title: "Total Servers",
    value: "20",
    change: "+2",
    changeType: "increase" as const,
    icon: Server
  },
  {
    title: "Total Members",
    value: "69.5K",
    change: "+1.2K",
    changeType: "increase" as const,
    icon: Users
  },
  {
    title: "Messages Today",
    value: "8,247",
    change: "+15%",
    changeType: "increase" as const,
    icon: MessageSquare
  },
  {
    title: "Active Bots",
    value: "2/3",
    change: "1 offline",
    changeType: "warning" as const,
    icon: Bot
  }
]

export default function Dashboard() {
  const handleBotStart = (botName: string) => {
    console.log(`Starting bot: ${botName}`)
  }

  const handleBotStop = (botName: string) => {
    console.log(`Stopping bot: ${botName}`)
  }

  const handleBotConfigure = (botName: string) => {
    console.log(`Configuring bot: ${botName}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage your Discord bots</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.changeType === "increase" && (
                  <TrendingUp className="h-3 w-3 text-accent" />
                )}
                {stat.changeType === "warning" && (
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                )}
                <span className={
                  stat.changeType === "increase" 
                    ? "text-accent" 
                    : stat.changeType === "warning"
                    ? "text-yellow-500"
                    : "text-muted-foreground"
                }>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bot Status Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Bot Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBots.map((bot, index) => (
            <BotStatusCard
              key={index}
              botName={bot.name}
              status={bot.status}
              servers={bot.servers}
              members={bot.members}
              lastActive={bot.lastActive}
              onStart={() => handleBotStart(bot.name)}
              onStop={() => handleBotStop(bot.name)}
              onConfigure={() => handleBotConfigure(bot.name)}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">MainBot connected to Gaming Hub</span>
              </div>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">New member joined Tech Community</span>
              </div>
              <span className="text-xs text-muted-foreground">5 minutes ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">BackupBot went offline</span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}