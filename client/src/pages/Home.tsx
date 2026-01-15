import { useEffect, useState } from "react";
import { ChevronDown, TrendingUp, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import ExecutiveSummary from "@/components/ExecutiveSummary";
import MarketAnalysis from "@/components/MarketAnalysis";
import TechnicalFeasibility from "@/components/TechnicalFeasibility";
import BusinessModel from "@/components/BusinessModel";
import RiskAssessment from "@/components/RiskAssessment";
import SuccessMetrics from "@/components/SuccessMetrics";
import NextSteps from "@/components/NextSteps";

export default function Home() {
  const [activeSection, setActiveSection] = useState("executive");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollProgress((scrolled / windowHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "executive", label: "Executive Summary", icon: CheckCircle },
    { id: "market", label: "Market Analysis", icon: TrendingUp },
    { id: "technical", label: "Technical Feasibility", icon: Zap },
    { id: "business", label: "Business Model", icon: TrendingUp },
    { id: "risks", label: "Risk Assessment", icon: AlertCircle },
    { id: "metrics", label: "Success Metrics", icon: CheckCircle },
    { id: "next", label: "Next Steps", icon: ChevronDown },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Sidebar */}
      <nav className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 p-6 overflow-y-auto z-40 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Platform Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">Strategic Report 2025</p>
        </div>

        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  element?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(section.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-4">RECOMMENDATION</p>
          <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30">
            <p className="text-sm font-semibold text-emerald-300 mb-2">Worth Building</p>
            <p className="text-xs text-slate-400">Strong market fit with proven technology stack</p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64">
        <HeroSection />

        <div className="space-y-0">
          <section id="executive" className="scroll-mt-20">
            <ExecutiveSummary />
          </section>

          <section id="market" className="scroll-mt-20">
            <MarketAnalysis />
          </section>

          <section id="technical" className="scroll-mt-20">
            <TechnicalFeasibility />
          </section>

          <section id="business" className="scroll-mt-20">
            <BusinessModel />
          </section>

          <section id="risks" className="scroll-mt-20">
            <RiskAssessment />
          </section>

          <section id="metrics" className="scroll-mt-20">
            <SuccessMetrics />
          </section>

          <section id="next" className="scroll-mt-20">
            <NextSteps />
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 py-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-slate-200 mb-3">About This Report</h3>
                <p className="text-sm text-slate-400">
                  Comprehensive strategic analysis of the multi-agent workflow platform for the Algerian market.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-3">Key Findings</h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>✓ 42.65% AI market CAGR</li>
                  <li>✓ $2.34B e-commerce market</li>
                  <li>✓ 88% gross margin potential</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-3">Recommendation</h3>
                <p className="text-sm text-emerald-300 font-semibold">Proceed with Phase 0 validation</p>
                <p className="text-xs text-slate-400 mt-1">Launch MVP in Week 2-3</p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-500">
                © 2025 Platform Analysis Report. Prepared by Manus AI.
              </p>
              <p className="text-sm text-slate-500 mt-4 md:mt-0">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-slate-950 border-t border-slate-800 overflow-x-auto z-40">
        <div className="flex gap-2 p-2 min-w-min">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                const element = document.getElementById(section.id);
                element?.scrollIntoView({ behavior: "smooth" });
                setActiveSection(section.id);
              }}
              className={`px-3 py-2 rounded text-xs font-medium whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 lg:bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-30"
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
      )}
    </div>
  );
}
