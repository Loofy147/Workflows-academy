import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, MessageCircle, Mail, Phone, ChevronDown } from "lucide-react";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const guides = [
    {
      title: "Getting Started with AgentFlow",
      description: "Learn the basics of creating your first workflow",
      icon: "🚀",
    },
    {
      title: "Building Workflows",
      description: "Step-by-step guide to creating complex workflows",
      icon: "🔧",
    },
    {
      title: "Publishing Templates",
      description: "How to publish and monetize your workflow templates",
      icon: "📦",
    },
    {
      title: "API Integration",
      description: "Connect AgentFlow with your applications",
      icon: "🔌",
    },
    {
      title: "Cost Optimization",
      description: "Tips to reduce workflow execution costs",
      icon: "💰",
    },
    {
      title: "Troubleshooting",
      description: "Common issues and how to resolve them",
      icon: "🔍",
    },
  ];

  const faqs = [
    {
      question: "How do I create my first workflow?",
      answer:
        "Click on 'Create Workflow' from your dashboard, then use the visual builder to add steps and configure your AI agents.",
    },
    {
      question: "What are credits and how do they work?",
      answer:
        "Credits are used to pay for workflow executions. 1 credit = $0.01. Costs vary based on the complexity of your workflow and the AI providers used.",
    },
    {
      question: "Can I share workflows with my team?",
      answer:
        "Yes! You can invite team members and assign different permission levels (Viewer, Editor, Admin) to collaborate on workflows.",
    },
    {
      question: "How do I publish a template to the marketplace?",
      answer:
        "Go to your workflow, click 'Publish as Template', fill in the details, set pricing, and submit for review. Our team will approve it within 24 hours.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and wire transfers for enterprise customers.",
    },
    {
      question: "How can I monitor my workflow costs?",
      answer:
        "The cost estimation panel shows real-time costs as you build. After execution, detailed cost breakdowns are available in the execution logs.",
    },
  ];

  const filteredGuides = guides.filter((guide) =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Help & Documentation
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides and documentation..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 py-6 text-lg"
            />
          </div>
        </div>

        {/* Guides */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.title}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{guide.title}</h3>
                <p className="text-slate-400 text-sm">{guide.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === faq.question ? null : faq.question)
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-800/70 transition-all"
                >
                  <h3 className="text-lg font-bold text-slate-100 text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedFaq === faq.question ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === faq.question && (
                  <div className="px-6 pb-6 text-slate-400 border-t border-slate-700/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-12">
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Still need help?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl">
            Our support team is here to help. Choose your preferred way to get in touch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="bg-slate-700 hover:bg-slate-600 text-slate-100 border-0 h-auto py-6 flex flex-col items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <span>Live Chat</span>
            </Button>
            <Button className="bg-slate-700 hover:bg-slate-600 text-slate-100 border-0 h-auto py-6 flex flex-col items-center gap-2">
              <Mail className="w-6 h-6" />
              <span>Email Support</span>
            </Button>
            <Button className="bg-slate-700 hover:bg-slate-600 text-slate-100 border-0 h-auto py-6 flex flex-col items-center gap-2">
              <Phone className="w-6 h-6" />
              <span>Schedule Call</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
