import { AlertTriangle, TrendingDown, Lock, Zap } from "lucide-react";

export default function RiskAssessment() {
  const riskCategories = [
    {
      title: "Market Risks",
      icon: TrendingDown,
      color: "amber",
      risks: [
        {
          risk: "Slow AI adoption",
          likelihood: "Low",
          impact: "High",
          mitigation: "Start with simpler automation, educate market",
        },
        {
          risk: "Currency volatility",
          likelihood: "Medium",
          impact: "Medium",
          mitigation: "Price in DZD, hedge exposure",
        },
        {
          risk: "Regulatory changes",
          likelihood: "Low",
          impact: "High",
          mitigation: "Monitor government AI policy, stay compliant",
        },
        {
          risk: "Payment processor restrictions",
          likelihood: "Medium",
          impact: "High",
          mitigation: "Integrate multiple payment methods early",
        },
      ],
    },
    {
      title: "Competitive Risks",
      icon: AlertTriangle,
      color: "red",
      risks: [
        {
          risk: "Global platforms enter market",
          likelihood: "Medium",
          impact: "High",
          mitigation: "Build local moat (language, integrations, pricing)",
        },
        {
          risk: "Gumloop pricing increases",
          likelihood: "Medium",
          impact: "Medium",
          mitigation: "Diversify with internal workflow engine (Phase 5+)",
        },
        {
          risk: "Local competitor emerges",
          likelihood: "Medium",
          impact: "Medium",
          mitigation: "Move fast, build network effects with templates",
        },
      ],
    },
    {
      title: "Operational Risks",
      icon: Zap,
      color: "orange",
      risks: [
        {
          risk: "Team scaling challenges",
          likelihood: "Medium",
          impact: "Medium",
          mitigation: "Hire experienced engineers, document processes",
        },
        {
          risk: "Customer support burden",
          likelihood: "Medium",
          impact: "Medium",
          mitigation: "Build self-service docs, implement chatbot support",
        },
        {
          risk: "Infrastructure costs exceed projections",
          likelihood: "Low",
          impact: "Medium",
          mitigation: "Monitor costs, optimize queries, use caching",
        },
      ],
    },
  ];

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case "Low":
        return "bg-emerald-500/20 text-emerald-300";
      case "Medium":
        return "bg-amber-500/20 text-amber-300";
      case "High":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-slate-500/20 text-slate-300";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "text-emerald-400";
      case "Medium":
        return "text-amber-400";
      case "High":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Risk Assessment
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Risk Categories */}
        <div className="space-y-12">
          {riskCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-lg ${
                      category.color === "amber"
                        ? "bg-amber-500/20"
                        : category.color === "red"
                        ? "bg-red-500/20"
                        : "bg-orange-500/20"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-slate-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {category.risks.map((risk, riskIndex) => (
                    <div
                      key={riskIndex}
                      className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all"
                    >
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-100 mb-3">
                          {risk.risk}
                        </h4>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Likelihood:</span>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${getLikelihoodColor(
                                risk.likelihood
                              )}`}
                            >
                              {risk.likelihood}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Impact:</span>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                risk.impact === "Low"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : risk.impact === "Medium"
                                  ? "bg-amber-500/20 text-amber-300"
                                  : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {risk.impact}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded bg-slate-700/30 border border-slate-600/30">
                        <p className="text-xs text-slate-400 mb-1">Mitigation Strategy</p>
                        <p className="text-sm text-slate-300">{risk.mitigation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Risk Summary */}
        <div className="mt-12 p-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30">
          <h3 className="text-2xl font-bold text-slate-100 mb-4">Overall Risk Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-400 mb-2">Risk Level</p>
              <p className="text-2xl font-bold text-emerald-300">LOW TO MEDIUM</p>
              <p className="text-xs text-slate-400 mt-2">
                No novel technology required; manageable execution risks
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-2">Mitigation Readiness</p>
              <p className="text-2xl font-bold text-cyan-300">HIGH</p>
              <p className="text-xs text-slate-400 mt-2">
                Clear strategies for all identified risks
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-2">Recommendation</p>
              <p className="text-2xl font-bold text-purple-300">PROCEED</p>
              <p className="text-xs text-slate-400 mt-2">
                Risks are manageable with proper planning
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
