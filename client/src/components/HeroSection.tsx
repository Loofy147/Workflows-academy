import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with gradient and image */}
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

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          <CheckCircle className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-300">Strategic Analysis Complete</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
            Multi-Agent Platform
          </span>
          <br />
          <span className="text-slate-100">for Algeria</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          A comprehensive strategic analysis evaluating the feasibility, market opportunity, and implementation roadmap for a localized AI workflow automation platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0"
            onClick={() => {
              const element = document.getElementById("executive");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Analysis <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-200 hover:bg-slate-800/50"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/analysis.pdf";
              link.download = "Platform-Analysis-Report.pdf";
              link.click();
            }}
          >
            Download Report
          </Button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
            <div className="text-3xl font-bold text-cyan-400 mb-2">42.65%</div>
            <p className="text-sm text-slate-400">AI Market CAGR (2025-2031)</p>
          </div>
          <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">$2.34B</div>
            <p className="text-sm text-slate-400">E-Commerce Market Size</p>
          </div>
          <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
            <div className="text-3xl font-bold text-emerald-400 mb-2">88%</div>
            <p className="text-sm text-slate-400">Gross Margin Potential</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs text-slate-400 uppercase tracking-widest">Scroll to explore</p>
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
