import { useState } from "react";
import { DollarSign, TrendingUp, Users, Award, Download, AlertCircle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface CreatorTemplate {
  id: string;
  name: string;
  category: string;
  installs: number;
  rating: number;
  monthlyRevenue: number;
  creatorEarnings: number;
  platformFee: number;
  providerCost: number;
}

interface PayoutRecord {
  id: string;
  month: string;
  amount: number;
  status: "completed" | "pending" | "processing";
  date: string;
  templates: number;
}

const CREATOR_TEMPLATES: CreatorTemplate[] = [
  {
    id: "1",
    name: "Ouedkniss Lead Generator",
    category: "Lead Generation",
    installs: 1247,
    rating: 4.8,
    monthlyRevenue: 2450,
    creatorEarnings: 1102.5,
    platformFee: 735,
    providerCost: 612.5,
  },
  {
    id: "2",
    name: "Instagram Auto-Reply (Darja)",
    category: "Customer Support",
    installs: 856,
    rating: 4.6,
    monthlyRevenue: 1280,
    creatorEarnings: 576,
    platformFee: 384,
    providerCost: 320,
  },
  {
    id: "3",
    name: "Email Report Generator",
    category: "Reporting",
    installs: 2103,
    rating: 4.7,
    monthlyRevenue: 1890,
    creatorEarnings: 850.5,
    platformFee: 567,
    providerCost: 472.5,
  },
];

const PAYOUT_HISTORY: PayoutRecord[] = [
  {
    id: "1",
    month: "January 2024",
    amount: 2450.50,
    status: "completed",
    date: "Feb 5, 2024",
    templates: 3,
  },
  {
    id: "2",
    month: "December 2023",
    amount: 2180.75,
    status: "completed",
    date: "Jan 5, 2024",
    templates: 3,
  },
  {
    id: "3",
    month: "November 2023",
    amount: 1920.25,
    status: "completed",
    date: "Dec 5, 2023",
    templates: 2,
  },
  {
    id: "4",
    month: "October 2023",
    amount: 1650.0,
    status: "completed",
    date: "Nov 5, 2023",
    templates: 2,
  },
];

const REVENUE_TREND = [
  { month: "Oct", revenue: 1650, earnings: 742.5 },
  { month: "Nov", revenue: 1920, earnings: 864 },
  { month: "Dec", revenue: 2180, earnings: 981 },
  { month: "Jan", revenue: 2450, earnings: 1102.5 },
];

const REVENUE_SPLIT = [
  { name: "Creator Earnings", value: 45, color: "#06b6d4" },
  { name: "Platform Fee", value: 30, color: "#a855f7" },
  { name: "Provider Costs", value: 25, color: "#f59e0b" },
];

export default function MarketplaceMonetization() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const totalMonthlyRevenue = CREATOR_TEMPLATES.reduce((sum, t) => sum + t.monthlyRevenue, 0);
  const totalCreatorEarnings = CREATOR_TEMPLATES.reduce((sum, t) => sum + t.creatorEarnings, 0);
  const totalInstalls = CREATOR_TEMPLATES.reduce((sum, t) => sum + t.installs, 0);
  const avgRating =
    (CREATOR_TEMPLATES.reduce((sum, t) => sum + t.rating, 0) / CREATOR_TEMPLATES.length).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            Marketplace Monetization
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Monthly Revenue</p>
            <p className="text-3xl font-bold text-emerald-300 mb-2">${totalMonthlyRevenue.toFixed(2)}</p>
            <p className="text-xs text-slate-400">From all templates</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Your Earnings</p>
            <p className="text-3xl font-bold text-cyan-300 mb-2">${totalCreatorEarnings.toFixed(2)}</p>
            <p className="text-xs text-emerald-400">45% of revenue</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Total Installs</p>
            <p className="text-3xl font-bold text-purple-300 mb-2">{totalInstalls.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Across all templates</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Avg Rating</p>
            <p className="text-3xl font-bold text-yellow-300 mb-2">⭐ {avgRating}</p>
            <p className="text-xs text-slate-400">From user reviews</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={REVENUE_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
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
                  dataKey="revenue"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4" }}
                  name="Total Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                  name="Your Earnings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Split */}
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Revenue Split (45-30-25)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={REVENUE_SPLIT}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {REVENUE_SPLIT.map((entry, index) => (
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

        {/* Templates Performance */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Your Templates Performance</h3>
          <div className="space-y-4">
            {CREATOR_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="rounded-lg bg-slate-700/30 border border-slate-600/30 p-4 hover:border-slate-600/50 transition-all cursor-pointer"
                onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-100 mb-1">{template.name}</h4>
                    <p className="text-xs text-slate-400">{template.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-300">
                      ${template.creatorEarnings.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-400">Your earnings this month</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-slate-500 text-xs">Installs</p>
                    <p className="text-slate-300 font-semibold">{template.installs}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Rating</p>
                    <p className="text-yellow-300 font-semibold">⭐ {template.rating}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Revenue</p>
                    <p className="text-cyan-300 font-semibold">${template.monthlyRevenue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Platform Fee</p>
                    <p className="text-purple-300 font-semibold">${template.platformFee.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Provider Cost</p>
                    <p className="text-orange-300 font-semibold">${template.providerCost.toFixed(2)}</p>
                  </div>
                </div>

                {/* Revenue Split Bar */}
                <div className="flex h-2 rounded-full overflow-hidden bg-slate-600/30">
                  <div
                    className="bg-cyan-500"
                    style={{ width: `${(template.creatorEarnings / template.monthlyRevenue) * 100}%` }}
                  />
                  <div
                    className="bg-purple-500"
                    style={{ width: `${(template.platformFee / template.monthlyRevenue) * 100}%` }}
                  />
                  <div
                    className="bg-orange-500"
                    style={{ width: `${(template.providerCost / template.monthlyRevenue) * 100}%` }}
                  />
                </div>

                {selectedTemplate === template.id && (
                  <div className="mt-4 pt-4 border-t border-slate-600/30 space-y-2 text-sm">
                    <p className="text-slate-300">
                      <span className="text-slate-400">Install Growth:</span>{" "}
                      <span className="text-emerald-300">+12% this month</span>
                    </p>
                    <p className="text-slate-300">
                      <span className="text-slate-400">Avg Rating Trend:</span>{" "}
                      <span className="text-yellow-300">Stable at {template.rating}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payout History */}
        <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-100">Payout History</h3>
            <button className="px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Period</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Amount</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-semibold">Templates</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {PAYOUT_HISTORY.map((payout) => (
                  <tr key={payout.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-all">
                    <td className="py-3 px-4 text-slate-100 font-medium">{payout.month}</td>
                    <td className="text-right py-3 px-4 text-emerald-300 font-semibold">
                      ${payout.amount.toFixed(2)}
                    </td>
                    <td className="text-center py-3 px-4 text-slate-300">{payout.templates}</td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payout.status === "completed"
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                            : payout.status === "pending"
                            ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
                            : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                        }`}
                      >
                        {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-slate-400">{payout.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-300 mb-2">Dispute Resolution</h3>
              <p className="text-sm text-slate-300 mb-3">
                Have a question about your earnings or a payout? Our support team is here to help.
              </p>
              <button className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium transition-all">
                Open Support Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
