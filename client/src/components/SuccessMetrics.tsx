import { Target, TrendingUp, Users, Zap } from "lucide-react";

export default function SuccessMetrics() {
  const technicalKPIs = [
    {
      metric: "API Response Time",
      target: "< 200ms",
      importance: "Critical",
      description: "Achievable with FastAPI + caching",
    },
    {
      metric: "Workflow Success Rate",
      target: "> 95%",
      importance: "Critical",
      description: "Depends on Gumloop reliability",
    },
    {
      metric: "Uptime",
      target: "99.9%",
      importance: "Critical",
      description: "Standard SaaS expectation",
    },
    {
      metric: "Cost per Workflow",
      target: "< 0.05 DZD",
      importance: "High",
      description: "Requires optimization",
    },
  ];

  const businessKPIs = [
    {
      metric: "User Activation",
      target: "60%",
      description: "Run first workflow within 24 hours",
      benchmark: "Strong product-market fit indicator",
    },
    {
      metric: "Month-over-Month Retention",
      target: "70%",
      description: "Percentage of users returning monthly",
      benchmark: "Target for SaaS platforms",
    },
    {
      metric: "Template Reuse Rate",
      target: "80%",
      description: "Users prefer templates vs. custom workflows",
      benchmark: "Indicates product-market fit",
    },
    {
      metric: "Net Promoter Score (NPS)",
      target: "> 50",
      description: "Customer satisfaction and loyalty",
      benchmark: "Indicates strong product-market fit",
    },
  ];

  const growthProjection = [
    {
      month: "Month 3",
      users: "50 beta users",
      activation: "20%",
      focus: "Product refinement",
    },
    {
      month: "Month 6",
      users: "200 users",
      activation: "40%",
      focus: "Feature expansion",
    },
    {
      month: "Month 12",
      users: "1,000 users",
      activation: "50%",
      focus: "Market expansion",
    },
    {
      month: "Month 24",
      users: "5,000 users",
      activation: "60%",
      focus: "Enterprise focus",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Success Metrics & KPIs
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Technical KPIs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Technical KPIs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalKPIs.map((kpi, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-slate-100">{kpi.metric}</h4>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                    {kpi.importance}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">
                    {kpi.target}
                  </div>
                  <p className="text-sm text-slate-400">{kpi.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business KPIs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Business KPIs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessKPIs.map((kpi, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-slate-100">{kpi.metric}</h4>
                  <span className="text-2xl font-bold text-purple-400">
                    {kpi.target}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Definition</p>
                    <p className="text-sm text-slate-300">{kpi.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Benchmark</p>
                    <p className="text-sm text-emerald-300">{kpi.benchmark}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Projection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Growth Projection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {growthProjection.map((projection, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-700/50"
              >
                <h4 className="font-bold text-cyan-400 mb-4">{projection.month}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Users</p>
                    <p className="text-lg font-semibold text-slate-100">
                      {projection.users}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Activation Rate</p>
                    <p className="text-lg font-semibold text-purple-400">
                      {projection.activation}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Focus</p>
                    <p className="text-sm text-slate-300">{projection.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Checklist */}
        <div className="p-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Key Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "MVP launch with 5 pre-built templates",
              "First 100 beta users acquired",
              "Product-market fit validation (60% activation)",
              "Break-even achieved (Month 8-10)",
              "1,000 paying users milestone",
              "Template marketplace launched",
              "Local payment integration complete",
              "WhatsApp Manager Bot operational",
            ].map((milestone, index) => (
              <div key={index} className="flex gap-3 p-4 rounded bg-slate-800/30">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-sm text-slate-300">{milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
