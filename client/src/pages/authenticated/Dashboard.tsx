import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, Workflow, Plus, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  const chartData = [
    { name: "Mon", workflows: 4 },
    { name: "Tue", workflows: 3 },
    { name: "Wed", workflows: 2 },
    { name: "Thu", workflows: 5 },
    { name: "Fri", workflows: 4 },
    { name: "Sat", workflows: 6 },
    { name: "Sun", workflows: 3 },
  ];

  const recentWorkflows = [
    { id: 1, name: "Lead Generation Pipeline", status: "active", runs: 234 },
    { id: 2, name: "Customer Support Bot", status: "active", runs: 156 },
    { id: 3, name: "Data Processing Task", status: "draft", runs: 0 },
  ];

  const colorMap: Record<string, string> = {
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
  };

  const stats = [
    {
      label: "Workflows Created",
      value: "12",
      icon: Workflow,
      color: "cyan" as const,
    },
    {
      label: "API Calls Today",
      value: "2,456",
      icon: Zap,
      color: "purple" as const,
    },
    {
      label: "Success Rate",
      value: "98.5%",
      icon: BarChart3,
      color: "emerald" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AgentFlow
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Welcome, {user?.name}</span>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Dashboard</h1>
          <p className="text-slate-400">Manage your AI workflows and monitor performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className={`p-6 rounded-lg bg-gradient-to-br ${colorMap[stat.color]} border backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-slate-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts and Workflows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Weekly Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Line
                  type="monotone"
                  dataKey="workflows"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/workflows/builder/new")}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
              <Button
                onClick={() => navigate("/templates")}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
              >
                <Zap className="w-4 h-4 mr-2" />
                Browse Templates
              </Button>
              <Button
                onClick={() => navigate("/workflows")}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
              >
                <Workflow className="w-4 h-4 mr-2" />
                View All Workflows
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Workflows */}
        <div className="mt-12 p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-100">Recent Workflows</h2>
            <button
              onClick={() => navigate("/workflows")}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-slate-600/50 transition-all cursor-pointer"
                onClick={() => navigate(`/workflows/${workflow.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-100">{workflow.name}</h3>
                    <p className="text-sm text-slate-400">{workflow.runs} executions</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      workflow.status === "active"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-600/20 text-slate-400"
                    }`}
                  >
                    {workflow.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
