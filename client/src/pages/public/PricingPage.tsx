import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

export default function PricingPage() {
  const [, navigate] = useLocation();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started",
      cta: "Get Started",
      highlighted: false,
      features: [
        { name: "Up to 10 workflows", included: true },
        { name: "Basic templates", included: true },
        { name: "Community support", included: true },
        { name: "1GB storage", included: true },
        { name: "Team collaboration", included: false },
        { name: "Advanced analytics", included: false },
        { name: "API access", included: false },
        { name: "Custom integrations", included: false },
        { name: "Priority support", included: false },
        { name: "SLA guarantee", included: false },
      ],
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "For growing teams",
      cta: "Start Free Trial",
      highlighted: true,
      features: [
        { name: "Unlimited workflows", included: true },
        { name: "All templates", included: true },
        { name: "Email support", included: true },
        { name: "100GB storage", included: true },
        { name: "Team collaboration", included: true },
        { name: "Advanced analytics", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "Priority support", included: false },
        { name: "SLA guarantee", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact sales",
      description: "For large organizations",
      cta: "Contact Sales",
      highlighted: false,
      features: [
        { name: "Unlimited everything", included: true },
        { name: "Premium templates", included: true },
        { name: "Dedicated support", included: true },
        { name: "Unlimited storage", included: true },
        { name: "Team collaboration", included: true },
        { name: "Advanced analytics", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "Priority support", included: true },
        { name: "99.9% SLA guarantee", included: true },
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes, all paid plans include a 14-day free trial with full access to all features.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, we offer 20% discount when you pay annually instead of monthly.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "Your data remains accessible for 30 days after cancellation. You can export it anytime.",
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees or hidden charges. You only pay for your plan.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AgentFlow
          </button>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/auth/login")} variant="outline" className="border-slate-600 text-slate-300">
              Login
            </Button>
            <Button onClick={() => navigate("/auth/signup")} className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always flexible to scale up or down.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border p-8 transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/30 scale-105 shadow-2xl"
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-cyan-300">{plan.price}</span>
                  <span className="text-slate-400 ml-2">{plan.period}</span>
                </div>
                <Button
                  onClick={() => navigate("/auth/signup")}
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
                      : "bg-slate-700/50 hover:bg-slate-700 text-slate-100 border-0"
                  }`}
                >
                  {plan.cta}
                </Button>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-slate-300" : "text-slate-500"}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-700/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Starter</th>
                  <th className="px-6 py-4 text-center font-semibold">Professional</th>
                  <th className="px-6 py-4 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Workflows", starter: "10", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Monthly Executions", starter: "1,000", pro: "100,000", enterprise: "Unlimited" },
                  { feature: "Storage", starter: "1 GB", pro: "100 GB", enterprise: "Unlimited" },
                  { feature: "Team Members", starter: "1", pro: "10", enterprise: "Unlimited" },
                  { feature: "API Calls/Month", starter: "10,000", pro: "1,000,000", enterprise: "Unlimited" },
                  { feature: "Webhook Integrations", starter: "5", pro: "50", enterprise: "Unlimited" },
                  { feature: "Custom Domains", starter: "No", pro: "Yes", enterprise: "Yes" },
                  { feature: "White Label", starter: "No", pro: "No", enterprise: "Yes" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-slate-700/50 hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-slate-300">{row.starter}</td>
                    <td className="px-6 py-4 text-center text-slate-300">{row.pro}</td>
                    <td className="px-6 py-4 text-center text-slate-300">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of teams automating their workflows with AgentFlow
          </p>
          <Button
            onClick={() => navigate("/auth/signup")}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 px-8 py-6 text-lg"
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-slate-700/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 AgentFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
