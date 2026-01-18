import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, BarChart3, Users, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

// Navigation Button Component
function NavigationButton({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  const [, navigate] = useLocation();
  return (
    <Button {...props} onClick={() => navigate(href)}>
      {children}
    </Button>
  );
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Workflows",
      description: "Create complex automation workflows using natural language with our intelligent workflow builder.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Real-Time Execution",
      description: "Monitor workflow execution in real-time with detailed logs, metrics, and instant error detection.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Cost Analytics",
      description: "Track spending trends, ROI calculations, and get AI-powered optimization recommendations.",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Build workflows together with real-time collaboration, presence indicators, and role-based access.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption, SOC 2 compliance, and comprehensive audit logs for complete peace of mind.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Sparkles,
      title: "Template Marketplace",
      description: "Access 100+ pre-built templates or monetize your own workflows with our creator marketplace.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "CEO, TechStart Algeria",
      content: "AgentFlow transformed how we handle customer workflows. We reduced manual work by 80% in just 2 weeks.",
      avatar: "AH"
    },
    {
      name: "Fatima Benali",
      role: "Operations Manager, E-Commerce Hub",
      content: "The cost analytics dashboard helped us identify inefficiencies and cut our automation costs by 45%.",
      avatar: "FB"
    },
    {
      name: "Karim Medjahed",
      role: "CTO, Digital Solutions",
      content: "The real-time collaboration features make it easy for our team to build and iterate on workflows together.",
      avatar: "KM"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for individuals and small teams",
      features: ["Up to 5 workflows", "1,000 executions/month", "Basic analytics", "Email support"],
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$199",
      description: "For growing teams and enterprises",
      features: ["Unlimited workflows", "100,000 executions/month", "Advanced analytics", "Priority support", "Team collaboration"],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale operations",
      features: ["Everything in Professional", "Custom integrations", "Dedicated support", "SLA guarantee", "On-premise option"],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-sm">
              AF
            </div>
            <span className="text-lg font-bold">AgentFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
            <a href="#testimonials" className="hover:text-cyan-400 transition">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <NavigationButton href="/login" variant="ghost" size="sm">Sign In</NavigationButton>
            <NavigationButton href="/signup" size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90">
              Get Started
            </NavigationButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <span className="text-sm text-cyan-400">✨ AI-Powered Workflow Automation</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Automate Everything with{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI Intelligence
                  </span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed">
                  Build, deploy, and monetize powerful AI workflows without coding. Trusted by 1000+ teams across Africa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <NavigationButton href="/signup" size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 w-full sm:w-auto">
                  Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
                </NavigationButton>
                <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-2 border-slate-950"></div>
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-white">1,000+</span> teams automating workflows
                </p>
              </div>
            </div>

            <div className="relative h-96 md:h-full">
              <img 
                src="/images/hero-premium-banner.png" 
                alt="AgentFlow Platform" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{ transform: `translateY(${scrollY * 0.3}px)` }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Powerful Features for Every Need</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to build, deploy, and monetize intelligent workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition p-6 group">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 relative">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">How AgentFlow Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Create", desc: "Use AI to design workflows in natural language" },
              { num: "2", title: "Configure", desc: "Set up triggers, actions, and conditions" },
              { num: "3", title: "Deploy", desc: "Launch your workflow with one click" },
              { num: "4", title: "Monitor", desc: "Track execution and optimize performance" }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 relative">
        <div className="container relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Loved by Teams Across Africa</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-slate-900/80 border-slate-800 backdrop-blur p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300">"{testimonial.content}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-400">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, idx) => (
              <Card 
                key={idx} 
                className={`p-8 transition transform hover:scale-105 ${
                  tier.highlighted 
                    ? "bg-gradient-to-b from-slate-800 to-slate-900 border-cyan-500/50 ring-2 ring-cyan-500/30" 
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-slate-400 mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-slate-400">/month</span>}
                </div>
                <NavigationButton 
                  href="/signup"
                  className={`w-full mb-6 ${
                    tier.highlighted 
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90" 
                      : "border-slate-700 hover:bg-slate-800"
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.cta}
                </NavigationButton>
                <div className="space-y-3">
                  {tier.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workflows?</h2>
            <p className="text-xl text-slate-400 mb-8">Join 1000+ teams automating with AgentFlow today</p>
            <NavigationButton href="/signup" size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90">
              Start Your Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </NavigationButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg"></div>
                <span className="font-bold">AgentFlow</span>
              </div>
              <p className="text-sm text-slate-400">AI-powered workflow automation platform for Africa</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-cyan-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-cyan-400">Pricing</a></li>
                <li><a href="/docs" className="hover:text-cyan-400">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/about" className="hover:text-cyan-400">About</a></li>
                <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 AgentFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
