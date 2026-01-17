import { useState } from "react";
import { TrendingUp, TrendingDown, Zap, Target, AlertCircle, Lightbulb } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface CostData {
  date: string;
  cost: number;
  executions: number;
  revenue?: number;
}

interface WorkflowCost {
  id: string;
  name: string;
  totalCost: number;
  executions: number;
  avgCost: number;
  roi: number;
  trend: "up" | "down" | "stable";
}

const COST_TREND: CostData[] = [
  { date: "Jan 1", cost: 45.2, executions: 23, revenue: 120 },
  { date: "Jan 2", cost: 52.8, executions: 28, revenue: 145 },
  { date: "Jan 3", cost: 38.5, executions: 19, revenue: 95 },
  { date: "Jan 4", cost: 61.3, executions: 35, revenue: 180 },
  { date: "Jan 5", cost: 55.7, executions: 30, revenue: 160 },
  { date: "Jan 6", cost: 48.2, executions: 25, revenue: 130 },
  { date: "Jan 7", cost: 42.1, executions: 22, revenue: 110 },
];

const WORKFLOW_COSTS: WorkflowCost[] = [
  {
    id: "1",
    name: "Ouedkniss Scraper",
    totalCost: 245.6,
    executions: 156,
    avgCost: 1.57,
    roi: 3.2,
    trend: "down",
  },
  {
    id: "2",
    name: "Instagram Auto-Reply",
    totalCost: 89.3,
    executions: 1247,
    avgCost: 0.072,
    roi: 8.5,
    trend: "up",
  },
  {
    id: "3",
    name: "Email Report Generator",
    totalCost: 156.8,
    executions: 234,
    avgCost: 0.67,
    roi: 2.1,
    trend: "stable",
  },
  {
    id: "4",
    name: "Price Monitor",
    totalCost: 312.4,
    executions: 89,
    avgCost: 3.51,
    roi: 1.8,
    trend: "up",
  },
];

const OPTIMIZATION_RECOMMENDATIONS = [
  {
    id: "1",
    workflow: "Price Monitor",
    issue: "High cost per execution",
    recommendation: "Reduce check frequency from every 6 hours to every 12 hours",
    potentialSavings: 156.2,
    difficulty: "easy",
  },
  {
    id: "2",
    workflow: "Ouedkniss Scraper",
    issue: "Low success rate",
    recommendation: "Implement retry logic with exponential backoff",
    potentialSavings: 45.8,
    difficulty: "medium",
  },
  {
    id: "3",
    workflow: "Email Report Generator",
    issue: "Underutilized workflow",
    recommendation: "Consolidate multiple reports into single execution",
    potentialSavings: 78.4,
    difficulty: "easy",
  },
];

const COST_DISTRIBUTION = [
  { name: "Ouedkniss Scraper", value: 245.6, color: "#06b6d4" },
  { name: "Instagram Auto-Reply", value: 89.3, color: "#a855f7" },
  { name: "Email Reports", value: 156.8, color: "#f59e0b" },
  { name: "Price Monitor", value: 312.4, color: "#ef4444" },
];

export default function CostAnalytics() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");

  const totalCost = WORKFLOW_COSTS.reduce((sum, w) => sum + w.totalCost, 0);
  const totalExecutions = WORKFLOW_COSTS.reduce((sum, w) => sum + w.executions, 0);
  const totalRevenue = 1245.8;
  const totalROI = (totalRevenue / totalCost).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Cost Analytics
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Time Range Filter */}
        <div className="mb-8 flex gap-2">
          {["7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {range === "7d" ? "Last 7 days" : range === "30d" ? "Last 30 days" : "Last 90 days"}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Cost</p>
            <p className="text-3xl font-bold text-cyan-300 mb-2">${totalCost.toFixed(2)}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              12% decrease from last period
            </p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Executions</p>
            <p className="text-3xl font-bold text-purple-300 mb-2">{totalExecutions.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Avg: ${(totalCost / totalExecutions).toFixed(3)}/exec</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-emerald-300 mb-2">${totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-slate-400">From marketplace & usage</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Overall ROI</p>
            <p className="text-3xl font-bold text-yellow-300 mb-2">{totalROI}x</p>
            <p className="text-xs text-slate-400">Revenue per cost dollar</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Cost Trend */}
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Cost Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={COST_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4" }}
                  name="Cost (DZD)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Distribution */}
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Cost by Workflow</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={COST_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COST_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workflow Costs Table */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Cost by Workflow</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Workflow</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Total Cost</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Executions</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Avg Cost</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">ROI</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {WORKFLOW_COSTS.map((workflow) => (
                  <tr key={workflow.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-all">
                    <td className="py-3 px-4 text-slate-100">{workflow.name}</td>
                    <td className="text-right py-3 px-4 text-cyan-300 font-semibold">
                      ${workflow.totalCost.toFixed(2)}
                    </td>
                    <td className="text-right py-3 px-4 text-slate-300">{workflow.executions}</td>
                    <td className="text-right py-3 px-4 text-slate-300">
                      ${workflow.avgCost.toFixed(3)}
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className={workflow.roi > 3 ? "text-emerald-300" : "text-yellow-300"}>
                        {workflow.roi.toFixed(1)}x
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      {workflow.trend === "down" && (
                        <TrendingDown className="w-4 h-4 text-emerald-400 mx-auto" />
                      )}
                      {workflow.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-red-400 mx-auto" />
                      )}
                      {workflow.trend === "stable" && (
                        <div className="w-4 h-4 mx-auto text-slate-400">—</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            AI-Powered Optimization Recommendations
          </h3>

          {OPTIMIZATION_RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.id}
              className="rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-slate-100 mb-1">{rec.workflow}</h4>
                  <p className="text-sm text-slate-400 mb-2">{rec.issue}</p>
                  <p className="text-slate-300">{rec.recommendation}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    rec.difficulty === "easy"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                      : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
                  }`}
                >
                  {rec.difficulty === "easy" ? "Easy" : "Medium"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-yellow-500/20">
                <span className="text-sm text-slate-400">Potential Monthly Savings:</span>
                <span className="text-lg font-bold text-emerald-300">
                  ${rec.potentialSavings.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
