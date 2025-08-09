import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BotStatusCard } from "@/components/BotStatusCard"
import { Plus, Search, Bot, Settings, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const mockBots = [
  {
    name: "MainBot",
    status: "online" as const,
    servers: 12,
    members: 45623,
    lastActive: "2 minutes ago",
    token: "MTxxxxxxxxxxxxxxxxxxxxx.Yxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    description: "Main Discord bot for general server management and moderation"
  },
  {
    name: "ModBot", 
    status: "online" as const,
    servers: 8,
    members: 23891,
    lastActive: "5 minutes ago",
    token: "MTxxxxxxxxxxxxxxxxxxxxx.Yxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    description: "Specialized moderation bot with advanced auto-mod features"
  },
  {
    name: "BackupBot",
    status: "offline" as const,
    servers: 0,
    members: 0,
    lastActive: "2 hours ago",
    token: "MTxxxxxxxxxxxxxxxxxxxxx.Yxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    description: "Backup bot for redundancy and failover scenarios"
  }
]

export default function BotManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBot, setSelectedBot] = useState<typeof mockBots[0] | null>(null)

  const filteredBots = mockBots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBotStart = (botName: string) => {
    console.log(`Starting bot: ${botName}`)
  }

  const handleBotStop = (botName: string) => {
    console.log(`Stopping bot: ${botName}`)
  }

  const handleBotConfigure = (botName: string) => {
    const bot = mockBots.find(b => b.name === botName)
    if (bot) {
      setSelectedBot(bot)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bot Management</h1>
          <p className="text-muted-foreground">Create, configure, and monitor your Discord bots</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Bot
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot, index) => (
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

      {/* Bot Configuration Modal */}
      <Dialog open={!!selectedBot} onOpenChange={() => setSelectedBot(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Configure {selectedBot?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedBot && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="botName">Bot Name</Label>
                  <Input id="botName" defaultValue={selectedBot.name} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" defaultValue={selectedBot.description} />
                </div>
                <div>
                  <Label htmlFor="token">Bot Token</Label>
                  <Input id="token" type="password" defaultValue={selectedBot.token} />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-medium">Current Status</h3>
                  <p className="text-sm text-muted-foreground">Bot is currently {selectedBot.status}</p>
                </div>
                <Badge variant={selectedBot.status === "online" ? "default" : "secondary"}>
                  {selectedBot.status.toUpperCase()}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Config
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}