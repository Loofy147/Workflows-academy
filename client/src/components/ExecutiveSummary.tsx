import { CheckCircle, TrendingUp, Zap, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ExecutiveSummary() {
  const keyIndicators = [
    {
      icon: TrendingUp,
      title: "Market Timing",
      value: "42.65%",
      description: "Algeria's AI market CAGR (2025-2031)",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Target,
      title: "Target Market",
      value: "$2.34B",
      description: "E-commerce sector size (2025)",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Gross Margin",
      value: "88%",
      description: "Potential at 100 paying users",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: CheckCircle,
      title: "Feasibility",
      value: "High",
      description: "Battle-tested tech stack",
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Executive Summary
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Recommendation Box */}
        <div className="mb-12 p-8 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/20">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-emerald-300 mb-2">
                Recommendation: YES, Worth Building
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The proposed multi-agent workflow platform for Algeria presents a compelling business opportunity with strong market tailwinds, a well-architected technical foundation, and clear product-market fit potential. The combination of growing AI adoption in Algeria, increasing e-commerce activity, and the absence of localized workflow automation solutions creates a significant market gap.
              </p>
            </div>
          </div>
        </div>

        {/* Key Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {keyIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 group"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${indicator.color} bg-opacity-10 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-slate-100" />
                </div>
                <p className="text-sm text-slate-400 mb-1">{indicator.title}</p>
                <div className="text-2xl font-bold text-slate-100 mb-2">
                  {indicator.value}
                </div>
                <p className="text-xs text-slate-500">{indicator.description}</p>
              </div>
            );
          })}
        </div>

        {/* Key Viability Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-100 mb-6">Viability Indicators</h3>
            {[
              "Market Timing: Algeria's AI market is projected to grow at 42.65% CAGR (2025-2031)",
              "Target Market Size: E-commerce sector alone is $2.34bn (2025) with 3.46% annual growth",
              "Technical Feasibility: Recommended stack (FastAPI + PostgreSQL + Redis + Gumloop) is battle-tested and scalable",
              "Competitive Advantage: Localization for Algeria creates defensible moat",
            ].map((item, index) => (
              <div key={index} className="flex gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-100 mb-6">Revenue Potential</h3>
            {[
              "Subscription (MRR): Predictable recurring revenue from tiered pricing",
              "Overage Fees: Captures high-usage customers beyond tier limits",
              "Marketplace Commission: Network effects from template sharing (10-20% commission)",
              "White-Label Licensing: B2B2C expansion potential for enterprises",
            ].map((item, index) => (
              <div key={index} className="flex gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12 p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Implementation Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">6-8 Weeks</div>
              <p className="text-sm text-slate-400">Full feature set with experienced team</p>
            </div>
            <div className="text-center border-l border-r border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">2 Weeks</div>
              <p className="text-sm text-slate-400">MVP launch with 5 pre-built templates</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">Week 1</div>
              <p className="text-sm text-slate-400">Customer validation & proof of concept</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
