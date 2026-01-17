import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Users, BarChart3, Workflow, Cpu, CheckCircle } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();

  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description: "Drag-and-drop interface to create complex AI workflows without coding",
    },
    {
      icon: Zap,
      title: "Real-time Execution",
      description: "Execute workflows instantly with real-time monitoring and logging",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption, compliance certifications, and audit logs",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track costs, success rates, and ROI for every workflow execution",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share workflows, manage permissions, and collaborate in real-time",
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Leverage multiple AI providers and LLMs in your workflows",
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, TechCorp",
      text: "AgentFlow reduced our document processing time by 80%. It's a game-changer.",
      avatar: "👨‍💼",
    },
    {
      name: "Sarah Johnson",
      role: "Operations Manager, FinanceFlow",
      text: "The cost estimation feature helped us optimize our workflow spending significantly.",
      avatar: "👩‍💼",
    },
    {
      name: "Mike Chen",
      role: "CTO, DataSystems",
      text: "Building complex AI workflows has never been easier. Highly recommended!",
      avatar: "👨‍💻",
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Workflows Created", value: "50K+" },
    { label: "Executions/Month", value: "500K+" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AgentFlow
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-slate-300 hover:text-slate-100 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-slate-100 transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-slate-300 hover:text-slate-100 transition-colors">
              Docs
            </a>
            <Button
              onClick={() => navigate("/auth/login")}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/auth/signup")}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              AI-Powered Workflows Made Simple
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Create, manage, and execute intelligent workflows without coding. Automate your business processes with AI agents.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/auth/signup")}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 px-8 py-6 text-lg"
              >
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 px-8 py-6 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-700/50">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Everything you need to build, deploy, and monetize AI workflows
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all"
                >
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Create", description: "Build workflows using our visual builder" },
              { step: 2, title: "Configure", description: "Add AI agents and set parameters" },
              { step: 3, title: "Execute", description: "Run workflows with real-time monitoring" },
              { step: 4, title: "Monetize", description: "Publish and earn from your templates" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                features: ["Up to 10 workflows", "Basic templates", "Community support"],
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                features: [
                  "Unlimited workflows",
                  "Advanced templates",
                  "Priority support",
                  "Team collaboration",
                  "Custom integrations",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Everything in Pro",
                  "Dedicated support",
                  "Custom SLA",
                  "White-label options",
                  "Advanced security",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-lg border transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/30 scale-105"
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-cyan-300 mb-6">
                  {plan.price}
                  {plan.period && <span className="text-lg text-slate-400">{plan.period}</span>}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
                      : "bg-slate-700/50 hover:bg-slate-700 text-slate-100 border-0"
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your First Workflow?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of users automating their business processes with AgentFlow
          </p>
          <Button
            onClick={() => navigate("/auth/signup")}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 px-8 py-6 text-lg"
          >
            Start Free Today <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-slate-700/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">AgentFlow</h3>
              <p className="text-slate-400">AI-powered workflow automation platform</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-slate-100">Features</a></li>
                <li><a href="#" className="hover:text-slate-100">Pricing</a></li>
                <li><a href="#" className="hover:text-slate-100">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-slate-100">About</a></li>
                <li><a href="#" className="hover:text-slate-100">Blog</a></li>
                <li><a href="#" className="hover:text-slate-100">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-slate-100">Privacy</a></li>
                <li><a href="#" className="hover:text-slate-100">Terms</a></li>
                <li><a href="#" className="hover:text-slate-100">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400">
            <p>&copy; 2024 AgentFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
