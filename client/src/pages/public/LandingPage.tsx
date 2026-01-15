import { ArrowRight, Zap, BarChart3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AgentFlow
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/pricing")} className="text-slate-300 hover:text-slate-100">
              Pricing
            </button>
            <button onClick={() => navigate("/docs")} className="text-slate-300 hover:text-slate-100">
              Docs
            </button>
            <Button onClick={() => navigate("/auth/login")} variant="outline" size="sm">
              Login
            </Button>
            <Button onClick={() => navigate("/auth/signup")} size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero-abstract.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              AI-Powered Workflows
            </span>
            <br />
            <span className="text-slate-100">Made Simple</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create, manage, and execute intelligent workflows without coding. Automate your business processes with AI agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
              onClick={() => navigate("/auth/signup")}
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-200 hover:bg-slate-800/50"
              onClick={() => navigate("/docs")}
            >
              Learn More
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
              <p className="text-sm text-slate-400">Pre-built Templates</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <p className="text-sm text-slate-400">Uptime Guarantee</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-emerald-400 mb-2">10K+</div>
              <p className="text-sm text-slate-400">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Visual Workflow Builder",
                description: "Drag-and-drop interface to create complex workflows without coding",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Monitor workflow execution, costs, and performance metrics",
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                description: "End-to-end encryption and compliance with industry standards",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to automate?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Start with our free tier. No credit card required.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
            onClick={() => navigate("/auth/signup")}
          >
            Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>&copy; 2025 AgentFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
