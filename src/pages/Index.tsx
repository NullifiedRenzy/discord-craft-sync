import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import Dashboard from "@/pages/Dashboard"
import BotManagement from "@/pages/BotManagement"
import ServerControl from "@/pages/ServerControl"
import ChatMonitor from "@/pages/ChatMonitor"
import { Bot, Menu } from "lucide-react"

const Index = () => {
  return (
    <Router>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div className="hidden lg:flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Discord Bot Manager</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Connected</span>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bots" element={<BotManagement />} />
                <Route path="/servers" element={<ServerControl />} />
                <Route path="/chat" element={<ChatMonitor />} />
                <Route path="/members" element={<div className="text-center p-8"><h2 className="text-2xl font-bold">Members Management</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/analytics" element={<div className="text-center p-8"><h2 className="text-2xl font-bold">Analytics Dashboard</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/permissions" element={<div className="text-center p-8"><h2 className="text-2xl font-bold">Permissions Manager</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/templates" element={<div className="text-center p-8"><h2 className="text-2xl font-bold">Templates</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/settings" element={<div className="text-center p-8"><h2 className="text-2xl font-bold">Settings</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/logs" element={<div className="text-center p-8"><h2 className="text-2xl font-bold">System Logs</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
};

export default Index;
