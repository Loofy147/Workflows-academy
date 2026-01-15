import { TrendingUp, Users, Globe, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function MarketAnalysis() {
  const marketData = [
    {
      title: "AI Market Growth",
      value: "42.65%",
      unit: "CAGR (2025-2031)",
      icon: TrendingUp,
      color: "cyan",
    },
    {
      title: "Market Volume 2031",
      value: "$2.02B",
      unit: "Projected size",
      icon: Globe,
      color: "purple",
    },
    {
      title: "E-Commerce Market",
      value: "$2.34B",
      unit: "Current size (2025)",
      icon: Users,
      color: "emerald",
    },
    {
      title: "E-Commerce Growth",
      value: "3.46%",
      unit: "Annual growth rate",
      icon: Zap,
      color: "blue",
    },
  ];

  const competitors = [
    {
      name: "Gumloop",
      type: "AI Agent Platform",
      strength: "Emerging leader, AI-first approach",
      weakness: "Generic, not localized",
    },
    {
      name: "Zapier",
      type: "Workflow Automation",
      strength: "Established, large integration library",
      weakness: "Lacks AI-first approach, expensive",
    },
    {
      name: "Make (Integromat)",
      type: "Visual Automation",
      strength: "Powerful, flexible",
      weakness: "Complex for non-technical users",
    },
    {
      name: "Activepieces",
      type: "Open-Source Alternative",
      strength: "Self-hosted, customizable",
      weakness: "Requires technical expertise",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Market Analysis
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Market Size Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketData.map((data, index) => {
            const Icon = data.icon;
            const colorMap: Record<string, string> = {
              cyan: "from-cyan-500 to-cyan-600",
              purple: "from-purple-500 to-purple-600",
              emerald: "from-emerald-500 to-emerald-600",
              blue: "from-blue-500 to-blue-600",
            };

            return (
              <div
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colorMap[data.color]} bg-opacity-10 w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-slate-100" />
                </div>
                <p className="text-sm text-slate-400 mb-2">{data.title}</p>
                <div className="text-3xl font-bold text-slate-100 mb-1">
                  {data.value}
                </div>
                <p className="text-xs text-slate-500">{data.unit}</p>
              </div>
            );
          })}
        </div>

        {/* Algerian Tech Ecosystem */}
        <div className="mb-12 p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">
            Algerian Tech Ecosystem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-cyan-300 mb-4">Growth Trajectory</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex gap-3">
                  <span className="text-cyan-400">✓</span>
                  <span>Explosive AI market growth with 42.65% CAGR (2025-2031)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">✓</span>
                  <span>National AI Strategy launched in December 2024</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">✓</span>
                  <span>Africa's largest R&D center being inaugurated</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">✓</span>
                  <span>Phase One digital transformation (2025-2026) underway</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-4">Digital Adoption</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex gap-3">
                  <span className="text-purple-400">✓</span>
                  <span>WhatsApp is dominant communication platform for businesses</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400">✓</span>
                  <span>Strong consumer behavior shift toward online purchasing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400">✓</span>
                  <span>High social media penetration (Facebook, Instagram)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400">✓</span>
                  <span>Growing adoption of digital payment methods</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Competitive Landscape */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">
            Competitive Landscape
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <h4 className="font-semibold text-slate-100 mb-2">{competitor.name}</h4>
                <p className="text-xs text-slate-400 mb-4">{competitor.type}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-emerald-400 font-semibold mb-1">Strength</p>
                    <p className="text-sm text-slate-300">{competitor.strength}</p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-400 font-semibold mb-1">Weakness</p>
                    <p className="text-sm text-slate-300">{competitor.weakness}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-300 mb-4">Market Gap & Opportunity</h4>
            <p className="text-slate-300 mb-4">
              <strong>No localized multi-agent platform exists for Algerian SMBs.</strong> Global platforms miss critical local needs:
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span><strong>Language:</strong> Darja dialect support not available in global platforms</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span><strong>Payments:</strong> Direct CIB/SATIM/Baridimob integration missing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span><strong>Communication:</strong> WhatsApp-first design not prioritized</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span><strong>Pricing:</strong> Currency conversion friction eliminated with DZD pricing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span><strong>Localization:</strong> Wilaya-based analytics and local holidays integration</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">
            Defensible Competitive Advantages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Deep Localization",
                items: ["Darja AI fine-tuning", "Wilaya-based analytics", "Local holiday calendar"],
              },
              {
                title: "Payment Integration",
                items: ["Direct CIB/SATIM integration", "Baridimob support", "Local settlement"],
              },
              {
                title: "User Experience",
                items: ["WhatsApp-first design", "SMS-based workflows", "Local language support"],
              },
              {
                title: "Market Positioning",
                items: ["Pricing in DZD", "Local customer support", "Community-driven templates"],
              },
            ].map((advantage, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <h4 className="font-semibold text-slate-100 mb-3">{advantage.title}</h4>
                <ul className="space-y-2">
                  {advantage.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-cyan-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
