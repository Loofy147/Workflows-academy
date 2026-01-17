import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Star, Download, Eye, Zap, Filter } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  installs: number;
  cost: string;
  tags: string[];
  aiMatch?: number;
}

const TEMPLATES: Template[] = [
  {
    id: "1",
    name: "Ouedkniss Scraper",
    category: "Data Collection",
    description: "Automatically scrape product listings from Ouedkniss with AI analysis",
    icon: "🔍",
    rating: 4.8,
    installs: 1247,
    cost: "2-5 DZD",
    tags: ["scraping", "ouedkniss", "ecommerce"],
    aiMatch: 95,
  },
  {
    id: "2",
    name: "Instagram Auto-Reply (Darja)",
    category: "Social Media",
    description: "Respond to Instagram DMs automatically in Darja",
    icon: "📱",
    rating: 4.6,
    installs: 856,
    cost: "1-3 DZD",
    tags: ["instagram", "darja", "automation"],
    aiMatch: 88,
  },
  {
    id: "3",
    name: "Email Report Generator",
    category: "Reporting",
    description: "Generate and send daily/weekly email reports",
    icon: "📧",
    rating: 4.7,
    installs: 2103,
    cost: "0.5-1 DZD",
    tags: ["email", "reporting", "scheduling"],
  },
  {
    id: "4",
    name: "Lead Scoring",
    category: "CRM",
    description: "Score and rank leads based on engagement",
    icon: "🎯",
    rating: 4.5,
    installs: 634,
    cost: "1-2 DZD",
    tags: ["crm", "leads", "scoring"],
  },
  {
    id: "5",
    name: "Invoice Processing",
    category: "Finance",
    description: "Extract and process invoice data automatically",
    icon: "💰",
    rating: 4.9,
    installs: 1892,
    cost: "2-4 DZD",
    tags: ["invoices", "finance", "ocr"],
  },
  {
    id: "6",
    name: "WhatsApp Broadcast",
    category: "Messaging",
    description: "Send bulk messages via WhatsApp Business API",
    icon: "💬",
    rating: 4.4,
    installs: 1456,
    cost: "0.5-2 DZD",
    tags: ["whatsapp", "messaging", "broadcast"],
  },
];

export default function TemplateLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "installs" | "recent">("rating");

  const categories = Array.from(new Set(TEMPLATES.map((t) => t.category)));

  const filtered = TEMPLATES.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "installs":
        return b.installs - a.installs;
      case "recent":
        return 0;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            Template Library
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by name, description, or tags..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 py-6"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <button className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600 transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" />
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? "bg-cyan-500 text-white border border-cyan-600"
                      : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="ml-auto flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600 transition-all"
              >
                <option value="rating">Sort by Rating</option>
                <option value="installs">Sort by Installs</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((template) => (
            <div
              key={template.id}
              className="rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all overflow-hidden group"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/30 border-b border-slate-700/50">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{template.icon}</span>
                  {template.aiMatch && (
                    <span className="px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                      {template.aiMatch}% Match
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-1">{template.name}</h3>
                <p className="text-xs text-slate-400">{template.category}</p>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-slate-400 mb-4">{template.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-full bg-slate-700/30 border border-slate-600/30 text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div>
                    <p className="text-xs text-slate-400">Rating</p>
                    <p className="text-sm font-bold text-cyan-300 flex items-center justify-center gap-1">
                      <Star className="w-3 h-3" />
                      {template.rating}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Installs</p>
                    <p className="text-sm font-bold text-purple-300">{(template.installs / 1000).toFixed(1)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Cost</p>
                    <p className="text-sm font-bold text-emerald-300">{template.cost}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-700/50 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Use Template
                </button>
                <button className="px-3 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:border-slate-600/50 transition-all">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No templates found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
