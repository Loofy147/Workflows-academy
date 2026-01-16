import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Users, Eye, Download, Calendar } from "lucide-react";
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

interface Template {
  id: string;
  name: string;
  category: string;
  installs: number;
  views: number;
  rating: number;
  monthlyEarnings: number;
  totalEarnings: number;
  revenueSplit: {
    creator: number;
    platform: number;
    providers: number;
  };
  status: "active" | "inactive" | "pending";
}

interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  templates: string[];
  period: string;
}

const TEMPLATES: Template[] = [
  {
    id: "kyc-1",
    name: "KYC Verification Pipeline",
    category: "Compliance",
    installs: 1250,
    views: 8420,
    rating: 4.8,
    monthlyEarnings: 2840,
    totalEarnings: 18500,
    revenueSplit: { creator: 45, platform: 30, providers: 25 },
    status: "active",
  },
  {
    id: "contract-1",
    name: "Contract Analysis & Extraction",
    category: "Legal",
    installs: 890,
    views: 5230,
    rating: 4.6,
    monthlyEarnings: 1680,
    totalEarnings: 12400,
    revenueSplit: { creator: 40, platform: 35, providers: 25 },
    status: "active",
  },
  {
    id: "invoice-1",
    name: "Invoice Processing & OCR",
    category: "Finance",
    installs: 1050,
    views: 6890,
    rating: 4.7,
    monthlyEarnings: 1950,
    totalEarnings: 15200,
    revenueSplit: { creator: 45, platform: 30, providers: 25 },
    status: "active",
  },
  {
    id: "content-1",
    name: "Content Generation & Optimization",
    category: "Marketing",
    installs: 720,
    views: 4560,
    rating: 4.5,
    monthlyEarnings: 890,
    totalEarnings: 6200,
    revenueSplit: { creator: 50, platform: 30, providers: 20 },
    status: "active",
  },
];

const PAYOUT_HISTORY: PayoutRecord[] = [
  {
    id: "payout_1",
    date: "2024-01-31",
    amount: 6360,
    status: "completed",
    templates: ["kyc-1", "contract-1", "invoice-1", "content-1"],
    period: "January 2024",
  },
  {
    id: "payout_2",
    date: "2023-12-31",
    amount: 5890,
    status: "completed",
    templates: ["kyc-1", "contract-1", "invoice-1"],
    period: "December 2023",
  },
  {
    id: "payout_3",
    date: "2023-11-30",
    amount: 5420,
    status: "completed",
    templates: ["kyc-1", "contract-1", "invoice-1", "content-1"],
    period: "November 2023",
  },
  {
    id: "payout_4",
    date: "2024-02-15",
    amount: 6850,
    status: "pending",
    templates: ["kyc-1", "contract-1", "invoice-1", "content-1"],
    period: "February 2024",
  },
];

const EARNINGS_CHART = [
  { month: "Sep", earnings: 4200 },
  { month: "Oct", earnings: 5100 },
  { month: "Nov", earnings: 5420 },
  { month: "Dec", earnings: 5890 },
  { month: "Jan", earnings: 6360 },
  { month: "Feb", earnings: 6850 },
];

const COLORS = {
  creator: "#06b6d4",
  platform: "#8b5cf6",
  providers: "#ec4899",
};

export default function CreatorPayouts() {
  const [, navigate] = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(TEMPLATES[0]);
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year" | "all">("month");

  const totalEarnings = TEMPLATES.reduce((sum, t) => sum + t.totalEarnings, 0);
  const monthlyEarnings = TEMPLATES.reduce((sum, t) => sum + t.monthlyEarnings, 0);
  const totalInstalls = TEMPLATES.reduce((sum, t) => sum + t.installs, 0);
  const totalViews = TEMPLATES.reduce((sum, t) => sum + t.views, 0);

  const revenueSplitData = selectedTemplate
    ? [
        { name: "Creator Earnings", value: selectedTemplate.revenueSplit.creator },
        { name: "Platform Fee", value: selectedTemplate.revenueSplit.platform },
        { name: "Provider Costs", value: selectedTemplate.revenueSplit.providers },
      ]
    : [];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Creator Payouts
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0">
              Request Payout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Earnings</p>
              <DollarSign className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">${totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 12.5% from last month</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">This Month</p>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">${monthlyEarnings.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2">4 active templates</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Installs</p>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">{totalInstalls.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2">Across all templates</p>
          </div>

          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Views</p>
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-slate-100">{totalViews.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2">Marketplace impressions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Earnings Chart */}
          <div className="lg:col-span-2 rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
            <h2 className="text-lg font-bold text-slate-100 mb-6">Earnings Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={EARNINGS_CHART}>
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
                  formatter={(value) => `$${value}`}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: "#06b6d4", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Split */}
          {selectedTemplate && (
            <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-6">
              <h2 className="text-lg font-bold text-slate-100 mb-6">Revenue Split</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={revenueSplitData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueSplitData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
                      />
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
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Creator:</span>
                  <span className="text-cyan-300 font-semibold">{selectedTemplate.revenueSplit.creator}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Platform:</span>
                  <span className="text-purple-300 font-semibold">{selectedTemplate.revenueSplit.platform}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Providers:</span>
                  <span className="text-pink-300 font-semibold">{selectedTemplate.revenueSplit.providers}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Templates Performance */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-100 mb-4">Your Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedTemplate?.id === template.id
                    ? "bg-cyan-500/10 border-cyan-500/30"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-100">{template.name}</h3>
                    <p className="text-xs text-slate-500">{template.category}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      template.status === "active"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-700/30 text-slate-400"
                    }`}
                  >
                    {template.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-slate-500">Installs</p>
                    <p className="text-sm font-bold text-slate-100">{template.installs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Rating</p>
                    <p className="text-sm font-bold text-yellow-400">⭐ {template.rating}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Monthly</p>
                    <p className="text-sm font-bold text-cyan-300">${template.monthlyEarnings}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 text-xs h-8"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 text-xs h-8"
                  >
                    Analytics
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout History */}
        <div>
          <h2 className="text-lg font-bold text-slate-100 mb-4">Payout History</h2>
          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/30">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Templates</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYOUT_HISTORY.map((payout) => (
                    <tr key={payout.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-all">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{payout.period}</p>
                          <p className="text-xs text-slate-500">{payout.date}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-cyan-300">${payout.amount.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            payout.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : payout.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {payout.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-400">{payout.templates.length} templates</p>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="outline" className="border-slate-600 text-slate-300 text-xs h-8">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
