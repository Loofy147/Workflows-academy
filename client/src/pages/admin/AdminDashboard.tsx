import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Zap, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3, Settings, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTemplates: number;
  totalExecutions: number;
  platformRevenue: number;
  creatorPayouts: number;
  systemHealth: number;
}

const PLATFORM_STATS: AdminStats = {
  totalUsers: 2450,
  activeUsers: 1820,
  totalTemplates: 156,
  totalExecutions: 45230,
  platformRevenue: 67500,
  creatorPayouts: 45200,
  systemHealth: 99.8,
};

const REVENUE_TREND = [
  { date: "Week 1", platform: 12000, creators: 8000 },
  { date: "Week 2", platform: 14500, creators: 9700 },
  { date: "Week 3", platform: 16200, creators: 10800 },
  { date: "Week 4", platform: 18800, creators: 12500 },
  { date: "Week 5", platform: 21000, creators: 14000 },
  { date: "Week 6", platform: 23500, creators: 15700 },
];

const USER_GROWTH = [
  { month: "Jan", users: 450, activeUsers: 320 },
  { month: "Feb", users: 680, activeUsers: 510 },
  { month: "Mar", users: 950, activeUsers: 720 },
  { month: "Apr", users: 1350, activeUsers: 1050 },
  { month: "May", users: 1820, activeUsers: 1450 },
  { month: "Jun", users: 2450, activeUsers: 1820 },
];

const TEMPLATE_CATEGORIES = [
  { name: "Compliance", value: 28 },
  { name: "Legal", value: 22 },
  { name: "Marketing", value: 31 },
  { name: "Finance", value: 25 },
  { name: "Support", value: 18 },
  { name: "Other", value: 32 },
];

const RECENT_ACTIVITIES = [
  { id: 1, type: "user_signup", user: "John Smith", timestamp: "2 minutes ago", status: "success" },
  { id: 2, type: "template_published", user: "Sarah Johnson", timestamp: "15 minutes ago", status: "success" },
  { id: 3, type: "workflow_executed", user: "Mike Chen", timestamp: "1 hour ago", status: "success" },
  { id: 4, type: "payment_failed", user: "Emma Davis", timestamp: "2 hours ago", status: "error" },
  { id: 5, type: "template_reviewed", user: "Admin", timestamp: "3 hours ago", status: "success" },
];

const COLORS = {
  primary: "#06b6d4",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  purple: "#8b5cf6",
};

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "users" | "templates">("revenue");

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Users</p>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">{PLATFORM_STATS.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 12.5% from last month</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Active Users</p>
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">{PLATFORM_STATS.activeUsers.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2">{((PLATFORM_STATS.activeUsers / PLATFORM_STATS.totalUsers) * 100).toFixed(1)}% engagement</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Platform Revenue</p>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">${PLATFORM_STATS.platformRevenue.toLocaleString()}</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 18.3% growth</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">System Health</p>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">{PLATFORM_STATS.systemHealth}%</p>
            <p className="text-xs text-emerald-400 mt-2">All systems operational</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={REVENUE_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                  formatter={(value) => `$${value}`}
                />
                <Legend />
                <Line type="monotone" dataKey="platform" stroke={COLORS.primary} strokeWidth={2} name="Platform Revenue" />
                <Line type="monotone" dataKey="creators" stroke={COLORS.success} strokeWidth={2} name="Creator Payouts" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Template Distribution */}
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">Templates by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={TEMPLATE_CATEGORIES}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {TEMPLATE_CATEGORIES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* User Growth */}
          <div className="lg:col-span-2 rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={USER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend />
                <Bar dataKey="users" fill={COLORS.primary} name="Total Users" />
                <Bar dataKey="activeUsers" fill={COLORS.success} name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
              <p className="text-sm text-slate-500 mb-2">Total Templates</p>
              <p className="text-3xl font-bold text-slate-100">{PLATFORM_STATS.totalTemplates}</p>
              <p className="text-xs text-slate-400 mt-2">Active in marketplace</p>
            </div>

            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
              <p className="text-sm text-slate-500 mb-2">Total Executions</p>
              <p className="text-3xl font-bold text-slate-100">{PLATFORM_STATS.totalExecutions.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-2">All time</p>
            </div>

            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
              <p className="text-sm text-slate-500 mb-2">Creator Payouts</p>
              <p className="text-3xl font-bold text-slate-100">${PLATFORM_STATS.creatorPayouts.toLocaleString()}</p>
              <p className="text-xs text-emerald-400 mt-2">This month</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
          <h2 className="text-lg font-bold text-slate-100 mb-6">Recent Activities</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success" ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-100 capitalize">
                      {activity.type.replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-slate-500">{activity.user}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
