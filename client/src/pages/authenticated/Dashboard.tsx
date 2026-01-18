import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Zap, TrendingUp, Users, Workflow, BarChart3, Calendar, Clock } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const executionData = [
    { name: "Mon", executions: 240, successful: 200 },
    { name: "Tue", executions: 320, successful: 280 },
    { name: "Wed", executions: 280, successful: 240 },
    { name: "Thu", executions: 390, successful: 350 },
    { name: "Fri", executions: 420, successful: 380 },
    { name: "Sat", executions: 350, successful: 300 },
    { name: "Sun", executions: 280, successful: 250 }
  ];

  const costData = [
    { name: "Week 1", cost: 245.80 },
    { name: "Week 2", cost: 312.50 },
    { name: "Week 3", cost: 289.30 },
    { name: "Week 4", cost: 356.70 }
  ];

  const workflowStatus = [
    { name: "Active", value: 24, color: "#06b6d4" },
    { name: "Paused", value: 8, color: "#a855f7" },
    { name: "Failed", value: 3, color: "#ef4444" }
  ];

  const recentWorkflows = [
    { id: 1, name: "Customer Onboarding", status: "active", executions: 1250, cost: "$45.20" },
    { id: 2, name: "Email Campaign", status: "active", executions: 890, cost: "$32.15" },
    { id: 3, name: "Data Processing", status: "paused", executions: 450, cost: "$18.90" },
    { id: 4, name: "Report Generation", status: "active", executions: 320, cost: "$12.50" }
  ];

  const stats = [
    { label: "Total Executions", value: "12,450", change: "+12.5%", icon: Zap, color: "from-cyan-500 to-blue-500" },
    { label: "Success Rate", value: "98.2%", change: "+2.1%", icon: TrendingUp, color: "from-emerald-500 to-cyan-500" },
    { label: "Monthly Cost", value: "$1,204.30", change: "+8.3%", icon: BarChart3, color: "from-purple-500 to-pink-500" },
    { label: "Team Members", value: "12", change: "+3", icon: Users, color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-slate-400">Here's what's happening with your workflows today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 group-hover:scale-110 transition`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Execution Trends */}
          <Card className="md:col-span-2 bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Execution Trends</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-slate-700">Week</Button>
                <Button size="sm" className="bg-cyan-500/20 border-cyan-500/50">Month</Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={executionData}>
                <defs>
                  <linearGradient id="colorExecutions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                <Area type="monotone" dataKey="executions" stroke="#06b6d4" fillOpacity={1} fill="url(#colorExecutions)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Workflow Status */}
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <h3 className="text-lg font-semibold mb-6">Workflow Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={workflowStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {workflowStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {workflowStatus.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Cost Analysis & Recent Workflows */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cost Trends */}
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <h3 className="text-lg font-semibold mb-6">Cost Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                <Bar dataKey="cost" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Workflows */}
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Workflows</h3>
              <Link href="/workflows">
                <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                  View All <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentWorkflows.map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                      <Workflow className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{workflow.name}</p>
                      <p className="text-xs text-slate-400">{workflow.executions} executions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{workflow.cost}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      workflow.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to create a new workflow?</h3>
              <p className="text-slate-400">Use our AI-powered builder to create your next automation in minutes</p>
            </div>
            <div className="flex gap-3">
              <Link href="/workflow-builder">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90">
                  Create Workflow
                </Button>
              </Link>
              <Button variant="outline" className="border-slate-700">Browse Templates</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
