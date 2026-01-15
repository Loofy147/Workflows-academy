import { CheckCircle, AlertCircle, Zap, Database } from "lucide-react";

export default function TechnicalFeasibility() {
  const stackComponents = [
    {
      name: "FastAPI",
      rating: "Excellent",
      rationale: "High performance, async support, auto-documentation, type safety",
      color: "emerald",
    },
    {
      name: "PostgreSQL",
      rating: "Excellent",
      rationale: "JSONB for flexible workflows, strong multi-tenancy, battle-tested",
      color: "emerald",
    },
    {
      name: "Redis",
      rating: "Excellent",
      rationale: "Fast rate limiting, caching, job queues, session management",
      color: "emerald",
    },
    {
      name: "Gumloop",
      rating: "Good",
      rationale: "Handles complexity, allows focus on UX, but introduces vendor dependency",
      color: "amber",
    },
  ];

  const scalingPath = [
    {
      milestone: "100 Users",
      actions: "Add Redis caching, optimize database queries",
      complexity: "Low",
    },
    {
      milestone: "1,000 Users",
      actions: "PostgreSQL read replicas, horizontal API scaling, CDN",
      complexity: "Medium",
    },
    {
      milestone: "10,000+ Users",
      actions: "Kubernetes, database sharding, dedicated infrastructure per tier",
      complexity: "High",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Technical Feasibility
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Recommended Stack */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Recommended Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stackComponents.map((component, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-100">{component.name}</h4>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      component.color === "emerald"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {component.rating}
                  </span>
                </div>
                <p className="text-sm text-slate-300">{component.rationale}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Complexity */}
        <div className="mb-12 p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Implementation Complexity</h3>
          <div className="space-y-4">
            {[
              {
                phase: "MVP (Weeks 1-2)",
                complexity: "Low",
                description: "Core tables, pre-built templates, basic auth, Gumloop integration",
              },
              {
                phase: "Dynamic Workflows (Week 3)",
                complexity: "Medium",
                description: "Natural language parsing, cost estimator, workflow validation",
              },
              {
                phase: "Template Marketplace (Week 4)",
                complexity: "Medium",
                description: "Browse/search, customization wizard, rating system",
              },
              {
                phase: "Optimization (Week 5)",
                complexity: "Medium",
                description: "Advanced caching, deduplication, quality validation",
              },
              {
                phase: "Localization (Week 6)",
                complexity: "Medium-High",
                description: "Darja AI, payment integration, WhatsApp bot",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-slate-700/30">
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      item.complexity === "Low"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : item.complexity === "Medium"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {item.complexity}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-100 mb-1">{item.phase}</h4>
                  <p className="text-sm text-slate-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scaling Path */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Scaling Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scalingPath.map((item, index) => (
              <div key={index} className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-cyan-300 mb-4">{item.milestone}</h4>
                <p className="text-sm text-slate-300 mb-4">{item.actions}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Complexity:</span>
                  <span
                    className={`font-semibold ${
                      item.complexity === "Low"
                        ? "text-emerald-400"
                        : item.complexity === "Medium"
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.complexity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="p-8 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Technical Risk Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                risk: "Gumloop API Changes",
                likelihood: "Low",
                impact: "Medium",
                mitigation: "Maintain abstraction layer, monitor API changes",
              },
              {
                risk: "Payment API Integration Issues",
                likelihood: "Low",
                impact: "Medium",
                mitigation: "Test integrations early, have fallback methods",
              },
              {
                risk: "Data Privacy Compliance",
                likelihood: "Low",
                impact: "High",
                mitigation: "Implement GDPR-like practices, encrypt data",
              },
              {
                risk: "Infrastructure Cost Overruns",
                likelihood: "Low",
                impact: "Medium",
                mitigation: "Monitor costs, optimize queries, use caching",
              },
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <h4 className="font-semibold text-slate-100 mb-2">{item.risk}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Likelihood:</span>
                    <span className="text-amber-300 font-semibold">{item.likelihood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Impact:</span>
                    <span className="text-red-300 font-semibold">{item.impact}</span>
                  </div>
                  <p className="text-slate-300 mt-3">{item.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
