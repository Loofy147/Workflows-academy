import { TrendingUp, DollarSign, Users, Zap } from "lucide-react";

export default function BusinessModel() {
  const pricingTiers = [
    {
      name: "Free",
      price: "0 DZD",
      workflows: "50",
      apiCalls: "100/day",
      support: "Email",
      target: "Individuals, testing",
      color: "slate",
    },
    {
      name: "Starter",
      price: "3,000 DZD",
      workflows: "500",
      apiCalls: "1,000/day",
      support: "Priority Email",
      target: "Small businesses",
      color: "cyan",
    },
    {
      name: "Pro",
      price: "9,000 DZD",
      workflows: "5,000",
      apiCalls: "10,000/day",
      support: "Chat + Email",
      target: "Growing businesses",
      color: "purple",
    },
    {
      name: "Enterprise",
      price: "Custom",
      workflows: "Unlimited",
      apiCalls: "Unlimited",
      support: "Dedicated Manager",
      target: "Large enterprises",
      color: "emerald",
    },
  ];

  const revenueStreams = [
    {
      title: "Subscription (MRR)",
      description: "Predictable recurring revenue from tiered pricing",
      potential: "Core revenue driver",
      icon: DollarSign,
    },
    {
      title: "Overage Fees",
      description: "Captures high-usage customers beyond tier limits",
      potential: "10-20% additional revenue",
      icon: TrendingUp,
    },
    {
      title: "Marketplace Commission",
      description: "Network effects from template sharing",
      potential: "10-20% commission on premium templates",
      icon: Users,
    },
    {
      title: "White-Label Licensing",
      description: "B2B2C expansion potential for enterprises",
      potential: "High-margin, strategic partnerships",
      icon: Zap,
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Business Model
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Pricing Strategy */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Pricing Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => {
              const colorMap: Record<string, string> = {
                slate: "border-slate-600 bg-slate-800/30",
                cyan: "border-cyan-500/30 bg-cyan-500/5",
                purple: "border-purple-500/30 bg-purple-500/5",
                emerald: "border-emerald-500/30 bg-emerald-500/5",
              };

              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border backdrop-blur-sm transition-all hover:shadow-lg ${colorMap[tier.color]}`}
                >
                  <h4 className="text-lg font-bold text-slate-100 mb-2">{tier.name}</h4>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-slate-100 mb-1">
                      {tier.price}
                    </div>
                    <p className="text-xs text-slate-400">/month</p>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-700/50">
                    <div className="text-sm">
                      <p className="text-slate-400 text-xs mb-1">Workflows</p>
                      <p className="text-slate-100 font-semibold">{tier.workflows}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-400 text-xs mb-1">API Calls/Day</p>
                      <p className="text-slate-100 font-semibold">{tier.apiCalls}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-400 text-xs mb-1">Support</p>
                      <p className="text-slate-100 font-semibold">{tier.support}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">{tier.target}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unit Economics */}
        <div className="mb-12 p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Unit Economics Projection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-cyan-300 mb-4">Month 6: 100 Paying Users</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 rounded bg-slate-700/30">
                  <span className="text-slate-300">30% on Starter (3,000 DZD)</span>
                  <span className="font-semibold text-slate-100">90,000 DZD</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-700/30">
                  <span className="text-slate-300">20% on Pro (9,000 DZD)</span>
                  <span className="font-semibold text-slate-100">180,000 DZD</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-700/30">
                  <span className="text-slate-300">50% on Free</span>
                  <span className="font-semibold text-slate-100">0 DZD</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-emerald-500/10 border border-emerald-500/30 mt-2">
                  <span className="text-emerald-300 font-semibold">Monthly Revenue</span>
                  <span className="font-bold text-emerald-300">270,000 DZD</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-purple-300 mb-4">Month 12: 1,000 Paying Users</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 rounded bg-slate-700/30">
                  <span className="text-slate-300">Average revenue per user</span>
                  <span className="font-semibold text-slate-100">2,700 DZD</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-700/30">
                  <span className="text-slate-300">COGS (Gumloop, infra)</span>
                  <span className="font-semibold text-slate-100">~30% of MRR</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-700/30">
                  <span className="text-slate-300">Gross Margin</span>
                  <span className="font-semibold text-slate-100">~85%</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-purple-500/10 border border-purple-500/30 mt-2">
                  <span className="text-purple-300 font-semibold">Estimated MRR</span>
                  <span className="font-bold text-purple-300">2.7M DZD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded bg-emerald-500/10 border border-emerald-500/30">
            <p className="text-sm text-emerald-300">
              <strong>Break-even Timeline:</strong> Likely by Month 8-10 with proper execution and customer acquisition
            </p>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Multiple Revenue Streams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {revenueStreams.map((stream, index) => {
              const Icon = stream.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                      <Icon className="w-6 h-6 text-slate-100" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-100 mb-2">{stream.title}</h4>
                      <p className="text-sm text-slate-300 mb-3">{stream.description}</p>
                      <p className="text-xs text-emerald-400 font-semibold">{stream.potential}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="p-8 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Customer Acquisition Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                channel: "Organic Channels",
                tactics: [
                  "Product-led growth (free tier)",
                  "Algerian tech communities",
                  "WhatsApp entrepreneur groups",
                  "Word-of-mouth from templates",
                ],
              },
              {
                channel: "Paid Channels",
                tactics: [
                  "Google Ads (targeting SMBs)",
                  "Facebook/Instagram ads",
                  "LinkedIn B2B targeting",
                  "Local business forums",
                ],
              },
              {
                channel: "Partnerships",
                tactics: [
                  "E-commerce platforms",
                  "Payment processors (CIB, SATIM)",
                  "Delivery services (Yalidine)",
                  "Business associations",
                ],
              },
            ].map((strategy, index) => (
              <div key={index}>
                <h4 className="font-semibold text-slate-100 mb-4">{strategy.channel}</h4>
                <ul className="space-y-2">
                  {strategy.tactics.map((tactic, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-cyan-400">→</span>
                      {tactic}
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
