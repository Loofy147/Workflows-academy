import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, Zap, Clock, AlertCircle, Download } from "lucide-react";
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

interface WorkflowMetrics {
  id: string;
  name: string;
  totalExecutions: number;
  successRate: number;
  avgDuration: number;
  totalCost: number;
  monthlyRevenue: number;
  trend: number;
}

const WORKFLOWS: WorkflowMetrics[] = [
  {
    id: "wf_1",
    name: "KYC Verification",
    totalExecutions: 1250,
    successRate: 94.2,
    avgDuration: 45,
    totalCost: 1187.5,
    monthlyRevenue: 2840,
    trend: 12.5,
  },
  {
    id: "wf_2",
    name: "Contract Analysis",
    totalExecutions: 890,
    successRate: 91.8,
    avgDuration: 32,
    totalCost: 667.5,
    monthlyRevenue: 1680,
    trend: 8.3,
  },
  {
    id: "wf_3",
    name: "Invoice Processing",
    totalExecutions: 1050,
    successRate: 96.5,
    avgDuration: 28,
    totalCost: 577.5,
    monthlyRevenue: 1950,
    trend: 15.2,
  },
];

const EXECUTION_TREND = [
  { date: "Jan 1", executions: 120, successful: 113, failed: 7 },
  { date: "Jan 5", executions: 145, successful: 137, failed: 8 },
  { date: "Jan 10", executions: 198, successful: 187, failed: 11 },
  { date: "Jan 15", executions: 210, successful: 199, failed: 11 },
  { date: "Jan 20", executions: 235, successful: 222, failed: 13 },
  { date: "Jan 25", executions: 280, successful: 265, failed: 15 },
  { date: "Jan 30", executions: 320, successful: 302, failed: 18 },
];

const COST_BREAKDOWN = [
  { name: "Provider Costs", value: 2432.5 },
  { name: "Platform Fee", value: 1620 },
  { name: "Your Earnings", value: 3470 },
];

const ERROR_DISTRIBUTION = [
  { name: "Timeout", value: 35 },
  { name: "Invalid Input", value: 28 },
  { name: "Provider Error", value: 22 },
  { name: "Rate Limit", value: 15 },
];

const COLORS = {
  primary: "#06b6d4",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
};

export default function WorkflowAnalytics() {
  const [, navigate] = useLocation();
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowMetrics | null>(WORKFLOWS[0]);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const totalExecutions = WORKFLOWS.reduce((sum, w) => sum + w.totalExecutions, 0);
  const avgSuccessRate = (WORKFLOWS.reduce((sum, w) => sum + w.successRate, 0) / WORKFLOWS.length).toFixed(1);
  const totalCost = WORKFLOWS.reduce((sum, w) => sum + w.totalCost, 0);
  const totalRevenue = WORKFLOWS.reduce((sum, w) => sum + w.monthlyRevenue, 0);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-100">Workflow Analytics</h1>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Executions</p>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">{totalExecutions.toLocaleString()}</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 23.5% from last period</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Success Rate</p>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">{avgSuccessRate}%</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 2.1% improvement</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Cost</p>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">${totalCost.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2">Provider costs</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Monthly Revenue</p>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 10.8% growth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Execution Trend */}
          <div className="lg:col-span-2 rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">Execution Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={EXECUTION_TREND}>
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
                />
                <Legend />
                <Line type="monotone" dataKey="successful" stroke={COLORS.success} strokeWidth={2} />
                <Line type="monotone" dataKey="failed" stroke={COLORS.error} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Breakdown */}
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">Revenue Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={COST_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${((value / 7522.5) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COST_BREAKDOWN.map((entry, index) => (
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
                  formatter={(value) => `$${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Error Distribution */}
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">Error Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ERROR_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey="value" fill={COLORS.error} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Workflow Performance */}
          <div className="lg:col-span-2 rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">Workflow Performance</h2>
            <div className="space-y-3">
              {WORKFLOWS.map((workflow) => (
                <div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedWorkflow?.id === workflow.id
                      ? "bg-cyan-500/10 border-cyan-500/30"
                      : "bg-slate-700/30 border-slate-600/30 hover:border-slate-600/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-100">{workflow.name}</h4>
                      <p className="text-xs text-slate-500">{workflow.totalExecutions} executions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-300">{workflow.successRate}%</p>
                      <p className="text-xs text-slate-400">success rate</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                      style={{ width: `${workflow.successRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Workflow Details */}
        {selectedWorkflow && (
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">{selectedWorkflow.name} - Detailed Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <p className="text-xs text-slate-500 mb-1">Avg Duration</p>
                <p className="text-2xl font-bold text-slate-100">{selectedWorkflow.avgDuration}s</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <p className="text-xs text-slate-500 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-emerald-300">{selectedWorkflow.successRate}%</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <p className="text-xs text-slate-500 mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-slate-100">${selectedWorkflow.totalCost.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <p className="text-xs text-slate-500 mb-1">Monthly Revenue</p>
                <p className="text-2xl font-bold text-purple-300">${selectedWorkflow.monthlyRevenue}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
